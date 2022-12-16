declare module 'virtual:request' {
import { AdministratorService } from '@/http/services/AdministratorService'
import { AppService } from '@/http/services/AppService'
import { BannerService } from '@/http/services/BannerService'
import { CategoryService } from '@/http/services/CategoryService'
import { MaterialService } from '@/http/services/MaterialService'
import { OrderService } from '@/http/services/OrderService'
import { ProductService } from '@/http/services/ProductService'
import { QiniuService } from '@/http/services/QiniuService'

const serviceMap = {
  AdministratorService,
  AppService,
  BannerService,
  CategoryService,
  MaterialService,
  OrderService,
  ProductService,
  QiniuService,
}

  export function useRequest<T>(
  select: (services: typeof serviceMap) => { new (): T }
): T
}
