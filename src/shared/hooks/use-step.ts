import { providers } from '@/config/provider.config'

export function useStep() {
  return inject(providers.step)
}
