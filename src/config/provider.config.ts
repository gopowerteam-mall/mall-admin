import type { Product } from '@/http/models/Product'

export const providers = {
  product: Symbol() as InjectionKey<Ref<Product | undefined>>,
  step: Symbol() as InjectionKey<{
    dataSource: Ref<Record<string, any>>
    onNextStep: (
      action: () => boolean | undefined | Record<string, any>,
    ) => void
  }>,
}
