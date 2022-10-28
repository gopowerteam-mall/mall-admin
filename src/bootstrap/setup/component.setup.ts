import DynamicTable, { type DataRecord } from '@gopowerteam/vue-dynamic-table'
import type { App } from 'vue'

export default function (app: App<Element>) {
  app.use(DynamicTable, {
    override: {
      name: 'data-table',
      table: {
        test: () => (row: DataRecord) => h('div', [row.name]),
      },
    },
  })
}
