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
      "fth": "First time here?",
      "try": "Try with us!",
      "th": "The",
      "eas": "easiest",
      "wtm": "way to make",
      "yp": " your portfolio",
      "iad": "impressive and different!",
      "Sigdes1":"Store and download your porfolio with our diversity templates",
      "Sigdes2":"Impress recruiters and make your portfolio stand out from the crown",
      "sideworkdetail":"Detail",
      "sideworkpage":"Page",
      "sideworktemplate":"Templates",
      "blockbutton":"create block",
      "txtbutton":"create text block",
      "imgbutton":"create image block",
      "zoombutton":"zoom-in/zoom-out",
      "handbutton":"hand tool",
      "homebtn":"return to home",
      "exportbtn":"export file",
      "exportbtntooltip":"export to html, css file",
      "Drag here to":"Drag here to \n delete",
      "Position":"Position",
      "rotation":"rotation",
      "corner radius":"corner radius",
      "Layer":"Layer",
      "layer number":"layer number:",
      "layer desc":"Element with higher stats<br/> can be on top of element with lower stats",
      "increase":"increase",
      "decrease":"decrease",
      "opacity":'opacity',
      "Fill":"Fill",
      "card describe":"Second-year student at Ton Duc Thang University",
      "Text":"Text",
      "Border":"Border",
      "border inside":"inside",
      "border outside":"outside",
      "unset":"unset",
      "set side":"set side",
      "top":"top",
      "left":"left",
      "bottom":"bottom",
      "right":"right",
      "Effect":"Effect",
      "Shadow inner":"Shadow inner",
      "Shadow outer":"Shadow outer",
      "Blur background":"Blur background",
      "Blur":"Blur",
      "Page option":"Page option",
      "Page block":"Page block",
      "Page option desc":"A page block equal to <br> your screen size",
      "Delete":"Delete",
      "Copy":"Copy",
      "Student":"Student",
      "About me":"About me",
      "Contact me":"Contact me",
      "List Page":"List Page"



    }
  },
  vi: {
    translation: {
      "Home": "Trang ch???",
      "List Page":"Danh s??ch th???",
      "Fill":"M??u n???n",
      "Contact me":"Li??n h???",
      "About me":"?????c ??i???m",
      "Student":"Sinh vi??n",
      "Delete":"X??a",
      "card describe":"Sinh vi??n n??m 2 t???i tr?????ng ?????i h???c T??n ?????c Th???ng",
      "Copy":"Sao ch??p",
      "Page block":"?? trang",
      "Page option":"Ch???nh s???a trang",
      "Page option desc":"M???t ?? trang s??? ???????c t??nh <br> d???a theo k??ch th?????c<br> m??n h??nh c???a b???n",
      "Blur":"????? m???",
      "Effect":"Hi???u ???ng",
      "Shadow inner":"????? b??ng trong",
      "Shadow outer":"????? b??ng ngo??i",
      "Blur background":"L??m m??? n???n",
      "Border":"???????ng vi???n",
      "set side":"v??? tr?? vi???n",
      "border inside":"trong",
      "border outside":"ngo??i",
      "unset":"kh??ng",
      "top":"tr??n",
      "left":"tr??i",
      "bottom":"d?????i",
      "right":"ph???i",
      "Text":"Ch???",
      "Storage": "Kho l??u tr???",
      "opacity":"????? trong su???t",
      "increase":"T??ng s???",
      "decrease":"Gi???m s???",
      "Layer":"T???ng l???p",
      "layer desc":"C??c ph???n t??? c?? ch??? s??? l???n h??n <br/> c?? th??? che khu???t c??c ph???n t??? c?? ch??? s??? b?? h??n",
      "layer number":"ch??? s??? t???ng:",
      "About": "V??? ch??ng t??i",
      "getstarted": "B???t ?????u",
      "corner radius":"????? g??c c???nh",
      "fth":"L???n ?????u ?????n ????y?",
      "try": "Th??? ngay!",
      "Position":"V??? tr??",
      "th": "C??ch",
      "eas": "d??? d??ng nh???t",
      "rotation":"xoay",
      "wtm": " ????? t???o",
      "yp": "m???t chi???c portfolio",
      "iad": "???n t?????ng v?? kh??c b???t!",
      "Sigdes1":"L??u tr??? v?? t???i v??? c??c m???u portfolio ??a d???ng c???a ch??ng t??i.",
      "Sigdes2":"Khi???n c??c nh?? tuy???n d???ng ???n t?????ng v?? n???i b???t h??n trong ????m ????ng",
      "sideworkdetail":"Chi ti???t",
      "sideworkpage":"Trang",
      "sideworktemplate":"M???u",
      "blockbutton":"t???o block",
      "txtbutton":"t???o ch???",
      "imgbutton":"t???o ???nh",
      "zoombutton":"ph??ng to/thu nh???",
      "handbutton":"di chuy???n",
      "homebtn":"Tr??? v??? m??n h??nh ch??nh",
      "exportbtn":"Xu???t ra file",
      "exportbtntooltip":"Xu???t ra file html,css",
      "Drag here to":"Th??? v??o ????y ????? x??a",


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