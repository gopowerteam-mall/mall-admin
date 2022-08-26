import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class CreateAdministratorInput extends Model {
  public username : string
  public password : string
}

export class Administrator extends Model {
  public id : string
  /**
   * 创建日期
   */
  public createdAt : string
  /**
   * 更新日期
   */
  public updatedAt : string
  /**
   * 用户名
   */
  public username : string
  /**
   * 姓名
   */
  public realname : string
}

export class UpdateAdministratorInput extends Model {
  public realname : string
}

export class AdministratorResetPasswordResponse extends Model {
  /**
   * 新生成随机密码
   */
  public password : string
}

export class UpdatePasswordInput extends Model {
  public oldPassword : string
  public newPassword : string
}

export class AdministratorInput extends Model {
  public username : string
  public password : string
}

export class AppInitInput extends Model {
  @Type(() => AdministratorInput)
  public administrator : AdministratorInput
}

export class QiniuConfig extends Model {
  /**
   * 域名
   */
  public domain : string
}

export class AppBaseResponse extends Model {
  /**
   * 授权Token
   */
  public base_time : number
  /**
   * 七牛配置
   */
  public qiniu : QiniuConfig
}

export class LoginInput extends Model {
  public username : string
  public password : string
}

export class TokenResponse extends Model {
  /**
   * 授权Token
   */
  public access_token : string
  /**
   * 刷新Token
   */
  public refresh_token : string
  /**
   * 授权Token过期时间
   */
  public expires_in : number
  /**
   * Token来源
   */
  public token_origin : string
}

export class CreateBannerInput extends Model {
  public title : string
  /**
   * Banner图片
   */
  public image : string
  /**
   * Banner类型
   */
  public type : string
  /**
   * 参数
   */
  public target : string
}

export class Banner extends Model {
  public id : string
  /**
   * 创建日期
   */
  public createdAt : string
  /**
   * 更新日期
   */
  public updatedAt : string
  /**
   * 排序
   */
  public sort : number
  /**
   * title
   */
  public title : string
  /**
   * Banner图片
   */
  public image : string
  /**
   * Banner类型
   */
  public type : string
  /**
   * 参数
   */
  public target : string
}

export class UpdateBannerInput extends Model {
  public title : string
  /**
   * Banner图片
   */
  public image : string
  /**
   * Banner类型
   */
  public type : string
  /**
   * 参数
   */
  public target : string
}

export class ChangeBannerOrderInput extends Model {
  /**
   * 目标位置Id
   */
  public target : string
}

export class GetUploadTokenResponse extends Model {
  /**
   * 七牛 Upload Token
   */
  public token : string
}
