export async function fetchData(
  url,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
      // mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
}
