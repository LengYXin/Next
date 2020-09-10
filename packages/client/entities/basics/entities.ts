import lodash from 'lodash';
import { BindAll, Bind } from 'lodash-decorators';
import { action, computed, observable, toJS } from 'mobx';
import { AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { AjaxBasics } from '../../helpers/ajaxBasics';
export type BasicsOnMapValues = <T>(res: any) => T;
export interface BasicsOptions {
    /** url */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 请求结果过滤 */
    onMapValues?: BasicsOnMapValues;
}
// @BindAll()
export class EntitiesBasics<T> {
    constructor(protected $ajax: AjaxBasics, options: BasicsOptions) {
        this.onReset(lodash.merge<BasicsOptions, BasicsOptions>({ method: 'post' }, options));
    }
    /**
     * 配置
     * @type {BasicsOptions}
     * @memberof EntitiesBasics
     */
    options: BasicsOptions = {};
    /**
     * 数据源
     * @private
     * @type {Object}
     * @memberof EntitiesBasics
     */
    @observable
    protected _dataSource: any = {};
    /**
     * 加载状态
     * @memberof EntitiesBasics
     */
    @observable
    loading = false;
    /**
     * 详情
     * @readonly
     * @type {T}
     * @memberof EntitiesBasics
     */
    @computed
    get dataSource(): T {
        return toJS(this._dataSource) as T;
    }
    /**
     * 加载数据
     * @param body 
     * @param AjaxRequest 
     */
    async onLoading(body?, AjaxRequest?: AjaxRequest) {
        try {
            if (this.loading) {
                return console.warn('数据 加载中')
            }
            this.onToggleLoading(true);
            AjaxRequest = lodash.merge({
                url: this.options.url,
                method: this.options.method,
                body
            }, AjaxRequest);
            const res = await this.$ajax.request<T>(AjaxRequest)
                .pipe(
                    map(res => this.onMapValues(res))
                )
                .toPromise();
            this.onToggleLoading(false);
            return this.onSetDataSource(res);
        } catch (error) {
            console.error("LENG: Pagination<T> -> onLoading -> error", error)
            this.onToggleLoading(false);
        }
    }
    /**
     * 处理 过滤 res
     * @param res 
     */
    // @Bind()
    protected onMapValues(res): any {
        const { onMapValues } = this.options;
        if (lodash.isFunction(onMapValues)) {
            return onMapValues(res);
        }
        if (lodash.isString(onMapValues)) {
            const dataSource = lodash.get(res, onMapValues);
            lodash.unset(res, onMapValues)
            return dataSource;
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
    @action
    protected onSetDataSource(res: any) {
        this._dataSource = lodash.cloneDeep(res);
        return res;
    }
    /**
     * 切换加载状态
     * @private
     * @param {boolean} [loading=!this.loading]
     * @memberof Pagination
     */
    @action
    protected onToggleLoading(loading: boolean = !this.loading) {
        this.loading = loading;
    }
    /**
     * 修改更新
     * @param value 
     */
    @action
    onUpdate(updater: (oldValue: any) => any) {
        const dataSource = this.dataSource;
        this.onSetDataSource(lodash.merge(dataSource, updater(toJS(dataSource))))
    }
    /**
     * 重置
     * @returns
     * @memberof Pagination
     */
    @action
    onReset(options?: BasicsOptions) {
        this.options = lodash.merge({}, this.options, options);
        this._dataSource = {};
        return this;
    }

}
