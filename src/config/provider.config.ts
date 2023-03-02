import type { Product } from '@/http/models/Product'

export const providers = {
  product: Symbol() as InjectionKey<Ref<Product | undefined>>,
  step: Symbol() as InjectionKey<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataSource: Map<string, any>
    onNextStep: (
      executor: (
        resolve: (
          value: boolean | undefined | Record<string, any> | void,
        ) => void,
        reject: (reason?: string) => void,
      ) => void,
    ) => void
  }>,
}
