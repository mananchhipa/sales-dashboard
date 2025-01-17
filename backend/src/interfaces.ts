export interface Sale {
  rowId: number;
  orderId: string;
  orderDate: string;
  shipDate: string;
  shipMode: string;
  customerId: string;
  customerName: string;
  segment: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  region: string;
  productId: string;
  category: string;
  subCategory:string;
  productName: string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
}
