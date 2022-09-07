import dayjs from 'dayjs'

type DateType = string | number | Date | dayjs.Dayjs

type DateFormat =
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'HH:mm:ss'
  | 'HH:mm'

/**
 * 日期格式化
 * @params value 要被格式化的日期数据
 */
export function dateFormat(value?: DateType): string
export function dateFormat(value?: DateType, format?: DateFormat): string
export function dateFormat(value?: DateType, format?: string): string
export function dateFormat(
  value?: DateType,
  format: DateFormat | string = 'YYYY-MM-DD',
) {
  return dayjs(value).format(format)
}

/**
 * 时间格式化
 * @params value 要被格式化的时间数据
 */
export function dateTimeFormat(value?: DateType) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
