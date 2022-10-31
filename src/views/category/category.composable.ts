import type { Category } from '@/http/models/Category'
import { useRequest } from 'virtual:request'

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
    .then((data) => (dataList.value = data))
}
