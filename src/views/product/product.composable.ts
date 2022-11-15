import type { Product } from '@/http/models/Product'

// table columns settings
export const tableColumns = [
  {
    title: '产品名称',
    dataIndex: 'title',
  },
  {
    title: '产品名称',
    dataIndex: 'title',
  },
  {
    title: '检索图片',
    slotName: 'cover',
  },
  {
    title: '启用状态',
    slotName: 'enable',
  },
  // operator
  {
    slotName: 'operatorCell',
    titleSlotName: 'operatorTitle',
  },
]

export type FindProduct = {
  /**
   * 标题
   */
  title?: string
  /**
   * 分类
   */
  category?: string
  /**
   * 是否推荐
   */
  recommended?: boolean
}

export type PropertySpecification = {
  id: string
  name: string
  image: string
}
export type ProductPropertyInfo = {
  name: string
  primary: boolean
  items: PropertySpecification[]
}

// picks some properties which propduct type, to define the base type
export type ProductBaseType = Pick<
  Product,
  'title' | 'subtitle' | 'recommended' | 'keyword' | 'banners' | 'cover'
> & { categoryId: string }
