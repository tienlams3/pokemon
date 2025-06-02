const BASE_URL = process.env.NEXT_PUBLIC_POKEMON_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_POKEMON_BASE_URL");
}

const pokemonRestApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export default pokemonRestApi;
