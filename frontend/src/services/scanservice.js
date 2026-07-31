import API_BASE_URL from "./api";

export async function scanURL(url) {
  const response = await fetch(`${API_BASE_URL}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to scan URL");
  }

  return response.json();
}