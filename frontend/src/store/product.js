import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  // Set products in the state
  setProducts: (products) => set({ products }),

  // Create a new product
  createProduct: async (newProduct) => {
    // Validate the product fields
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        return { success: false, message: "Failed to create product" };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error(error); // This will log the error to the console
      return { success: false, message: "Network error occurred" };
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        return { success: false, message: "Failed to fetch products" };
      }

      const data = await res.json();
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      console.error(error); // This will log the error to the console
      return { success: false, message: "Network error occurred" };
    }
  },

  // Delete a product
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return { success: false, message: "Failed to delete product" };
      }

      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error(error); // This will log the error to the console
      return { success: false, message: "Network error occurred" };
    }
  },

  // Update a product
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        return { success: false, message: "Failed to update product" };
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error(error); // This will log the error to the console
      return { success: false, message: "Network error occurred" };
    }
  },
}));
