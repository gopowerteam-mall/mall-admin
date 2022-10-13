/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { CategoryController } from '~/http/controllers/category.controller'
import { Category } from '~/http/model'

export class CategoryService {
  /**
   * 创建分类
   */
  @Request({
    server: CategoryController.createCategory,
    model: Category,
  })
  public createCategory(
    params?: RequestParams | { [key: string]: any },
  ): Observable<Category> {
    return RequestParams.create(params).request()
  }
  /**
   * 查询分类
   */
  @Request({
    server: CategoryController.findCategory,
    model: Category,
  })
  public findCategory(
    params?: RequestParams | { [key: string]: any },
  ): Observable<Category[]> {
    return RequestParams.create(params).request()
  }
  /**
   * 更新分类
   */
  @Request({
    server: CategoryController.updateCategory,
    model: Category,
  })
  public updateCategory(
    params?: RequestParams | { [key: string]: any },
  ): Observable<Category> {
    return RequestParams.create(params).request()
  }
  /**
   * 获取分类
   */
  @Request({
    server: CategoryController.getCategory,
    model: Category,
  })
  public getCategory(
    params?: RequestParams | { [key: string]: any },
  ): Observable<Category> {
    return RequestParams.create(params).request()
  }
  /**
   * 删除分类
   */
  @Request({
    server: CategoryController.deleteCategory,
  })
  public deleteCategory(
    params?: RequestParams | { [key: string]: any },
  ): Observable<any> {
    return RequestParams.create(params).request()
  }
}
