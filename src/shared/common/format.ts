import dayjs from 'dayjs'

type DateType = string | number | Date

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

/**
 * 日期格式化
 * @params value 要被格式化的日期数据
 */
export function dateFormat(value?: DateType) {
  return dayjs(value).format('YYYY-MM-DD')
}

/**
 * 时间格式化
 * @params value 要被格式化的时间数据
 */
export function dateTimeFormat(value?: DateType) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
