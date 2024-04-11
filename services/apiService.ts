// services/apiService.ts

// const API_BASE_URL = "http://167.172.52.195";
const API_BASE_URL = "http://127.0.0.1:8000";

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
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const productVariants: Variant[] = await response.json();
    return productVariants.map(apiService.transformProduct);
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
    return await apiService.getProductsByCategory("cell-phones-accessories");
  },

  getComputers: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("computers");
  },

  getAccessories: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("accessories");
  },

  getAppliances: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory("home-appliances");
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

    return productVariants.map((variant) =>
      apiService.transformProduct(variant)
    );
  },

  transformProduct: (productData: any): TransformedProduct => {
    // Extract just the values and take only the first three
    const featureValues = productData.features
      .map((feature: any) => feature.value)
      .slice(0, 3); // Take only the first three feature values

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

  // Inside services/apiService.ts

  // Update the getProductById function to use the correct endpoint and fetch details for a single product by its ID
  getProductById: async (productId: string): Promise<TransformedProduct> => {
    const response = await fetch(
      `${API_BASE_URL}/products/product-detail/${productId}/`,
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
      throw new Error(`Failed to fetch product details for ID: ${productId}.`);
    }

    const productData = await response.json();
    return apiService.transformProduct(productData); // Use the transformProduct function to format the response
  },

  // Method for guest checkout, creating profile, order, and initiating Paystack payment
  guestCheckout: async (payload: any) => {
    const response = await fetch(`${API_BASE_URL}/orders/guest-checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle any errors that come back from the API
      const errorData = await response.json();
      let errorMessage = "An unexpected error occurred.";

      // Simplified error handling: Take the first error message available
      // errorMessage = errorData[Object.keys(errorData)[0]].join(" ");

      throw new Error(errorMessage);
    }

    // The response should contain the order details and the Paystack payment URL
    return response.json();
  },

  subscribeToNewsletter: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/accounts/subscribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "An unexpected error occurred.";

      // Handle non-field errors first
      if (errorData.non_field_errors) {
        errorMessage = errorData.non_field_errors.join(" ");
      } else {
        // Handle specific field errors if present
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

  // Add other endpoints as needed
};
