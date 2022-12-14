/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */

// 控制器名称
const controller = 'material'
const service = ''
const gateway = 'default'

export const MaterialController = {
  // 创建素材
  createMaterial: {
    gateway,
    service,
    controller,
    path: '/api/admin/material',
    action: 'createMaterial',
    type: RequestMethod.Post,
  },
  // 获取素材列表
  findMaterial: {
    gateway,
    service,
    controller,
    path: '/api/admin/material',
    action: 'findMaterial',
    type: RequestMethod.Get,
  },
  // 删除素材
  deleteMaterialBatch: {
    gateway,
    service,
    controller,
    path: '/api/admin/material',
    action: 'deleteMaterialBatch',
    type: RequestMethod.Delete,
  },
  // 获取素材分组
  findMaterialGroup: {
    gateway,
    service,
    controller,
    path: '/api/admin/material/group',
    action: 'findMaterialGroup',
    type: RequestMethod.Get,
  },
  // 创建素材分组
  createMaterialGroup: {
    gateway,
    service,
    controller,
    path: '/api/admin/material/group',
    action: 'createMaterialGroup',
    type: RequestMethod.Post,
  },
  // 更新素材分组
  updateMaterialGroup: {
    gateway,
    service,
    controller,
    path: '/api/admin/material/group/{id}',
    action: 'updateMaterialGroup',
    type: RequestMethod.Put,
  },
  // 删除素材分组
  deleteMaterialGroup: {
    gateway,
    service,
    controller,
    path: '/api/admin/material/group/{id}',
    action: 'deleteMaterialGroup',
    type: RequestMethod.Delete,
  },
  // 修改素材分组
  changeGroupBatch: {
    gateway,
    service,
    controller,
    path: '/api/admin/material/change-group',
    action: 'changeGroupBatch',
    type: RequestMethod.Patch,
  },
}
