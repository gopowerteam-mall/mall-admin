import { RequestService } from '@gopowerteam/http-request'
import { appConfig } from '~/config/app.config'
import { Message } from '@arco-design/web-vue'
import { TokenService } from '~/http/extends/token.service'

export default function () {
  RequestService.setConfig({
    gateway: {
      default: appConfig.http.gateway as string,
    },
    timeout: 30000,
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
  })

  RequestService.interceptors.status.use((response) => {
    return true
  })

  RequestService.interceptors.success.use((response) => {
    return response.data
  })

  RequestService.interceptors.error.use((response) => {
    return response
  })

  RequestService.requestCatchHandle = (response) => {
    const defaultError = '服务通讯连接失败'
    const messageList: { [key: number]: string | undefined } = {
      400: '请求参数错误',
      405: '请求服务方法错误',
      500: '服务器内部错误',
      403: '没有权限，请重新登陆',
    }

    if (response) {
      const responseMessage = (response.data || {}).message
      const errorMessage =
        responseMessage || messageList[response.status] || defaultError

      Message.error(errorMessage)
    }
  }

  // 全局安装扩展服务
  RequestService.installExtendService(new TokenService())
}
