/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 16:02:09
 * @modify date 2020-09-25 16:02:09
 * @desc 感想
 */
import { BindAll } from 'lodash-decorators';
import { observable, runInAction } from 'mobx';
import { EnumApiCourse } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination, PaginationResponse } from '../basics/pagination';

@BindAll()
export class CourseThoughts extends Pagination<any> {
    constructor($ajax: AjaxBasics) {
        super($ajax, {
            url: EnumApiCourse.Thoughts,
            key: 'commentId',
            onMapValues: 'courseCommentResponseVos',
            method: 'post',
            infinite: true,
            currentKey: 'pageIndex',
        })
    }
    /**
     * 用户感想列表
     * @memberof CourseThoughts
     */
    @observable userCommentList = [];
    /**
     * 用户已经感想
     * @memberof CourseThoughts
     */
    @observable userIsComment = false;
    onMapValues(res): PaginationResponse<any> {
        // console.log("LENG: CourseThoughts -> res", res)
        runInAction(() => {
            this.userCommentList = res.userCommentList;
            this.userIsComment = res.userIsComment;
        })
        return super.onMapValues(res)
    }
    /**
     * 发布一条感想
     */
    async onInstall(body: { comment?, commentNum?, courseId?, courseType?, scoreLevel?}) {
        return this.$ajax.post(EnumApiCourse.ThoughtsComment, body);
    }
}
export default CourseThoughts