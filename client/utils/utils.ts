export const fetchAPI = async (path: string, method: string, body?: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from the server");
  }

  return response.json();
};
