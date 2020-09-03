/// <reference types="./video" />
import { BindAll } from "lodash-decorators";
import { EnumApiCurrency, EnumApiVideo } from '../../api';
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
/**
 * 视频详情
 */
@BindAll()
export class VideoDetails extends EntitiesBasics<IVideoDetails> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      // 课程详情地址
      url: EnumApiVideo.VideoDetail
    })
  }
  /**
   * 加载视频详情
   * @param videoShareId 
   */
  async onLoading(videoShareId) {
    await super.onLoading({ videoShareId });
    const urls = await this.$ajax.post<any>(EnumApiCurrency.UtilityUrl, { key: this.dataSource.videoUrl })
    this.onUpdate(() => ({
      quality: [
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
    }))
  }
  /**
   * 添加视频播放量
   * @param videoShareId 
   */
  async onPlayNumber(videoShareId) {
    return this.$ajax.post(EnumApiVideo.VideoPlayNumber, { videoShareId })
  }
}
export default VideoDetails;
