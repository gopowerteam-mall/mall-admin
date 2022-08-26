import dayjs from 'dayjs'

type DateType = string | number | Date

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
