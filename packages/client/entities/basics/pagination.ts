import { observable, computed } from 'mobx';
import { create } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';
import { AjaxBasics } from '../../helpers/ajaxBasics';

interface PaginationOptions {
    /** url */
    url?: string;
    /** 数据唯一标识 key */
    key?: string;
    /** 默认的当前页数 1 */
    defaultCurrent?: number;
    /** 默认的每页条数 10 */
    defaultPageSize?: number;
}
export default class Pagination<T> {
    constructor(options?: PaginationOptions) {
        this.options = lodash.merge<PaginationOptions, PaginationOptions>({
            key: 'key',
            defaultCurrent: 1,
            defaultPageSize: 10
        }, options);
    }
    /**
     * 配置
     * @protected
     * @type {PaginationOptions}
     * @memberof Pagination
     */
    protected options: PaginationOptions;
    /**
     * ajax
     * @memberof Pagination
     */
    ajax = new AjaxBasics();
    /**
     * 数据源
     * @type {Array<T>}
     * @memberof Pagination
     */
    dataSource: Array<T> = [];
    /**
     * 当前页
     * @memberof Pagination
     */
    current = this.options.defaultCurrent;
    /**
     * 每页条数
     * @memberof Pagination
     */
    pageSize = this.options.defaultPageSize;
    /**
     * 数据总数
     * @memberof Pagination
     */
    total = 0;
    /**
     * 加载状态
     * @memberof Pagination
     */
    loading = false;
    /**
     * 分页加载
     * @param {*} body
     * @param {AjaxRequest} [AjaxRequest]
     * @returns
     * @memberof Pagination
     */
    async onLoading(body, AjaxRequest?: AjaxRequest) {
        this.loading = true;
        const dataSource = await this.ajax.request<Array<T>>(lodash.merge({ url: this.options.url, body }, AjaxRequest)).toPromise();
        if (lodash.eq(this.current, this.options.defaultCurrent)) {
            this.dataSource = dataSource;
        } else {
            this.dataSource = lodash.concat(this.dataSource, dataSource);
        }
        this.current += 1;
        this.loading = false;
        return dataSource;
    }
    /**
     * 根据 key 查找 数据
     * @param {string} key
     * @returns {T}
     * @memberof Pagination
     */
    onFind(key: string): T {
        const data = lodash.find(this.dataSource, [this.options.key, key]);
        if (!lodash.hasIn(data, this.options.key)) {
            throw new Error('没有找到 数据')
        }
        return data;
    }
    /**
     * 根据 key 删除数据
     * @param {string} key
     * @returns {T[]}
     * @memberof Pagination
     */
    onRemove(key: string): T[] {
        const dataSource = lodash.clone(this.dataSource);
        const result = lodash.remove(dataSource, [this.options.key, key]);
        this.dataSource = dataSource;
        return result
    }
    /**
     * 重置
     * @returns
     * @memberof Pagination
     */
    onReset() {
        this.current = this.options.defaultCurrent;
        this.pageSize = this.options.defaultPageSize;
        this.total = 0;
        this.dataSource = [];
        return this;
    }
}