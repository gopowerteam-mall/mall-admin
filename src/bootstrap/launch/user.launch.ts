import type { Router } from 'vue-router'
import { appConfig } from '@/config/app.config'
import menus from '@/config/menu.config'
import { appAction } from '@/store/app.store'
import { userAction, userQuery } from '@/store/user.store'
import type { Menu } from '@/types/workspace'
import { useRequest } from 'virtual:request'
import type { PageMeta } from '@/types/common'
/**
 * 检测用户菜单权限
 */
function checkUserMenuRole(_menu: Menu) {
  // TODO: 用户菜单权限检测
  return true
}

/**
 * 生成用户菜单
 */
function generateUserMenu(router: Router) {
  if (!userQuery.select((state) => state.current)) {
    return
  }

  // 获取路由菜单
  const pages = router
    .getRoutes()
    .filter(
      (route) =>
        route.children.length &&
        route.children[0]?.meta?.menu &&
        route.children[0]?.meta?.layout === 'workspace',
    )
    .map(
      (route) =>
        ({
          path: route.path,
          name: route.children[0].name,
          // 认证配置信息
          auth: route.children[0]?.meta?.auth,
          // 菜单配置信息
          ...(route.children[0]?.meta?.menu as Record<string, string>),
        } as Menu),
    )

  // 当前用户菜单列表
  const userMenus: Menu[] = [...pages, ...menus].filter(checkUserMenuRole)

  // 获取根菜单项
  const roots = userMenus.filter(
    (route) => route.key && !route.key.includes('.'),
  )

  // TODO: 处理排序排序问题
  // 生成用户菜单树
  const createMenuTree = (menu: Menu) => {
    const children = userMenus.filter(
      (route) => route.key === `${menu.key}.${route.key.split('.').slice(-1)}`,
    )

    if (!menu.path) {
      menu.children = children.map(createMenuTree).filter(Boolean) as Menu[]
    } else {
      menu.isLeaf = true
    }

    // 去除无子节点的空目录
    if (!menu.path && menu.children?.length === 0) {
      return
    } else {
      return menu
    }
  }

  // 获取用户顶部菜单
  const headerMenus = roots
    .map(createMenuTree)
    .filter(Boolean)
    .filter((menu) => menu?.path || menu?.children?.length) as Menu[]

  // 更新用户菜单
  appAction.updateMenus(userMenus)

  // 更新顶部菜单
  // 更新侧边菜单
  switch (appConfig.workspace.navigation) {
    case 'header':
      appAction.updateHeaderMenus(headerMenus)
      break
    case 'side':
      appAction.updateSideMenus(headerMenus)
      break
    case 'all': {
      headerMenus.forEach((m) => (m.isLeaf = true))
      appAction.updateHeaderMenus(headerMenus)

      break
    }
  }
}

/**
 * 更新用户数据
 */
function updateCurrentToken() {
  // TODO： update token
  const _appService = useRequest((service) => service.AppService)
  const accessToken = userQuery.safeAccessToken
  const refreshToken = userQuery.select((state) => state.refreshToken)

  if (!accessToken && refreshToken) {
    return
  }
}

/**
 * 更新用户数据
 */
function updateCurrentUser() {
  const appService = useRequest((service) => service.AppService)
  const accessToken = userQuery.select((state) => state.accessToken)

  if (accessToken) {
    return appService.getCurrentAdmin().then((data) => {
      userAction.updateCurrent(data)
    })
  }
}

/**
 *
 * @param roles
 * @returns
 */
function ValidateUserRole(roles?: string[]) {
  const current = userQuery.select((state) => state.current)

  if (!current) {
    return false
  }

  if (!roles || !roles.length) {
    return true
  }

  // TODO:用户权限检验
  return true
}

/**
 * 系统启动列表
 * @returns
 */
export default function userLaunch(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const meta = to.meta as PageMeta
    // 非必要授权页面直接进入
    if (meta?.auth?.required === false) {
      return next()
    }

    // 未登录用户处理
    if (!userQuery.select((state) => state.current)) {
      // 更新用户Token
      await updateCurrentToken()

      // 更新用户信息
      await updateCurrentUser()

      // 生成用户菜单
      await generateUserMenu(router)
    }

    // 未登录用户进行登录
    if (!userQuery.select((state) => state.current)) {
      return next('/login')
    }

    // 已登录用户校验权限
    if (ValidateUserRole(meta?.auth?.roles)) {
      return next()
    } else {
      // 提示用户权限不足
      return next('/403')
    }
  })
}
