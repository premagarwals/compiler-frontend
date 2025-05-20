const API_BASE_URL = 'http://127.0.0.1:8080'

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login/`,
  signup: `${API_BASE_URL}/signup/`,
  ide: `${API_BASE_URL}/ide/`,
  addProblem: `${API_BASE_URL}/addproblem/`,
  getProblems: `${API_BASE_URL}/getproblems/`,
  getProblem: (id) => `${API_BASE_URL}/problem/${id}/`
}

export const getAuthToken = () => localStorage.getItem('jwt')
export const setAuthToken = (token) => localStorage.setItem('jwt', token)
export const removeAuthToken = () => localStorage.removeItem('jwt')