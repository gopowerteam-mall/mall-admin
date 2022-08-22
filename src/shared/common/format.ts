interface CurrencyConfig {
  thousands: boolean
  sign: boolean
  scale: number
  precision: number
}

/**
 * 默认格式化配置
 */
const defaultConfig: CurrencyConfig = {
  thousands: false,
  sign: false,
  scale: 2,
  precision: 0,
}

export function currency(value: number, config?: Partial<CurrencyConfig>) {
  const currencyConfig: CurrencyConfig = {
    ...defaultConfig,
    ...(config || {}),
  }

  // 金额缩放处理
  value = value / Math.pow(10, currencyConfig.scale)

  // 返回格式化金额
  // TODO: 小程序中无法使用
  return value.toLocaleString('zh-CN', {
    useGrouping: currencyConfig.thousands,
    minimumFractionDigits: currencyConfig.precision,
    ...(currencyConfig.sign
      ? {
          currency: 'CNY',
          style: 'currency',
        }
      : {}),
  })
}
