import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL


export const loginUser = async (userData) => {
    return axios.post(`${baseUrl}/users/login`, userData)
}

export const registerUser = async (userData) => {
    return axios.post(`${baseUrl}/users/register`, userData)
}

export const addToWatchList = async (coinId) => {
    let token = JSON.parse(localStorage.getItem("user"))?.token
    return axios.post(`${baseUrl}/watchlist`, { coinId }, { headers: { Authorization: token } })
}

export const getWatchList = async () => {
    let token = JSON.parse(localStorage.getItem("user"))?.token
    return axios.get(`${baseUrl}/watchlist`, { headers: { Authorization: token } })
}

export const deleteFromWatchList = async (id) => {
    let token = JSON.parse(localStorage.getItem("user"))?.token
    return axios.delete(`${baseUrl}/watchlist/${id}`, { headers: { Authorization: token } })
}