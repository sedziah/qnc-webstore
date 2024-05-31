// services/apiService.ts

// const API_BASE_URL = "http://167.172.52.195";
// const API_BASE_URL = "http://127.0.0.1:8000";

const API_BASE_URL = 'https://api.qualityncare.com';

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
}

interface ErrorResponse {
  message: string;
}

export const apiService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Add `null` to the type to handle the potential of receiving null from json()
      const errorData: ErrorResponse | null | undefined = await response.json();

      // Check if errorData exists and has a message property
      if (errorData != null && typeof errorData.message === 'string') {
        throw new Error(errorData.message);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }

    return await response.json();
  },

  register: async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<any> => {
    // Specify actual return type instead of any
    const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      }),
    });

    if (!response.ok) {
      // Add `null` to the type to handle the potential of receiving null from json()
      const errorData: ErrorResponse | null | undefined = await response.json();

      // Check if errorData exists and has a message property
      if (errorData != null && typeof errorData.message === 'string') {
        throw new Error(errorData.message);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }

    return await response.json();
  },

  resendVerificationEmail: async (email: string) => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/resend-verification/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!response.ok) {
      const errorData: Record<string, string[]> = await response.json();
      let errorMessage = 'An unexpected error occurred.';

      if ('non_field_errors' in errorData) {
        errorMessage = errorData.non_field_errors.join(' ');
      } else {
        const errorFields = Object.keys(errorData);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          errorMessage = errorData[firstErrorField].join(' ');
        }
      }

      throw new Error(errorMessage);
    }
    return await response.json();
  },

  // Add the type for the email parameter

  resetPasswordRequest: async (email: string) => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/reset-password-request/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!response.ok) {
      // If the response is not okay, throw an error with the message from the response
      const errorData = await response.json();
      throw new Error(
        (errorData.detail as string) !== ''
          ? (errorData.detail as string)
          : 'An unexpected error occurred.',
      );
    }

    // If the response is okay, return the successful response message
    return await response.json();
  },

  // Add an item to the cart on the backend
  addToCart: async (itemId: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/add-item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include your authentication token header if the user is logged in
        // 'Authorization': `Token ${userToken}`,
      },
      body: JSON.stringify({ item: itemId, quantity }),
    });

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to add item to cart.');
    }
    return await response.json();
  },

  // Fetch the cart from the backend
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include your authentication token header here as well
        // 'Authorization': `Token ${userToken}`,
      },
    });

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to fetch cart.');
    }
    return await response.json();
  },

  // Synchronize the local cart with the backend after the user logs in
  synchronizeCart: async (
    cartItems: Array<{ itemId: string; quantity: number }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/cart/synchronize/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Token ${userToken}`, // Ensure you pass the logged-in user's token
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to synchronize cart.');
    }
    return await response.json();
  },

  getProducts: async (): Promise<TransformedProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products/all_products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }

    const productVariants: Variant[] = await response.json();
    return productVariants.map(apiService.transformProduct);
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
      },
    });

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to fetch categories.');
    }

    return await response.json();
  },

  searchProducts: async (query: string) => {
    const response = await fetch(
      `${API_BASE_URL}/products/search/?q=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
        },
      },
    );

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to fetch search results.');
    }

    return await response.json();
  },

  getMobilePhones: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory('cell-phones-accessories');
  },

  getComputers: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory('computers');
  },

  getAccessories: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory('accessories');
  },

  getAppliances: async (): Promise<TransformedProduct[]> => {
    return await apiService.getProductsByCategory('home-appliances');
  },

  // Helper function to fetch products by category
  getProductsByCategory: async (
    categorySlug: string,
  ): Promise<TransformedProduct[]> => {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${userToken}`, // Add this if your endpoint requires authentication
        },
      },
    );

    if (!response.ok) {
      // Handle error response
      throw new Error(
        `Failed to fetch products for category: ${categorySlug}.`,
      );
    }

    const productVariants: Variant[] = await response.json();

    return productVariants.map((variant) =>
      apiService.transformProduct(variant),
    );
  },

  getElectronics: async (): Promise<TransformedProduct[]> => {
    const response = await fetch(
      `${API_BASE_URL}/products/category/electronics/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${userToken}`, // Include this if your endpoint requires authentication
        },
      },
    );

    if (!response.ok) {
      // Handle error response
      throw new Error('Failed to fetch electronic products.');
    }

    const productVariants: Variant[] = await response.json();

    return productVariants.map((variant) =>
      apiService.transformProduct(variant),
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
      features: featureValues.join(' | '), // Join the first three feature values with ' | '
    };
  },

  // Inside services/apiService.ts

  // Update the getProductById function to use the correct endpoint and fetch details for a single product by its ID
  getProductById: async (productId: string): Promise<TransformedProduct> => {
    const response = await fetch(
      `${API_BASE_URL}/products/product-detail/${productId}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${userToken}`, // Include this if your endpoint requires authentication
        },
      },
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle any errors that come back from the API
      // const errorData = await response.json();
      const errorMessage = 'An unexpected error occurred.';

      // Simplified error handling: Take the first error message available
      // errorMessage = errorData[Object.keys(errorData)[0]].join(" ");

      throw new Error(errorMessage);
    }

    // The response should contain the order details and the Paystack payment URL
    return await response.json();
  },

  subscribeToNewsletter: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/accounts/subscribe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData: Record<string, string[]> = await response.json();
      let errorMessage = 'An unexpected error occurred.';

      // Handle non-field errors first
      if (
        errorData.non_field_errors !== undefined &&
        errorData.non_field_errors !== null
      ) {
        errorMessage = errorData.non_field_errors.join(' ');
      } else {
        // Handle specific field errors if present
        const errorFields = Object.keys(errorData);
        if (errorFields.length > 0) {
          const firstErrorField = errorFields[0];
          errorMessage = errorData[firstErrorField].join(' ');
        }
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  },

  // Add this method inside the apiService object

  verifyPayment: async (reference: string): Promise<any> => {
    const response = await fetch(
      `${API_BASE_URL}/payments/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${userToken}`, // Include this if your endpoint requires authentication
        },
      },
    );

    if (!response.ok) {
      await response.json();
      throw new Error(
        `errorData.message !== '' ? String(errorData.message) : 'Failed to verify payment.'`,
      );
    }

    return await response.json();
  },

  // Add other endpoints as needed
};