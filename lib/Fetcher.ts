export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  const data = await response.json();
  return data;
};
