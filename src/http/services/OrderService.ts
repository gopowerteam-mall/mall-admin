/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubmitOrderInput } from '../models/SubmitOrderInput';
import type { ProductOrder } from '../models/ProductOrder';
import type { PaymentOrder } from '../models/PaymentOrder';
import { RequestService, type RequestPlugin } from '@gopowerteam/request';

export class OrderService {
  // 请求实例
  private request = RequestService.getInstance();

  /**
   * 提交订单
   */
  public submitOrder(
    requestBody: SubmitOrderInput,
    requestPlugins: RequestPlugin[] = []
  ): Promise<ProductOrder> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/order/submit',
        method: 'post',
        paramsBody: requestBody,
      },
      requestPlugins
    );
  
    return result
  }
  
  /**
   * 支付订单
   */
  public paymentOrder(
    id: string,
    requestPlugins: RequestPlugin[] = []
  ): Promise<PaymentOrder> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/order/payment/{id}',
        method: 'post',
        paramsPath: {
          id,
        },
      },
      requestPlugins
    );
  
    return result
  }
  
  /**
   * 取消订单
   */
  public cancelOrder(
    id: string,
    requestPlugins: RequestPlugin[] = []
  ): Promise<ProductOrder> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/order/cancel/{id}',
        method: 'put',
        paramsPath: {
          id,
        },
      },
      requestPlugins
    );
  
    return result
  }
  
  /**
   * 删除订单
   */
  public deleteOrder(
    id: string,
    requestPlugins: RequestPlugin[] = []
  ): Promise<ProductOrder> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/admin/order/{id}',
        method: 'delete',
        paramsPath: {
          id,
        },
      },
      requestPlugins
    );
  
    return result
  }
  
}


namespace RequestQueryParams {
}
