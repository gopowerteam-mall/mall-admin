import type { Product } from '@/http/models/Product'
import type { ProductAttr } from '@/http/models/ProductAttr'

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
  id: string
  name: string
  primary: boolean
  items: PropertySpecification[]
}

// picks some properties which propduct type, to define the base type
export type ProductBaseType = Pick<
  Product,
  | 'title'
  | 'subtitle'
  | 'recommended'
  | 'keyword'
  | 'banners'
  | 'cover'
  | 'contents'
> & { categoryId: string }

export type ProductAttrBase = Pick<ProductAttr, 'id' | 'name' | 'primary'>

export type ProductAttrPrice = {
  id: string
  price: number | null
  items: PropertySpecification[]
}

export const productFormBaseRule = {
  title: { required: true, message: '请输入商品标题' },
  subtitle: { required: true, message: '请输入商品副标题' },
  keyword: [
    { required: true, message: '请输入关键字' },
    { maxLength: 10, message: '关键字最多有10个' },
  ],
  banners: { required: true, message: '请配置商品缩略图' },
  cover: { required: true, message: '请配置商品列表封面图' },
  categoryId: { required: true, message: '请选择商品细分类目' },
  contents: [
    { required: true, message: '请选择商品详情图片' },
    { minLength: 1, message: '最少选择1个图片详情' },
    { maxLength: 20, message: '最多选择20个图片详情' },
  ],
}
