import { ExtendService, RequestParams } from '@gopowerteam/http-request'
import { userQuery } from '~/store/user.store'

export class TokenService extends ExtendService {
  public before = (params: RequestParams) => {
    const accessToken = userQuery.select((state) => state.accessToken)
    const options = params.getOptions()

    if (accessToken) {
      const header = {
        ['Authorization']: `Bearer ${accessToken}`,
        ...(options.header || {}),
      }

      // 更新header配置
      params.setOptions({
        ...options,
        header,
      })
    }
  }
}
