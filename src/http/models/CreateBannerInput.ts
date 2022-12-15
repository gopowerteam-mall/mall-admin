/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateBannerInput = {
  /**
   * Banner标题
   */
  title?: string
  /**
   * Banner图片
   */
  image: string
  /**
   * Banner类型
   */
  type: 'URL' | 'PAGE' | 'PROJECT'
  /**
   * 参数
   */
  target: string
}
