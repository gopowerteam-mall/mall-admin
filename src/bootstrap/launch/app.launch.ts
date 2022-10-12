import { lastValueFrom } from 'rxjs'
import { useRequest } from 'virtual:http-request'
import type { Router } from 'vue-router'
import { appAction, appQuery } from '@/store/app.store'

/**
 * 更新基础信息
 * @returns
 */
async function getAppBase() {
  const appService = useRequest((service) => service.AppService)
  return lastValueFrom(appService.appBase()).then(({ base_time, qiniu }) => {
    appAction.updateBase({ basetime: base_time, qiniu })
  })
}

/**
 * 系统启动列表
 * @returns
 */
export default async function appLaunch(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 当前置页面进入不需要验证状态
    if (to.name === 'welcome') {
      return next()
    }

    if (!appQuery.select((state) => state.ready)) {
      // 获取应用基础信息
      await getAppBase().catch(({ ready }) => {
        if (ready === false) {
          // 系统未初始化需要进行初始化
          return next('/welcome')
        }
      })

      // 设置系统准备状态
      appAction.setReady()
    }

    if (
      appQuery.select((state) => state.ready) &&
      appQuery.select((state) => state.base)
    ) {
      next()
    }
  })
}
