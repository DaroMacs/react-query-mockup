import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, createProduct } from "../../api/productsAPI";

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product Added");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const productEntries = Object.fromEntries(formData);

    // Create a new object with the correct type
    const product: IProduct = {
      id: productEntries.id as any,
      name: productEntries.name as string,
      price: parseFloat(productEntries.price as string),
      description: productEntries.description as string,
      inStock: productEntries.inStock === "true",
      // Add any other properties that your IProduct interface has
    };

    console.log(product);
    // Trigger the mutation by calling mutate function with the product data
    addProductMutation.mutate({ ...product, inStock: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="descrption">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <button>Add Product</button>
    </form>
  );
};

export default ProductForm;
