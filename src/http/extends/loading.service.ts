import { ExtendService } from '@gopowerteam/http-request'
import { Observable, Observer } from 'rxjs'

export class LoadingService extends ExtendService {
  public status: Observable<boolean>

  public subscriber!: Observer<boolean>

  constructor() {
    super()
    this.status = new Observable((subscriber) => (this.subscriber = subscriber))
  }

  /**
   * 请求前置操作
   */
  public before = () => {
    this.subscriber.next(true)
  }

  /**
   * 请求后置操作
   */
  public after = () => {
    this.subscriber.next(false)
  }

  /**
   * catch 服务请求失败的时候处理
   */
  public catch = () => {
    this.subscriber.next(false)
  }
}
