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
      "Home": "Trang chủ",
      "List Page":"Danh sách thẻ",
      "Fill":"Màu nền",
      "Contact me":"Liên hệ",
      "About me":"Đặc điểm",
      "Student":"Sinh viên",
      "Delete":"Xóa",
      "card describe":"Sinh viên năm 2 tại trường đại học Tôn Đức Thắng",
      "Copy":"Sao chép",
      "Page block":"Ô trang",
      "Page option":"Chỉnh sửa trang",
      "Page option desc":"Một ô trang sẽ được tính <br> dựa theo kích thước<br> màn hình của bạn",
      "Blur":"Độ mờ",
      "Effect":"Hiệu ứng",
      "Shadow inner":"Đổ bóng trong",
      "Shadow outer":"Đổ bóng ngoài",
      "Blur background":"Làm mờ nền",
      "Border":"Đường viền",
      "set side":"vị trí viền",
      "border inside":"trong",
      "border outside":"ngoài",
      "unset":"không",
      "top":"trên",
      "left":"trái",
      "bottom":"dưới",
      "right":"phải",
      "Text":"Chữ",
      "Storage": "Kho lưu trữ",
      "opacity":"độ trong suốt",
      "increase":"Tăng số",
      "decrease":"Giảm số",
      "Layer":"Tầng lớp",
      "layer desc":"Các phần tử có chỉ số lớn hơn <br/> có thể che khuất các phần tử có chỉ số bé hơn",
      "layer number":"chỉ số tầng:",
      "About": "Về chúng tôi",
      "getstarted": "Bắt đầu",
      "corner radius":"độ góc cạnh",
      "fth":"Lần đầu đến đây?",
      "try": "Thử ngay!",
      "Position":"Vị trí",
      "th": "Cách",
      "eas": "dễ dàng nhất",
      "rotation":"xoay",
      "wtm": " để tạo",
      "yp": "một chiếc portfolio",
      "iad": "ấn tượng và khác bọt!",
      "Sigdes1":"Lưu trữ và tải về các mẫu portfolio đa dạng của chúng tôi.",
      "Sigdes2":"Khiến các nhà tuyển dụng ấn tượng và nổi bật hơn trong đám đông",
      "sideworkdetail":"Chi tiết",
      "sideworkpage":"Trang",
      "sideworktemplate":"Mẫu",
      "blockbutton":"tạo block",
      "txtbutton":"tạo chữ",
      "imgbutton":"tạo ảnh",
      "zoombutton":"phóng to/thu nhỏ",
      "handbutton":"di chuyển",
      "homebtn":"Trở về màn hình chính",
      "exportbtn":"Xuất ra file",
      "exportbtntooltip":"Xuất ra file html,css",
      "Drag here to":"Thả vào đây để xóa",


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