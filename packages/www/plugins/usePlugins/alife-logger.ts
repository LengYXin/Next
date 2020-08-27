import BrowerLogger from 'alife-logger';
import lodash from 'lodash';
const pid = {
    pro: "eezf26fnf7@53c926088ab1292",
    uat: "eezf26fnf7@7395531b1258a13",
    dev: ''
}
const __bl = BrowerLogger.singleton({
    pid: lodash.get(pid, process.env.DEPLOY_ENV, ''),
    appType: "web",
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    sendResource: true,
    enableLinkTrace: true,
    behavior: true,
    enableSPA: true,
    useFmp: true,
    enableConsole: true
});
console.log("LENG: BrowerLogger", __bl)
