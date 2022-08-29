import { ExtendService } from '@gopowerteam/http-request'
import { Ref } from 'vue'

export class LoadingService extends ExtendService {
  /**
   * Http loading
   * @param loadingStatus
   */
  constructor(private loadingStatus: Ref<boolean>) {
    super()
  }

  /**
   * 请求前置操作
   */
  public before = () => {
    this.loadingStatus.value = true
  }

  /**
   * 请求后置操作
   */
  public after = () => {
    this.loadingStatus.value = false
  }

  /**
   * catch 服务请求失败的时候处理
   */
  public catch = () => {
    this.loadingStatus.value = false
  }
}
