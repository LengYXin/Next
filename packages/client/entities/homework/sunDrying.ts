import { BindAll } from 'lodash-decorators';
import { EnumApiHomework } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import { EntitiesBasics } from '../basics/entities';
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
     * 晒作业详情
     * @memberof ControllerHomeworkSunDrying
     */
    Details = new EntitiesBasics(this.$ajax, { url: '' });
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
        this.onUpdate(data, (old) => {
            old.likeCount++;
            old.likeRecord = true;
            return old
        });
        return this.$ajax.post(EnumApiHomework.Momentlike, { momentId: data.id })
    }
}
export default ControllerHomeworkSunDrying