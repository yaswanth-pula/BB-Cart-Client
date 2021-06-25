interface ProductType {
  productId: string;
  name: string;
  price: number;
  units: string;
  imageUrl: string;
}

interface CategoryType {
  categoryId: string;
  name: string;
  products: [ProductType];
}

export type { CategoryType, ProductType };
