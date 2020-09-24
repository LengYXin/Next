import BrowerLogger from 'alife-logger';
import $global from '~/store/global';
if ($global.logger) {
    const __bl = BrowerLogger.singleton({
        pid: $global.logger,
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
}

