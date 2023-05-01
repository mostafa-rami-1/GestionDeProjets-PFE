
import Cookies from "js-cookie";

export const pageDirConfig = (dir) => {
    const lang = Cookies.get('i18next');
    if (lang === "ar") {
        document.querySelector("html").lang = 'ar'
        document.querySelector("html").dir = 'rtl'
    }
    if (dir === "rtl") {
        document.querySelector(".sidebar")?.classList.add("sideBarRtl");
        document.querySelector(".nav")?.classList.add("navRtl");
        document.querySelector(".main")?.classList.add("mainRtl");
        document.querySelector(".inpPassword")?.classList.add("inputRtl")
        document.querySelector(".inpText")?.classList.add("inputRtl")
    }
    else if (dir === "ltr") {
            document.querySelector(".sidebar")?.classList.remove("sideBarRtl");
            document.querySelector(".nav")?.classList.remove("navRtl");
            document.querySelector(".main")?.classList.remove("mainRtl");
            document.querySelector(".inpPassword")?.classList.remove("inputRtl")
            document.querySelector(".inpText")?.classList.remove("inputRtl")
            
    }
}

