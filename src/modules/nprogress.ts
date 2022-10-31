import type { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'
import type { InstallModule } from '@/types/common'

export const install: InstallModule = ({
  isClient,
  router,
  app,
}: ViteSSGContext) => {
  if (isClient) {
    NProgress.configure({
      easing: 'ease',
      speed: 500,
    })

    router.beforeEach((to, from) => {
      if (to.path !== from.path) NProgress.start()
    })

    router.afterEach(() => {
      NProgress.done()
    })
  }
}
