import { BindAll } from 'lodash-decorators';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { EnumApiHomework } from '../../api';
import { Pagination, PaginationOptions } from '../basics/pagination';
import { toJS } from 'mobx';
/**
 * 晒作业
 * @export
 * @class ControllerHomeworkSunDrying
 * @extends {Pagination<any>}
 */
@BindAll()

export class ControllerHomeworkSunDrying extends Pagination<any> {
    constructor($ajax: AjaxBasics) {
        super($ajax, {
            url: EnumApiHomework.Momentlist,
            key: 'id',
            onMapValues: 'momentResultVos',
            method: 'post',
            infinite: true,
            currentKey: 'pageIndex',
        })
    }
    /**
     * 发布一条作业
     */
    async onInstall(body: { content?, contentLength?, courseType?, picturesUrlList?, singleCourseId?, userType?}) {
        return this.$ajax.post(EnumApiHomework.MomentAdd, body);
    }
    /**
     * 点赞
     * @param data 
     */
    async onLikes(data) {
        if (data.likeRecord) {
            throw '您已经点过赞了'
        }
        data = toJS(data);
        data.likeCount++;
        data.likeRecord = true;
        this.onUpdate(data, data);
        return this.$ajax.post(EnumApiHomework.Momentlike, { momentId: data.id })
    }
}
export default ControllerHomeworkSunDrying