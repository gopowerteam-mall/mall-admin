import type { RequestPlugin, RequestSendOptions } from '@gopowerteam/request'
import { userQuery } from '~/store/user.store'

export class TokenService implements RequestPlugin {
  public before(options: RequestSendOptions) {
    const accessToken = userQuery.select((state) => state.accessToken)

    if (accessToken) {
      options.headers = {
        ...options.headers,
        ['Authorization']: `Bearer ${accessToken}`,
      }
    }
  }
}
