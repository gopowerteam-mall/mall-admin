import { BannerType } from './enum.config'

export const BannerTypeDict = new Map<BannerType | string, string>([
  [BannerType.Url, '网页链接'],
  [BannerType.Page, '页面链接'],
  [BannerType.Product, '产品链接'],
])

export const PublishTypeDict = new Map<boolean, string>([
  [true, '已发布'],
  [false, '未发布'],
])

export const RecommendTypeDict = new Map<boolean, string>([
  [true, '已推荐'],
  [false, '未推荐'],
])
