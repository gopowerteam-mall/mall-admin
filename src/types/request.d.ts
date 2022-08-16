declare module 'virtual:http-request' {
  import { AppService } from '~/http/services/app.service'

  const serviceMap = {
      AppService
    }

  export function useRequest<T>(
    select: (services: typeof serviceMap) => { new (): T }
  ): T
}
