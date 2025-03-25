import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

const BASE_URL = process.env.POKEMON_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing environment variable: POKEMON_BASE_URL");
}

const pokemonRestApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request Interceptor (Currently Unused, But Prepares for Future Use)
pokemonRestApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error) // Handles request errors if needed
);

// Response Interceptor: Extracts Data & Handles Errors
pokemonRestApi.interceptors.response.use(
  (response: AxiosResponse) => response.data, // Simplifies response structure
  (error: AxiosError) => {
    if (!error.response) {
      // Handle Network Errors (Timeout, No Internet, etc.)
      return Promise.reject({
        status: "NETWORK_ERROR",
        message: "Network error. Please check your connection and try again.",
      });
    }

    // API Response Errors
    const { response } = error;
    const data = response.data as Record<string, string | undefined>;
    return Promise.reject({
      status: response.status,
      message: data?.message || "An unexpected error occurred.",
      url: response.config.url, // Useful for debugging failed requests
    });
  }
);

export default pokemonRestApi;
