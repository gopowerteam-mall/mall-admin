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
  title: string
  /**
   * 分类
   */
  category: string
  /**
   * 是否推荐
   */
  recommended?: boolean
}
