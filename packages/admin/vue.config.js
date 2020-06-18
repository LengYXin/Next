/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-02 17:55:21
 * @modify date 2018-09-02 17:55:21
 * @desc [description]
 */
const path = require('path');
const fs = require('fs');
const moment = require('moment');
process.env.VUE_APP_VERSION = moment().format('YYYY-MM-DD HH:mm:ss');
onCreateFonts();
module.exports = {
    outputDir: "build",
    runtimeCompiler: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 修复 public node_modules 重复
        // const rootPath = path.resolve(path.dirname(path.dirname(process.cwd())), 'node_modules');
        // config.plugin('IgnorePlugin').use(require('webpack').IgnorePlugin, [/^\.\/locale$/, /moment$/]);
        // config.resolve.modules.add(rootPath).prepend(rootPath);
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                  },
                javascriptEnabled: true,
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7001/',
                changeOrigin: true,
                logLevel: "debug",
            },
            '/swagger': {
                target: 'http://localhost:5555/',
                changeOrigin: true,
                logLevel: "debug",
            },
        }
    }
}
/**
 * 读取配置 字体文件信息
 */
function onCreateFonts() {
    try {
        const appDirectory = fs.realpathSync(process.cwd());
        // 获取 字体文件根路径
        const fontRootDir = path.resolve(appDirectory, 'src', 'assets', 'font');
        const fontjs = path.resolve(appDirectory, 'src', 'assets', 'font', 'font.ts');
        const fontArray = [];
        console.log('------------------------------------ create font ------------------------------------')
        // 读取目录结构，获取字体
        fs.readdirSync(fontRootDir, { withFileTypes: true }).map(dirent => {
            // 是否为目录
            if (dirent.isDirectory()) {
                const font = { name: dirent.name, class: '', icons: [] };
                const fontPath = path.resolve(fontRootDir, dirent.name, 'iconfont.css');
                const fileCssStr = fs.readFileSync(fontPath, { encoding: 'utf-8' });
                /@font-face\s{0,}{\s{0,}('|"|)font-family(\1)\s{0,}:\s{0,}('|"|)([a-zA-Z0-9-_.#]{1,})(\3)\s{0,};/.exec(fileCssStr)
                font.class = RegExp.$4;
                const classReg = new RegExp(`.(${font.class}-([a-zA-Z0-9-_.#]{1,}))\\s{0,}:before\\s{0,}{`, "g");
                let regArray;
                while (regArray = classReg.exec(fileCssStr)) {
                    font.icons.push(RegExp.$1)
                };
                fontArray.push(font);
            }
        });
        const fontjsStr = `${fontArray.map(x => `import './${x.name}/iconfont.css'`).join(";\n")};\nexport default ${JSON.stringify(fontArray, null, 4)} `;
        fs.writeFileSync(fontjs, fontjsStr, { encoding: 'utf-8' });
    } catch (error) {
        console.log("create font", error);
    }
    // throw "抛个错误"
}