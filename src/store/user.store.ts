import { createStore, withProps, setProp, setProps } from '@ngneat/elf'
import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state'
import dayjs from 'dayjs'
import { map } from 'rxjs'
import { Admin } from '~/http/model'
import { StoreAction, StoreQuery } from '~/store'

interface State {
  accessToken: string
  refreshToken: string
  expiresTime?: number
  current?: Admin
}

const STORE_KEY = 'user'

const userStore = createStore(
  { name: STORE_KEY },
  withProps<State>({
    accessToken: '',
    refreshToken: '',
  }),
)

/**
 * 查询操作
 */
class UserQuery extends StoreQuery<State> {
  constructor() {
    super(userStore)
  }

  /**
   * 获取登录状态
   */
  get isLogin() {
    return this.steam$.pipe(
      map((state) => !!state.accessToken && !state.refreshToken),
    )
  }

  /**
   * 获取AccessToken
   */
  get accessToken() {
    const { accessToken, expiresTime } = this.select()

    if (accessToken && dayjs().isBefore(dayjs(expiresTime))) {
      return accessToken
    } else {
      return ''
    }
  }

  /**
   * 获取安装AccessToken
   */
  get safeAccessToken() {
    const { accessToken, expiresTime } = this.select()
    const safeMinute = 5

    if (
      accessToken &&
      dayjs().isBefore(dayjs(expiresTime).subtract(safeMinute, 'minutes'))
    ) {
      return accessToken
    } else {
      return ''
    }
  }
}

class UserAction extends StoreAction<State> {
  constructor() {
    super(userStore)
  }

  /**
   * 更新用户
   * @param user
   */
  updateCurrent(admin: Admin) {
    this.store.update(setProp('current', admin))
  }

  /**
   * 更新用户
   * @param user
   */
  updateToken({
    accessToken,
    refreshToken,
    expiresIn,
  }: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }) {
    // 获取过期时间
    const expiresTime = dayjs().add(expiresIn, 'seconds').valueOf()

    this.store.update(
      setProps({
        accessToken,
        refreshToken,
        expiresTime,
      }),
    )
  }

  /**
   * 清空用户登录信息
   */
  logout() {
    this.store.update(
      setProps({
        current: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        expiresTime: undefined,
      }),
    )
  }
}

/**
 * 持久化存储
 */
persistState(userStore, {
  key: STORE_KEY,
  storage: localStorageStrategy,
  source: () => userStore.pipe(excludeKeys(['current'])),
})

export const userQuery = new UserQuery()
export const userAction = new UserAction()
