import LangData from './Lang'

class Language {
  install(Vue, options) {
    Vue.prototype.$lang = {
      context: null,
      lang: 'fa',

      Get(key) {
        return LangData[this.lang][key];
      },

      SetCurrentLang(lang) {
        this.lang = lang;
      }
    }
  }
}

export default new Language();
