/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc [description]
 */
import { EnumLocaleLinks } from '@xt/client/languages';
import { BindAll } from 'lodash-decorators';
import lodash from 'lodash';
import { action, observable, toJS } from 'mobx';
import { Route } from 'vue-router';
@BindAll()
class Menu {
    constructor() {

    }
    Menus = onCreate()
    getSelectedkeys(route: Route) {
        const name = this.getRouteName(route);
        return [name]
    }
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
        const exclude = ["index", "my"];
        const name = this.getRouteName(route);
        const menu = lodash.find(this.Menus, ["key", name]);
        const linksName = menu?.name;
        const linksKey = menu?.key;
        this.breadcrumbShow = linksKey && !lodash.includes(exclude, name);
        this.breadcrumb = [{
            linksKey,
            linksName,
            links: lodash.includes(route.name, '-id'),
            // path: route.path,
        }]
    }
    @action
    setBreadcrumb(breadcrumb) {

        this.breadcrumb.push(breadcrumb);
        console.log("LENG: Menu -> setBreadcrumb -> this.breadcrumb", toJS(this.breadcrumb))
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
        {
            key: "my",
            name: EnumLocaleLinks.links_my,
        },
        development && {
            key: "locale",
            name: '多语言列表'
        },
    ].filter(Boolean)
}
export default new Menu();
