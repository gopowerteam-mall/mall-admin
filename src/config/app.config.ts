import { AppConfig } from '~/types/app.config'

export const appConfig: AppConfig = {
  app: 'mall-admin',
  title: '商城后台管理',
  logo: '/logo.png',
  http: {
    gateway: import.meta.env.VITE_HTTP_GATEWAY,
    timeout: 3000,
  },
  workspace: {
    navigation: 'all',
    tabs: true,
    headerFixed: true,
    sideFixed: true,
    tabsFixed: false,
    contentWidth: 'auto',
    sideWidth: 200,
    sideCollapsedWidth: 60,
    sideMode: 'pop',
    headerHeight: 60,
  },
  theme: {
    style: 'auto',
  },
}
