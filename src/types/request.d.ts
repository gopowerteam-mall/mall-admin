declare module 'virtual:http-request' {
  import { AdminService } from '~/http/services/admin.service'
  import { AppService } from '~/http/services/app.service'
  import { QiniuService } from '~/http/services/qiniu.service'

  const serviceMap = {
    AdminService,
    AppService,
    QiniuService,
  }

  export function useRequest<T>(
    select: (services: typeof serviceMap) => { new (): T },
  ): T
}
