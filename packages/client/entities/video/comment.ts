import { BindAll } from 'lodash-decorators';
import { EnumApiVideo } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';

@BindAll()
export class VideoCommentPagination extends Pagination<any>{
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
            data.likeCount++;
            data.likeRecord = true;
            this.onUpdate(data, data);
            this.$ajax.post(EnumApiVideo.VideoCommentPraise, { videoShareCommentId: data.id })
        } catch (error) {
            throw error
        }
    }
}
export default VideoCommentPagination