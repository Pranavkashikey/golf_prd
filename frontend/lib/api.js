const BASE_URL = "http://localhost:5000/api";

export const api = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
};