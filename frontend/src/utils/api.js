import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
let token = JSON.parse(localStorage.getItem("user")).token


export const loginUser = async (userData) => {
    return axios.post(`${baseUrl}/users/login`, userData)
}

export const registerUser = async (userData) => {
    return axios.post(`${baseUrl}/users/register`, userData)
}

export const addToWatchList = async (coinId) => {
    return axios.post(`${baseUrl}/watchlist`, { coinId }, { headers: { Authorization: token } })
}

export const getWatchList = async () => {
    return axios.get(`${baseUrl}/watchlist`, { headers: { Authorization: token } })
}

export const deleteFromWatchList = async (id) => {
    return axios.delete(`${baseUrl}/watchlist/${id}`, { headers: { Authorization: token } })
}