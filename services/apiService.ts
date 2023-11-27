// services/apiService.ts

const API_BASE_URL = "http://127.0.0.1:8000"; // Adjust this as needed
// const API_BASE_URL = "http://167.172.52.195:8000"; // Adjust this as needed

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

  // Add other endpoints as needed
};
