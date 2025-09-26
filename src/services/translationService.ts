import { Translate } from '@google-cloud/translate/build/src/v2';

export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const supportedLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

class TranslationService {
  private translate: Translate;
  private cache: Map<string, Map<SupportedLanguage, string>> = new Map();
  private apiKey = 'AIzaSyADzQpjE3NTp2N40iSHeDAVMVp9viNZ-UY';

  constructor() {
    this.translate = new Translate({
      key: this.apiKey,
      projectId: 'career-guide-translation'
    });
  }

  private getCacheKey(text: string): string {
    return text.toLowerCase().trim();
  }

  async translateText(text: string, targetLanguage: SupportedLanguage): Promise<string> {
    // Return original text if target is English
    if (targetLanguage === 'en') {
      return text;
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text);
    const languageCache = this.cache.get(cacheKey);
    if (languageCache?.has(targetLanguage)) {
      return languageCache.get(targetLanguage)!;
    }

    try {
      const [translation] = await this.translate.translate(text, {
        from: 'en',
        to: targetLanguage
      });

      // Store in cache
      if (!this.cache.has(cacheKey)) {
        this.cache.set(cacheKey, new Map());
      }
      this.cache.get(cacheKey)!.set(targetLanguage, translation);

      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  async translateMultiple(texts: string[], targetLanguage: SupportedLanguage): Promise<string[]> {
    if (targetLanguage === 'en') {
      return texts;
    }

    try {
      const [translations] = await this.translate.translate(texts, {
        from: 'en',
        to: targetLanguage
      });

      // Store in cache
      texts.forEach((text, index) => {
        const cacheKey = this.getCacheKey(text);
        if (!this.cache.has(cacheKey)) {
          this.cache.set(cacheKey, new Map());
        }
        this.cache.get(cacheKey)!.set(targetLanguage, translations[index]);
      });

      return Array.isArray(translations) ? translations : [translations];
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Return original texts on error
    }
  }

  async translateObject<T extends Record<string, any>>(
    obj: T, 
    targetLanguage: SupportedLanguage,
    excludeKeys: string[] = []
  ): Promise<T> {
    if (targetLanguage === 'en') {
      return obj;
    }

    const result = { ...obj };
    const textsToTranslate: string[] = [];
    const keyMap: Array<{ key: string; path: string[] }> = [];

    const extractTexts = (current: any, path: string[] = []) => {
      for (const [key, value] of Object.entries(current)) {
        if (excludeKeys.includes(key)) continue;
        
        const currentPath = [...path, key];
        if (typeof value === 'string' && value.trim()) {
          textsToTranslate.push(value);
          keyMap.push({ key: value, path: currentPath });
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          extractTexts(value, currentPath);
        }
      }
    };

    extractTexts(result);

    if (textsToTranslate.length === 0) {
      return result;
    }

    try {
      const translations = await this.translateMultiple(textsToTranslate, targetLanguage);
      
      keyMap.forEach(({ key, path }, index) => {
        let current = result;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = translations[index];
      });
    } catch (error) {
      console.error('Object translation error:', error);
    }

    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = new TranslationService();