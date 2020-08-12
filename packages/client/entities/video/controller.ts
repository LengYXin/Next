/// <reference types="./video" />
import { BindAll } from 'lodash-decorators';
import { toJS } from 'mobx';
import { EnumApiVideo, EnumApiCurrency } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerVideo extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
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
     * 评论列表
     * @memberof ControllerVideo
     */
    PaginationComment = new CommentPagination(this.$ajax);
    /**
     * 视频详情
     * @param videoShareId 
     */
    async onGetDetails(videoShareId) {
        const res = await this.$ajax.post<VideoDetails>(EnumApiVideo.VideoDetail, { videoShareId });
        const urls = await this.$ajax.post<any>(EnumApiCurrency.UtilityUrl, { key: res.videoUrl })
        this.setDetails({
            ...res, quality: [
                {
                    name: "高清",
                    url: urls.highUrl
                },
                {
                    name: "标清",
                    url: urls.url
                },
                {
                    name: "流畅",
                    url: urls.lowUrl
                }
            ]
        })
    }
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
            data = toJS(data)
            data.likeCount++;
            data.isLiked = true;
            if (list) {
                this.Pagination.onUpdate(data, data);
            } else {
                this.setDetails(data)
            }
            this.$ajax.post(EnumApiVideo.VideoPraise, { videoShareId: data.id })
        } catch (error) {
            throw error
        }
    }
}
/**
 * 评论
 */
class CommentPagination extends Pagination<any>{
    constructor(protected $ajax: AjaxBasics) {
        super($ajax, {
            url: EnumApiVideo.VideoComment,
            key: 'id',
            currentKey: 'pageIndex',
            defaultPageSize: 10,
            onMapValues: 'courseFreeCommentResultVoList'
        })
    }
    /**
     * 点赞
     */
    onLikes(data) {
        try {
            if (data.likeRecord) {
                throw '已点赞'
            }
            data = toJS(data)
            data.likeCount++;
            data.likeRecord = true;
            this.onUpdate(data, data);
            this.$ajax.post(EnumApiVideo.VideoCommentPraise, { videoShareCommentId: data.id })
        } catch (error) {
            throw error
        }
    }
}
export default ControllerVideo