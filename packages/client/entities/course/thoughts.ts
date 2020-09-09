import { BindAll } from 'lodash-decorators';
import lodash from 'lodash';
import { EnumApiCourse } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination, PaginationResponse } from '../basics/pagination';
import { observable, runInAction } from 'mobx';

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