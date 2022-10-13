import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'

export class CreateAdministratorInput extends Model {
  public username: string
  public password: string
}

export class Administrator extends Model {
  public id: string
  /**
   * 创建日期
   */
  public createdAt: string
  /**
   * 更新日期
   */
  public updatedAt: string
  /**
   * 用户名
   */
  public username: string
  /**
   * 姓名
   */
  public realname: string
}

export class UpdateAdministratorInput extends Model {
  public realname: string
}

export class AdministratorResetPasswordResponse extends Model {
  /**
   * 新生成随机密码
   */
  public password: string
}

export class UpdatePasswordInput extends Model {
  public oldPassword: string
  public newPassword: string
}

export class AdministratorInput extends Model {
  public username: string
  public password: string
}

export class AppInitInput extends Model {
  @Type(() => AdministratorInput)
  public administrator: AdministratorInput
}

export class QiniuConfig extends Model {
  /**
   * 域名
   */
  public domain: string
}

export class AppBaseResponse extends Model {
  /**
   * 授权Token
   */
  public base_time: number
  /**
   * 七牛配置
   */
  public qiniu: QiniuConfig
}

export class LoginInput extends Model {
  public username: string
  public password: string
}

export class TokenResponse extends Model {
  /**
   * 授权Token
   */
  public access_token: string
  /**
   * 刷新Token
   */
  public refresh_token: string
  /**
   * 授权Token过期时间
   */
  public expires_in: number
  /**
   * Token来源
   */
  public token_origin: string
}

export class CreateBannerInput extends Model {
  public title: string
  /**
   * Banner图片
   */
  public image: string
  /**
   * Banner类型
   */
  public type: string
  /**
   * 参数
   */
  public target: string
}

export class Banner extends Model {
  public id: string
  /**
   * 创建日期
   */
  public createdAt: string
  /**
   * 更新日期
   */
  public updatedAt: string
  /**
   * 排序
   */
  public sort: number
  /**
   * title
   */
  public title: string
  /**
   * Banner图片
   */
  public image: string
  /**
   * Banner类型
   */
  public type: string
  /**
   * 参数
   */
  public target: string
}

export class UpdateBannerInput extends Model {
  public title: string
  /**
   * Banner图片
   */
  public image: string
  /**
   * Banner类型
   */
  public type: string
  /**
   * 参数
   */
  public target: string
}

export class ChangeBannerOrderInput extends Model {
  /**
   * 目标位置Id
   */
  public target: string
}

export class CreateCategoryInput extends Model {
  /**
   * 标题
   */
  public title: string
  /**
   * 分类图片
   */
  public image: string
  /**
   * 是否推荐
   */
  public recommended: boolean
  /**
   * 父ID
   */
  public parentId: string
}

export class Category extends Model {
  public id: string
  /**
   * 创建日期
   */
  public createdAt: string
  /**
   * 更新日期
   */
  public updatedAt: string
  /**
   * 排序
   */
  public sort: number
  /**
   * 标题
   */
  public title: string
  /**
   * 图片
   */
  public image: string
  /**
   * 推荐
   */
  public recommended: boolean
  /**
   * 父节点
   */
  public parent: Category
  /**
   * 子节点
   */
  @Type(() => Category)
  public children: Category[]
}

export class UpdateCategoryInput extends Model {
  /**
   * 标题
   */
  public title: string
  /**
   * 分类图片
   */
  public image: string
  /**
   * 是否推荐
   */
  public recommended: boolean
  /**
   * 父ID
   */
  public parentId: string
}

export class CreateMaterialInput extends Model {
  public keys: string[]
  public group: string
}

export class Material extends Model {
  public id: string
  /**
   * 创建日期
   */
  public createdAt: string
  /**
   * 更新日期
   */
  public updatedAt: string
  /**
   * 素材Key
   */
  public key: string
  /**
   * 素材类型
   */
  public type: string
  /**
   * 来源
   */
  public origin: string
  /**
   * 分组
   */
  public group: string
}

export class MaterialGroupResponse extends Model {
  public id: string
  /**
   * 素材分组名称
   */
  public name: string
  /**
   * 分类素材数量
   */
  public count: number
}

export class CreateMaterialGroupInput extends Model {
  public name: string
}

export class UpdateMaterialGroupInput extends Model {
  public name: string
}

export class DeleteMaterialGroupInput extends Model {
  /**
   * 删除后移动到的目标分组ID
   */
  public target: string
}

export class Product extends Model {
  public id: string
  /**
   * 创建日期
   */
  public createdAt: string
  /**
   * 更新日期
   */
  public updatedAt: string
  /**
   * 标题
   */
  public title: string
  /**
   * 副标题
   */
  public subtitle: string
  /**
   * 关键字
   */
  public keyword: string[]
  /**
   * 推荐
   */
  public recommended: boolean
  /**
   * Bannner
   */
  public banners: string[]
  /**
   * 封面
   */
  public cover: string
  /**
   * 内容图
   */
  public contents: string[]
  /**
   * 分类
   */
  public category: Category
  /**
   * 属性
   */
  public attrs: string[]
  /**
   * 规格项
   */
  public specs: string[]
  /**
   * 最低价
   */
  public minPrice: object
  /**
   * 最高价
   */
  public maxPrice: object
}

export class createProductAttrItemInput extends Model {
  /**
   * 属性ID
   */
  public id: string
  /**
   * 属性项名称
   */
  public name: string
  /**
   * 图片
   */
  public image: string
}

export class createProductAttrInput extends Model {
  /**
   * 属性名称
   */
  public name: string
  /**
   * 是否是主属性
   */
  public primary: boolean
  /**
   * 属性项
   */
  @Type(() => createProductAttrItemInput)
  public items: createProductAttrItemInput[]
}

export class createProductSpecInput extends Model {
  /**
   * 属性项组合[]
   */
  public items: string[]
  public price: number
}

export class CreateProductInput extends Model {
  /**
   * 标题
   */
  public title: string
  /**
   * 副标题
   */
  public subtitle: string
  /**
   * 关键字
   */
  public keyword: string[]
  /**
   * 推荐
   */
  public recommended: boolean
  /**
   * Bannner
   */
  public banners: string[]
  /**
   * 封面
   */
  public cover: string
  /**
   * 内容图
   */
  public contents: string[]
  /**
   * 分类
   */
  public categoryId: string
  /**
   * 属性
   */
  @Type(() => createProductAttrInput)
  public attrs: createProductAttrInput[]
  /**
   * 规格项
   */
  @Type(() => createProductSpecInput)
  public specs: createProductSpecInput[]
}

export class UpdateProductInput extends Model {
  /**
   * 标题
   */
  public title: string
  /**
   * 副标题
   */
  public subtitle: string
  /**
   * 关键字
   */
  public keyword: string[]
  /**
   * 推荐
   */
  public recommended: boolean
  /**
   * Bannner
   */
  public banners: string[]
  /**
   * 封面
   */
  public cover: string
  /**
   * 内容图
   */
  public contents: string[]
  /**
   * 分类
   */
  public categoryId: string
  /**
   * 属性
   */
  @Type(() => createProductAttrInput)
  public attrs: createProductAttrInput[]
  /**
   * 规格项
   */
  @Type(() => createProductSpecInput)
  public specs: createProductSpecInput[]
}

export class GetUploadTokenResponse extends Model {
  /**
   * 七牛 Upload Token
   */
  public token: string
}
