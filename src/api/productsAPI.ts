import axios from "axios";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  id: number;
}
const apiInstance = axios.create({
  baseURL: "http://localhost:3003/products",
});

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await apiInstance.get("/");
  const data: IProduct[] = response.data;
  console.log(data);

  return data;
};

export const createProduct = (product: IProduct) =>
  apiInstance.post("/", product);

export const deleteProduct = (id: number) => apiInstance.delete(`/${id}`);

export const updateProduct = (product: IProduct) =>
  apiInstance.put(`/${product.id}`, product);
