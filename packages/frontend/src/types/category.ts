export type Subcategory = {
  slug: string
  name: string
  sortOrder: number
  selected?: boolean
}

export type Category = {
  slug: string
  name: string
  subcategories?: Subcategory[]
}
