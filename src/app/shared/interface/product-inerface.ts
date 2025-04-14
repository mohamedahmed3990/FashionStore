export interface ProductInerface {
  productId: number
  productName: string
  description: string
  productPicture: string
  subCategoryName: string
  categoryName: string
  productVariants: ProductVariant[]
}

export interface ProductVariant {
  id: number
  color: Color
  size: Size
  price: number
}

export interface Color {
  id: number
  name: string
  hexa: string
}

export interface Size {
  name: string
}




export interface Productcart {
  id: number
  productName: string;
  pictureUrl: string
  color: string
  size: string
  category: string
  price: number
  quantity: number
}