import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Storage": "Storage",
      "About": "About",
      "getstarted": "Get Started",
      "try" : "Try with us!",
      "th": "The",
      "eas": "easiest",
      "wtm": "way to make",
      "yp": " your portfolio",
      "iad": "impressive and different!"

    }
  },
  vi: {
    translation: {
      "Home": "Trang chủ",
      "Storage": "Kho lưu trữ",
      "About": "Về chúng tôi",
      "getstarted": "Bắt đầu",
      "try": "Thử ngay!",
      "th": "Cách",
      "eas": "dễ dàng nhất",
      "wtm": " để tạo cho mình",
      "yp" : " một chiếc prortfolio",
      "iad": "ấn tượng và khác bọt!"

    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vn", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;