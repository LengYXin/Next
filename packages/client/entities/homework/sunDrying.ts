import { BindAll } from 'lodash-decorators';
import { EnumApiHomework } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import { EnumMessage } from '../../languages';
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
     * 添加浏览量
     */
    async onAddbrowsenum(momentId: string) {
        this.onUpdate(momentId, (old) => {
            old.viewCount++;
            return old
        });
        return this.$ajax.post(EnumApiHomework.MomentAddbrowsenum, { momentId })
    }
    /**
     * 删除评论
     * @param momentId 
     */
    async onDeleteMoment(momentId: string) {
        this.onRemove(momentId);
        return this.$ajax.post(EnumApiHomework.MomentDeletemoment, { momentId })
    }
    /**
     * 点赞
     * @param data 
     */
    async onLikes(data) {
        if (data.likeRecord) {
            throw EnumMessage.like_error
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