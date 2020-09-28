const program = require('commander');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const package = require('../package.json');
try {
    program.version(package.version, '-v, --version')
        .parse(process.argv);
    const env = lodash.head(program.args) || 'dev';
    const root = process.cwd();
    const dir = `build_${lodash.snakeCase(package.version)}/${env}`;
    const rootDir = path.join(root, dir)
    const packages = {
        www: path.join(root, 'packages/www', dir),
        mobile: path.join(root, 'packages/mobile', dir),
        live: path.join(root, 'packages/live', dir),
    };
    // 创建目录
    fs.emptyDirSync(rootDir)
    if (fs.existsSync(packages.www)) {
        fs.copySync(packages.www, rootDir)
        console.log("LENG: suture www")
    }
    if (fs.existsSync(packages.mobile)) {
        const mobile = path.join(rootDir, 'mobile')
        fs.emptyDirSync(mobile)
        fs.copySync(packages.mobile, mobile)
        console.log("LENG: suture mobile")
    }
    if (fs.existsSync(packages.live)) {
        const live = path.join(rootDir, 'live')
        fs.copySync(packages.live, live)
        console.log("LENG: suture live")
    }
} catch (error) {
    console.log("LENG: error", error)
}