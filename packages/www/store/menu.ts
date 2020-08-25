/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc [description]
 */
import { EnumLocaleLinks } from '@xt/client';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { action, observable } from 'mobx';
import { Route } from 'vue-router';
@BindAll()
class Menu {
    constructor() {

    }
    /** 头部菜单合集 */
    Menus = onCreate();
    /** 当前路由 */
    route: Route;
    /** 选择的菜单 */
    getSelectedkeys(route: Route) {
        const name = this.getRouteName(route);
        return [name]
    }
    /** 路由名称 */
    getRouteName(route: Route) {
        return lodash.head(lodash.split(route.name, "-"));
    }
    /**
     * 面包屑
     * @memberof Menu
     */
    @observable
    breadcrumb = [];
    /**
     * 面包屑 显示
     * @memberof Menu
     */
    @observable
    breadcrumbShow = false;
    /**
     * 初始化面包屑状态
     * @param route 
     */
    @action
    initBreadcrumb(route: Route) {
        if (this.route?.name === route.name) {
            return
        }
        this.route = route
        const exclude = ["index", "my", "course-id"];
        const name = this.getRouteName(route);
        const menu = lodash.find(this.Menus, ["key", name]);
        const linksName = menu?.name;
        const linksKey = menu?.key;
        this.breadcrumbShow = linksKey && !lodash.includes(exclude, name) && !lodash.includes(exclude, route.name);
        if (this.breadcrumbShow) {
            this.breadcrumb = [{
                linksKey,
                linksName,
                links: lodash.includes(route.name, '-id'),
                // path: route.path,
            }]
        }

    }
    /**
     * 设置面包屑
     * @param breadcrumb 
     */
    @action
    setBreadcrumb(breadcrumb, reset = false) {
        if (reset) {
            this.breadcrumb = [breadcrumb];
        } else {
            this.breadcrumb.push(breadcrumb);
        }
        this.breadcrumbShow = true;
    }
}
function onCreate(development = process.env.NODE_ENV === 'development') {
    return [
        {
            key: "index",
            name: EnumLocaleLinks.links_home,
        },
        {
            key: "course",
            name: EnumLocaleLinks.links_course,
        },
        {
            key: "video",
            name: EnumLocaleLinks.links_video,
        },
        {
            key: "stationery",
            name: EnumLocaleLinks.links_stationery,
        },
        {
            key: "about",
            name: EnumLocaleLinks.links_about,
        },
        // {
        //     key: "my",
        //     name: EnumLocaleLinks.links_my,
        // },
        development && {
            key: "locale",
            name: '测试'
        },
    ].filter(Boolean)
}
export default new Menu();
