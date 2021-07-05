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
interface OrderItemType extends ProductType {
  quantity: number;
}
interface Order {
  orderId: string;
  products: [OrderItemType];
}

export type { CategoryType, ProductType, OrderItemType, Order };
