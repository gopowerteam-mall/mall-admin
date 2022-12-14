import DynamicTable, { type DataRecord } from '@gopowerteam/vue-dynamic-table'
import type { App } from 'vue'

export default function (app: App<Element>) {
  app.use(DynamicTable, {
    name: 'data-table',
    override: {
      table: {
        test: () => (row: DataRecord) => h('div', [row.name]),
      },
    },
  })
}
