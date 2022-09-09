/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { AdministratorController } from '~/http/controllers/administrator.controller'
import { Administrator, AdministratorResetPasswordResponse } from '~/http/model'

export class AdministratorService {
  /**
   * 创建管理员
   */
  @Request({
    server: AdministratorController.createAdministrator,
    model: Administrator
  })
  public createAdministrator(
    params?: RequestParams | { [key: string]: any }
  ): Observable<Administrator> {
    return RequestParams.create(params).request();
  }
  /**
   * 查询管理员列表
   */
  @Request({
    server: AdministratorController.findAdministrator,
    model: Administrator
  })
  public findAdministrator(
    params?: RequestParams | { [key: string]: any }
  ): Observable<Administrator[]> {
    return RequestParams.create(params).request();
  }
  /**
   * 更新管理员
   */
  @Request({
    server: AdministratorController.updateAdministrator,
    model: Administrator
  })
  public updateAdministrator(
    params?: RequestParams | { [key: string]: any }
  ): Observable<Administrator> {
    return RequestParams.create(params).request();
  }
  /**
   * 获取管理员
   */
  @Request({
    server: AdministratorController.getAdministrator,
    model: Administrator
  })
  public getAdministrator(
    params?: RequestParams | { [key: string]: any }
  ): Observable<Administrator> {
    return RequestParams.create(params).request();
  }
  /**
   * 删除用户
   */
  @Request({
    server: AdministratorController.deleteAdministrator,
  })
  public deleteAdministrator(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 重置管理员密码
   */
  @Request({
    server: AdministratorController.resetAdministratorPassword,
    model: AdministratorResetPasswordResponse
  })
  public resetAdministratorPassword(
    params?: RequestParams | { [key: string]: any }
  ): Observable<AdministratorResetPasswordResponse> {
    return RequestParams.create(params).request();
  }
  /**
   * 更新管理员密码
   */
  @Request({
    server: AdministratorController.updateAdministratorPassword,
  })
  public updateAdministratorPassword(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
}
