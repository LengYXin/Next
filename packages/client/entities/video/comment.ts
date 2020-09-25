import { BindAll } from 'lodash-decorators';
import { EnumApiVideo } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import { EnumMessage } from '../../languages';

@BindAll()
export class VideoCommentPagination extends Pagination<any>{
    constructor(protected $ajax: AjaxBasics) {
        super($ajax, {
            url: EnumApiVideo.VideoCommentList,
            key: 'id',
            currentKey: 'pageIndex',
            defaultPageSize: 10,
            onMapValues: 'courseFreeCommentResultVoList'
        })
    }
    /**
   * 发布一条作业
   */
    async onInstall(body: { videoShareId, content, contentLength?, toCommentId?, toUserId?, toUserNickname?, userType?}) {
        return this.$ajax.post(EnumApiVideo.VideoComment, body);
    }
    /**
     * 点赞
     */
    onLikes(data) {
        try {
            if (data.likeRecord) {
                throw EnumMessage.like_error
            }
            this.onUpdate(data, (old) => {
                old.likeCount++;
                old.likeRecord = true;
                return old
            });
            this.$ajax.post(EnumApiVideo.VideoCommentPraise, { videoShareCommentId: data.id })
        } catch (error) {
            throw error
        }
    }
}
export default VideoCommentPagination