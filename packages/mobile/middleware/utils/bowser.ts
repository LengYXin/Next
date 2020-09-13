import Bowser from "bowser";
import lodash from "lodash";
export default function () {
    const BrowserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    // console.log("LENG: BrowserName", Bowser.BROWSER_MAP, BrowserName)
    return lodash.eq(Bowser.BROWSER_MAP.ie, BrowserName)
}
