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
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return response.json();
  },

  // Add other endpoints as needed
};
