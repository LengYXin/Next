import { Config } from "@tarojs/taro";
import EnumPages from "./pages.config";
export default {
  pages: Object.values(EnumPages),
  tabBar: {
    list: [
      {
        iconPath: "./assets/icon/home.png",
        selectedIconPath: "./assets/icon/homes.png",
        pagePath: "pages/index/index",
        text: "首页"
      },
      {
        iconPath: "./assets/icon/course.png",
        selectedIconPath: "./assets/icon/courses.png",
        pagePath: "pages/course/index",
        text: "去上课"
      },
      {
        iconPath: "./assets/icon/stationery.png",
        selectedIconPath: "./assets/icon/stationerys.png",
        pagePath: "pages/stationery/index",
        text: "文房"
      },
      {
        iconPath: "./assets/icon/my.png",
        selectedIconPath: "./assets/icon/mys.png",
        pagePath: "pages/my/index",
        text: "我的"
      }
    ],
    color: "#000",
    selectedColor: "#56abe4",
    backgroundColor: "#fff",
    borderStyle: "white"
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
    // enablePullDownRefresh: true
  }
} as Config;
