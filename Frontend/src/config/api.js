const fallbackApiBaseUrl = "http://localhost:8000"

const rawApiBaseUrl = (
  import.meta.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  fallbackApiBaseUrl
).trim()
const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, "")

export const API_ENDPOINTS = {
  analyze: `${apiBaseUrl}/api/analyze`,
}
