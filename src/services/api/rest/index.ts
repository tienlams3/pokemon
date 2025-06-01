const BASE_URL = process.env.POKEMON_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing environment variable: POKEMON_BASE_URL");
}

const pokemonRestApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      next: { revalidate: 3600 },
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
