declare module 'virtual:http-request' {
  import { AdministratorService } from '~/http/services/administrator.service'
  import { AppService } from '~/http/services/app.service'
  import { BannerService } from '~/http/services/banner.service'
  import { CategoryService } from '~/http/services/category.service'
  import { QiniuService } from '~/http/services/qiniu.service'

  const serviceMap = {
      AdministratorService,
    AppService,
    BannerService,
    CategoryService,
    QiniuService
    }

  export function useRequest<T>(
    select: (services: typeof serviceMap) => { new (): T }
  ): T
}
