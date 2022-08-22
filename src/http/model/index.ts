import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'

export class CreateAdminInput extends Model {
  public username: string
  public password: string
}

export class Admin extends Model {
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

export class UpdateAdminInput extends Model {
  public realname: string
}

export class AdminResetPasswordResponse extends Model {
  /**
   * 新生成随机密码
   */
  public password: string
}

export class UpdatePasswordInput extends Model {
  public oldPassword: string
  public newPassword: string
}

export class AdminInput extends Model {
  public username: string
  public password: string
}

export class AppInitInput extends Model {
  @Type(() => AdminInput)
  public admin: AdminInput
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

export class GetUploadTokenResponse extends Model {
  /**
   * 七牛 Upload Token
   */
  public token: string
}
