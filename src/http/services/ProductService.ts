/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product'
import type { CreateProductInput } from '../models/CreateProductInput'
import type { UpdateProductInput } from '../models/UpdateProductInput'
import type { ProductVersion } from '../models/ProductVersion'
import type { SetupProductAttrsInput } from '../models/SetupProductAttrsInput'
import type { ProductAttr } from '../models/ProductAttr'
import type { SetupProductAttrItemsInput } from '../models/SetupProductAttrItemsInput'
import type { ProductSpec } from '../models/ProductSpec'
import type { SetupProductSpecsInput } from '../models/SetupProductSpecsInput'
import type { UpdateProductAttrInput } from '../models/UpdateProductAttrInput'
import type { UpdateProductAttrItemInput } from '../models/UpdateProductAttrItemInput'
import type { ProductAttrItem } from '../models/ProductAttrItem'
import type { UpdateProductSpecInput } from '../models/UpdateProductSpecInput'
import { RequestService, type RequestPlugin } from '@gopowerteam/request'

export class ProductService {
  // 请求实例
  private request = RequestService.getInstance()

  /**
   * 查询商品
   */
  public findProduct(
    requestQuery: RequestQueryParams.FindProduct,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product',
        method: 'get',
        paramsQuery: requestQuery,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 创建商品
   */
  public createProduct(
    requestBody: CreateProductInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product',
        method: 'post',
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取商品
   */
  public getProduct(
    id: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}',
        method: 'get',
        paramsPath: {
          id,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 更新商品
   */
  public updateProduct(
    id: string,
    requestBody: UpdateProductInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取商品所有版本
   */
  public findVersion(
    id: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductVersion> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}/version',
        method: 'get',
        paramsPath: {
          id,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 创建商品配置版本
   */
  public createProductVersion(
    id: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductVersion> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}/version',
        method: 'post',
        paramsPath: {
          id,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取商品指定版本
   */
  public getVersion(
    id: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductVersion> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/version/{id}',
        method: 'get',
        paramsPath: {
          id,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 上架商品
   */
  public publishProduct(
    id: string,
    versionId: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/publish/{id}/{versionId}',
        method: 'put',
        paramsPath: {
          id,
          versionId,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 下架商品
   */
  public unpublishProduct(
    id: string,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/unpublish/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 配置商品属性项
   */
  public setupProductAttrs(
    id: string,
    requestBody: SetupProductAttrsInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductAttr[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}/product-attrs',
        method: 'post',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 配置商品属性项
   */
  public setupProductAttrItems(
    id: string,
    requestBody: SetupProductAttrItemsInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductSpec[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}/product-attr-items',
        method: 'post',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 配置商品Specs
   */
  public setupProductSpecs(
    requestBody: SetupProductSpecsInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductSpec[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/{id}/product-specs',
        method: 'post',
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 更新商品属性
   */
  public updateProductAttr(
    id: string,
    requestBody: UpdateProductAttrInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductAttr> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/product-attr/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 更新商品属性项
   */
  public updateProductAttrItem(
    id: string,
    requestBody: UpdateProductAttrItemInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductAttrItem> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/product-attr-item/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 更新商品Spec
   */
  public updateProductSpec(
    id: string,
    requestBody: UpdateProductSpecInput,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<ProductSpec> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/product/product-spec/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
        paramsBody: requestBody,
      },
      requestPlugins,
    )

    return result
  }
}

namespace RequestQueryParams {
  export type FindProduct = {
    /**
     * 标题
     */
    title?: string
    /**
     * 分类
     */
    category?: string
    /**
     * 是否推荐
     */
    recommended?: boolean
  }
}
