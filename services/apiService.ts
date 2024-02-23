// services/apiService.ts

const API_BASE_URL = "http://167.172.52.195";

interface Variant {
  id: string;
  product: {
    name: string;
    brand: { name: string };
    category: { name: string };
  };
  prices: Array<{ price_type: string; amount: string }>;
  images: Array<{ image: string }>;
  condition: { condition_type: string };
  // Add other fields as needed
}

interface Price {
  price_type: string;
  amount: string;
}

export interface TransformedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  condition: string;
  features: string;
  // Add other fields as needed
}

export const apiService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "An unexpected error occurred.";

      if (errorData.non_field_errors) {
        errorMessage = Array.isArray(errorData.non_field_errors)
          ? errorData.non_field_errors.join(" ")
          : errorData.non_field_errors; // Handle string error messages
      } else {
        // If there are field-specific errors, use the first one available
        const errorFields = Object.keys(errorData);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          const firstError = errorData[firstErrorField];
          errorMessage = Array.isArray(firstError)
            ? firstError.join(" ")
            : firstError; // Handle string error messages
        }
      }

      throw new Error(errorMessage);
    }
    return response.json();
  },

  register: async (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "An unexpected error occurred.";

      // Check for non-field errors first
      if (errorData.non_field_errors) {
        errorMessage = errorData.non_field_errors.join(" ");
      } else {
        // If there are field-specific errors, use the first one available
        const errorFields = Object.keys(errorData);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          errorMessage = errorData[firstErrorField].join(" ");
        }
      }

      throw new Error(errorMessage);
    }
    return response.json();
  },

  resendVerificationEmail: async (email: string) => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/resend-verification/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "An unexpected error occurred.";

      if (errorData.non_field_errors) {
        errorMessage = errorData.non_field_errors.join(" ");
      } else {
        const errorFields = Object.keys(errorData);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          errorMessage = errorData[firstErrorField].join(" ");
        }
      }

      throw new Error(errorMessage);
    }
    return response.json();
  },

  // Add the type for the email parameter

  resetPasswordRequest: async (email: string) => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/reset-password-request/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      // If the response is not okay, throw an error with the message from the response
      const errorData = await response.json();
      throw new Error(errorData.detail || "An unexpected error occurred.");
    }

    // If the response is okay, return the successful response message
    return await response.json();
  },

  // Add an item to the cart on the backend
  addToCart: async (itemId: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/add-item/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include your authentication token header if the user is logged in
        // 'Authorization': `Token ${userToken}`,
      },
      body: JSON.stringify({ item: itemId, quantity }),
    });

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to add item to cart.");
    }
    return response.json();
  },

  // Fetch the cart from the backend
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include your authentication token header here as well
        // 'Authorization': `Token ${userToken}`,
      },
    });

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to fetch cart.");
    }
    return response.json();
  },

  // Synchronize the local cart with the backend after the user logs in
  synchronizeCart: async (
    cartItems: Array<{ itemId: string; quantity: number }>
  ) => {
    const response = await fetch(`${API_BASE_URL}/cart/synchronize/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Token ${userToken}`, // Ensure you pass the logged-in user's token
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to synchronize cart.");
    }
    return response.json();
  },

  getProducts: async (): Promise<TransformedProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products/all_products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include your authentication token header here if required
        // 'Authorization': `Token ${userToken}`,
      },
    });

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to fetch products.");
    }

    const productVariants: Variant[] = await response.json();

    const transformedProducts: TransformedProduct[] = productVariants.map(
      (variant) => {
        const basePrice =
          variant.prices.find((price: Price) => price.price_type === "BASE")
            ?.amount || "0.00";
        const firstImage =
          variant.images.length > 0
            ? variant.images[0].image
            : "/default-image.png";

        return {
          id: variant.id,
          name: variant.product.name,
          brand: variant.product.brand.name,
          category: variant.product.category.name,
          price: parseFloat(basePrice),
          image: firstImage,
          condition: variant.condition.condition_type,
          // ... add other fields as needed
        };
      }
    );

    return transformedProducts;
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
      },
    });

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to fetch categories.");
    }

    return response.json();
  },

  searchProducts: async (query: string) => {
    const response = await fetch(
      `${API_BASE_URL}/products/search/?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
        },
      }
    );

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to fetch search results.");
    }

    return response.json();
  },

  getMobilePhones: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("mobile-phones");
  },

  getComputers: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("computers");
  },

  getAccessories: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("accessories");
  },

  getAppliances: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("appliances");
  },

  // Helper function to fetch products by category
  getProductsByCategory: async (
    categorySlug: string
  ): Promise<TransformedProduct[]> => {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
        },
      }
    );

    if (!response.ok) {
      // Handle error response
      throw new Error(
        `Failed to fetch products for category: ${categorySlug}.`
      );
    }

    const productVariants: Variant[] = await response.json();

    return productVariants.map((variant) =>
      apiService.transformProduct(variant)
    );
  },

  getElectronics: async (): Promise<TransformedProduct[]> => {
    const response = await fetch(
      `${API_BASE_URL}/products/category/electronics/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Token ${userToken}`, // Include this if your endpoint requires authentication
        },
      }
    );

    if (!response.ok) {
      // Handle error response
      throw new Error("Failed to fetch electronic products.");
    }

    const productVariants: Variant[] = await response.json();
    console.log("Raw electronics data:", productVariants); // This will print the raw data to the console

    return productVariants.map((variant) =>
      apiService.transformProduct(variant)
    );
  },

  transformProduct: (productData: any): TransformedProduct => {
    // Extract just the values and take only the first three
    const featureValues = productData.features
      .map((feature: any) => feature.value)
      .slice(0, 3); // Take only the first three feature values

    // Log transformed product for debugging
    console.log("Transformed product:", {
      id: productData.id,
      name: productData.product, // Updated to use product_name
      brand: productData.brand_name, // Assuming brand name is directly under productData
      category: productData.category_name, // Assuming category name is directly under productData
      price: productData.actual_price, // Updated to use actual_price
      image: productData.main_image, // Updated to use the direct image
      condition: productData.condition,
      features: featureValues.join(" | "), // Join the first three feature values with ' | '
    });

    return {
      id: productData.id,
      name: productData.product, // Updated to use product_name
      brand: productData.brand_name, // Assuming this structure based on the previous pattern
      category: productData.category_name, // Assuming this structure based on the previous pattern
      price: productData.actual_price,
      image: productData.main_image, // Updated to use the direct image
      condition: productData.condition,
      features: featureValues.join(" | "), // Join the first three feature values with ' | '
    };
  },

  // Add other endpoints as needed
};
