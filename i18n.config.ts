import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import vi from './locales/vi.json';

export default defineI18nConfig(() => ({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      fr,
      es,
      de,
      vi
    }
  }))
  