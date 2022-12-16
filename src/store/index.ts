import { select, Store, type StoreDef, type StoreValue } from '@ngneat/elf'
import { type OperatorFunction, pipe, map } from 'rxjs'

export abstract class StoreAction<T> {
  protected store!: Store<StoreDef, T>

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }
}

export abstract class StoreQuery<T> {
  protected readonly store!: Store<StoreDef, T>

  public get steam$() {
    return this.store.pipe(select((state) => state))
  }

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }

  select(): T
  select<R>(selector: (state: T) => R): R
  select<R>(selector?: (state: T) => R) {
    const state = this.store.getValue()

    return selector ? selector(state) : state
  }
}

export function includeKeys<S extends Store, State extends StoreValue<S>>(
  keys: Array<keyof State>,
): OperatorFunction<State, Partial<State>> {
  return pipe(
    map((state) => {
      return Object.keys(state).reduce<State>((toSave, key) => {
        if (keys.includes(key)) {
          toSave[key] = state[key]
        }

        return toSave
      }, {} as State)
    }),
  )
}
