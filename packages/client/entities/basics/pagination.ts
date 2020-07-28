import { observable, computed, action } from 'mobx';
import { create } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { map } from 'rxjs/operators';
export interface PaginationResponse<T> {
    /** 数据集 */
    dataSource: Array<T>,
    /** 页码 */
    current?: number,
    /** 长度 */
    pageSize?: number,
    /** 总数 */
    total?: number
}
export interface PaginationOptions {
    /** url */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 无限滚动 */
    infinite?: boolean;
    /** 数据唯一标识 key */
    key?: string;
    /** 默认的当前页数 1 */
    defaultCurrent?: number;
    /** 默认的每页条数 10 */
    defaultPageSize?: number;
    /** 当前页码 接口使用key */
    currentKey?: string;
    /** 每页条数 接口使用key */
    pageSizeKey?: string;
    /** 请求结果过滤 */
    onMapValues?: <T>(res: any) => PaginationResponse<T>;
}
@BindAll()
export class Pagination<T> {
    constructor(protected $ajax: AjaxBasics, options: PaginationOptions) {
        this.onReset(lodash.merge({
            key: 'key',
            method: 'post',
            infinite: false,
            defaultCurrent: 1,
            defaultPageSize: 10,
            currentKey: 'current',
            pageSizeKey: 'pageSize',
        }, options))
    }
    /**
     * 配置
     * @protected
     * @type {PaginationOptions}
     * @memberof Pagination
     */
    protected options: PaginationOptions;
    /**
     * 数据key
     * @readonly
     * @memberof Pagination
     */
    get key() {
        return this.options.key;
    }
    /**
     * 数据源
     * @type {Array<T>}
     * @memberof Pagination
     */
    @observable
    dataSource: Array<T> = [];
    /**
     * 当前页
     * @memberof Pagination
     */
    @observable
    current = 1;
    /**
     * 每页条数
     * @memberof Pagination
     */
    @observable
    pageSize = 10;
    /**
     * 数据总数
     * @memberof Pagination
     */
    @observable
    total = 0;
    /**
     * 加载状态
     * @memberof Pagination
     */
    @observable
    loading = false;
    /**
     * 没有更多数据
     * @memberof Pagination
     */
    isUndefined = false;
    /**
     * 加载 数据 body
     * @memberof Pagination
     */
    oldBody = {};
    /**
     * 分页加载
     * @param {*} body
     * @param {AjaxRequest} [AjaxRequest]
     * @returns
     * @memberof Pagination
     */
    async onLoading(body?, AjaxRequest?: AjaxRequest) {
        // try {
        if (this.isUndefined) {
            console.warn('分页 数据 没有更多数据')
            return []
        }
        if (this.loading) {
            return console.warn('分页 数据 加载中')
        }
        this.onToggleLoading(true);
        this.oldBody = lodash.cloneDeep(body);
        // this.current++;
        body = lodash.merge({
            // 转换 current pageSize 对应 的字段名
            [this.options.currentKey]: this.current,
            [this.options.pageSizeKey]: this.pageSize
        }, body);
        AjaxRequest = lodash.merge({
            url: this.options.url,
            method: this.options.method,
            body
        }, AjaxRequest);
        const res = await this.$ajax.request<PaginationResponse<T>>(AjaxRequest)
            .pipe(map(this.onMapValues))
            .toPromise();
        this.onToggleLoading(false);
        return this.onSetDataSource(res);
        // } catch (error) {
        //     console.error("LENG: Pagination -> error", error)
        // }
    }
    @action.bound
    onCurrentChange(current = this.current + 1) {
        this.current = current;
        this.onLoading(this.oldBody)
    }
    /**
     * 处理 过滤 res
     * @param {*} res
     * @returns
     * @memberof Pagination
     */
    onMapValues(res): PaginationResponse<T> {
        if (lodash.isFunction(this.options.onMapValues)) {
            return this.options.onMapValues(res)
        }
        return res
    }
    /**
     * 设置解析数据
     * @private
     * @param {*} dataSource
     * @returns
     * @memberof Pagination
     */
    @action.bound
    onSetDataSource(res: PaginationResponse<T>) {
        if (!lodash.isArray(res.dataSource)) {
            throw new Error('分页 数据 返回值 dataSource 不是数组')
        }
        if (lodash.isArray(res.dataSource) && res.dataSource.length <= 0) {
            this.isUndefined = true;
            console.warn('分页 数据 没有更多数据')
            return res.dataSource
        }
        // 第一页
        if (lodash.eq(this.current, this.options.defaultCurrent) || this.options.infinite === false) {
            this.dataSource = res.dataSource;
        } else {
            this.dataSource = lodash.concat(this.dataSource, res.dataSource);
        }
        // this.current += 1;
        this.total = res.total;
        return res.dataSource;
    }
    /**
     * 切换加载状态
     * @private
     * @param {boolean} [loading=!this.loading]
     * @memberof Pagination
     */
    @action.bound
    onToggleLoading(loading: boolean = !this.loading) {
        this.loading = loading;
    }
    /**
     * 根据 key 查找 数据
     * @param {string} key
     * @returns {T}
     * @memberof Pagination
     */
    onFind(key: string): T {
        const data = lodash.find(this.dataSource, [this.key, key]);
        if (!lodash.hasIn(data, this.options.key)) {
            throw new Error(`没有找到 Key:${key} 数据`)
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
        const result = lodash.remove(dataSource, [this.key, key]);
        this.dataSource = dataSource;
        return result
    }
    /**
     * 重置
     * @returns
     * @memberof Pagination
     */
    @action.bound
    onReset(options: PaginationOptions = this.options) {
        this.options = lodash.merge(this.options, options);
        this.current = this.options.defaultCurrent;
        this.pageSize = this.options.defaultPageSize;
        this.isUndefined = false;
        this.total = 0;
        this.dataSource = [];
        this.loading = false;
        return this;
    }
}
export default Pagination