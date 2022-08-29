import { ExtendService, RequestParams } from '@gopowerteam/http-request'

export class PageService extends ExtendService {
  public default = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
  }
  public pageSize = 0
  public pageIndex = 0
  public total = 0
  public pageSizeOptions: number[] = []
  public finished = false

  constructor(data?: any) {
    super()

    if (data) this.default = { ...this.default, ...data }

    this.pageSize = this.default.pageSize
    this.pageIndex = this.default.pageIndex || 1
    this.total = this.default.total
    this.pageSizeOptions = this.default.pageSizeOptions
  }

  public before = (params: RequestParams) => {
    params.setData({
      ...(params.getData() || {}),
      size: this.pageSize,
      page: this.pageIndex - 1,
    })
  }

  public after = (
    response: any,
    params: RequestParams,
    setData: (data: any) => void,
  ) => {
    this.total = response.total
    setData(response.data)
    this.updateFinished()
  }

  public reset() {
    this.pageIndex = this.default.pageIndex
    this.pageSize = this.default.pageSize
  }

  public update(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex
    this.pageSize = pageSize
    return Promise.resolve()
  }

  /**
   * 分页完成状态
   */
  public updateFinished() {
    const total = this.total
    const pageIndex = this.pageIndex
    const pageSize = this.pageSize

    const getFinished = () => {
      if (total === 0) return true

      if (total < pageIndex * pageSize) return true

      return false
    }
    this.finished = getFinished()
  }

  /**
   * 分页前进操作
   * @param callback
   */
  public next(callback: any) {
    if (!this.finished) {
      this.pageIndex = this.pageIndex + 1
      callback(true)
    } else {
      callback(false)
    }
  }
}
