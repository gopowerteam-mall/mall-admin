export type PageMetaAuth = {
  required: boolean
  roles: string[]
}

export type PageMetaMenu = {
  key: string
  icon: string
  title: string
}

export type PageMeta = {
  auth: PageMetaAuth
  menu: PageMetaMenu
}
