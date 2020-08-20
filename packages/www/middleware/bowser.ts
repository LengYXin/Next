import { message } from "ant-design-vue";
import lodash from "lodash";
import Bowser from "bowser";
export default function () {
    const BrowserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    // message.success({ content: BrowserName, duration: 99999 })
}
