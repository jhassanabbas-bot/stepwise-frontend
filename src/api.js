// src/api.js — StepWise API calls

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function getToken() {
  return localStorage.getItem('sw_token') || ''
}

function authHeaders() {
  return {
    'Authorization': `Bearer ${getToken()}`,
  }
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.detail || `Error ${res.status}`)
  }
  return data
}

export const api = {
  async register(email, password, name) {
    const res = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    return handleResponse(res)
  },

  async login(email, password) {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(res)
  },

  async me() {
    const res = await fetch(`${BASE}/auth/me`, {
      headers: authHeaders(),
    })
    return handleResponse(res)
  },

  async analyseHomework(file, onProgress) {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${BASE}/homework/analyse`, {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    })
    return handleResponse(res)
  },

  async listHomeworks() {
    const res = await fetch(`${BASE}/homeworks`, {
      headers: authHeaders(),
    })
    return handleResponse(res)
  },
}
