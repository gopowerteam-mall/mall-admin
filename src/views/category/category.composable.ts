import { useRequest } from 'virtual:http-request'
import type { Category } from '~/http/model'

/**
 * 分类数据
 */
export const dataList = ref<Category[]>([])

const categroyService = useRequest((service) => service.CategoryService)

/** 刷新数据
 * 列表页面刷新，子页面使用
 */
export function refreshData() {
  categroyService
    .findCategory({
      recursion: true,
    })
    .subscribe({
      next: (data) => (dataList.value = data),
    })
}
