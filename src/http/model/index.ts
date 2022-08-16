import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'

export class Admin extends Model {
  public username: string
  public password: string
}

export class AppInitDTO extends Model {
  @Type(() => Admin)
  public admin: Admin
}

export class LoginDTO extends Model {
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
