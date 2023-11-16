// services/apiService.ts

const API_BASE_URL = "http://127.0.0.1:8000"; // Adjust this as needed

export const apiService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   let errorMessage = "An unexpected error occurred.";
    //   // Check if non_field_errors is an array and has at least one element
    //   // const errorMessage =
    //   //   Array.isArray(errorData.non_field_errors) &&
    //   //   errorData.non_field_errors.length > 0
    //   //     ? errorData.non_field_errors[0]
    //   //     : "An unexpected error occurred.";
    //   // throw new Error(errorMessage);
    //    if (errorData.non_field_errors) {
    //      errorMessage = errorData.non_field_errors.join(" ");
    //    } else {
    //      // If there are field-specific errors, use the first one available
    //      const errorFields = Object.keys(errorData);
    //      if (errorFields.length > 0) {
    //        const firstErrorField = errorFields[0];
    //        errorMessage = errorData[firstErrorField].join(" ");
    //      }
    //    }

    //    throw new Error(errorMessage);
    // }
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
      // Adjust endpoint as needed
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

  // Add other endpoints as needed
};
