import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api/productsAPI";

const Products = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    status,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data.sort((a: IProduct, b: IProduct) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product Deleted");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product Updated");
      queryClient.invalidateQueries(["products"]);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {status}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => deleteProductMutation.mutate(product.id)}>
            Delete
          </button>

          <input
            type="checkbox"
            id={product.id.toString()}
            checked={product.inStock}
            onChange={(e) => {
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              });
            }}
          />
          <label htmlFor={product.id.toString()}>In Stock</label>
        </div>
      ))}
    </div>
  );
};

export default Products;
