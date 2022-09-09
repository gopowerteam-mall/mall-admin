/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'banner'
const service = ''
const gateway = 'default'

export const BannerController = {
  // 创建Banner
  createBanner: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner',
    action: 'createBanner',
    type: RequestMethod.Post,
  },
  // 查询Banner列表
  findBanner: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner',
    action: 'findBanner',
    type: RequestMethod.Get,
  },
  // 更新Banner
  updateBanner: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner/{id}',
    action: 'updateBanner',
    type: RequestMethod.Put,
  },
  // 获取Banner
  getBanner: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner/{id}',
    action: 'getBanner',
    type: RequestMethod.Get,
  },
  // 删除Banner
  deleteBanner: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner/{id}',
    action: 'deleteBanner',
    type: RequestMethod.Delete,
  },
  // 交换Banner位置
  changeBannerOrder: {
    gateway,
    service,
    controller,
    path: '/api/admin/banner/change-order/{id}',
    action: 'changeBannerOrder',
    type: RequestMethod.Patch,
  },
}
