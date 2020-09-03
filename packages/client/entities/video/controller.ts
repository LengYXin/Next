/// <reference types="./video" />
import { BindAll } from 'lodash-decorators';
import { EnumApiCurrency, EnumApiVideo } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import { VideoCommentPagination } from './comment';
import { VideoDetails } from './details';
import { toJS } from 'mobx';

@BindAll()
export class ControllerVideo {
    constructor(protected $ajax: AjaxBasics) {
    }
    /**
     * 分页列表数据
     * @memberof ControllerVideo
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiVideo.VideoList,
        key: 'id',
        currentKey: 'pageIndex',
        defaultPageSize: 9,
        onMapValues: 'videoShareDetialList'
        // onMapValues: 'courseFreeResponseVos'
    });
    /**
     * 推荐列表
     * @memberof ControllerVideo
     */
    RecommendPagination = new Pagination(this.$ajax, {
        url: EnumApiVideo.VideoRecommend,
        key: 'id',
        currentKey: 'pageIndex',
        onMapValues: 'videoShareDetialList'
    });
    /**
     * 评论列表
     * @memberof ControllerVideo
     */
    PaginationComment = new VideoCommentPagination(this.$ajax);
    /**
     * 详情
     * @memberof ControllerVideo
     */
    Details = new VideoDetails(this.$ajax);
    /**
     * 点赞
     * @param data 点赞的数据
     * @param list 列表||详情
     */
    onLikes(data, list = true) {
        try {
            if (data.isLiked) {
                throw '已点赞'
            }
            const updater = (old) => {
                old.likeCount++;
                old.isLiked = true;
                return old
            }
            if (list) {
                this.Pagination.onUpdate(data, updater);
            } else {
                this.Details.onUpdate(updater);
            }
            this.$ajax.post(EnumApiVideo.VideoPraise, { videoShareId: data.id })
        } catch (error) {
            throw error
        }
    }
}
export default ControllerVideo