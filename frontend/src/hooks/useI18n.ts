import type { Composer } from "vue-i18n";

 let setLanguage = (i18n : Composer, locale : string | null) => {
    locale = localStorage.getItem('locale');
    if (locale == null) {
        localStorage.setItem('locale', "zh-tw");
    } else {
        i18n.locale.value = locale;
    }
};


let ChangeLanguage =function (e: Event,i18n : Composer, locale : string | null) {
    if (e.target != null) {
        i18n.locale.value = (e.target as HTMLSelectElement).value;
        locale = i18n.locale.value
        localStorage.setItem('locale', locale)
    }
}
export { ChangeLanguage, setLanguage };

