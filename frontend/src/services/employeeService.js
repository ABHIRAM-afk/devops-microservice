// All communication with the Spring Boot backend goes through this file.
// Components never call fetch() directly — they call these functions instead.
//
// In development, Vite proxies "/api/*" to http://localhost:8080/* (see vite.config.js),
// so we never hardcode the backend host here. In production this is served behind
// the same origin/reverse proxy as the API.

const BASE_URL = '/api/employees';

async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  // DELETE returns 204 No Content — there's no body to parse
  if (response.status === 204) return null;
  return response.json();
}

export function getEmployees() {
  return fetch(BASE_URL).then(handleResponse);
}

export function getEmployee(id) {
  return fetch(`${BASE_URL}/${id}`).then(handleResponse);
}

export function createEmployee(employee) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  }).then(handleResponse);
}

export function updateEmployee(id, employee) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  }).then(handleResponse);
}

export function deleteEmployee(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}
