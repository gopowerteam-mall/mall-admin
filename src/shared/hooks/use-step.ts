import { providers } from '@/config/provider.config'

export function useStep() {
  const dataSource =
    // 获取数据源
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inject(providers.step)?.dataSource || new Map<string, any>()

  const onNextStep =
    // 获取下一步操作
    inject(providers.step)?.onNextStep || (() => void 0)

  return {
    dataSource,
    onNextStep,
  }
}
