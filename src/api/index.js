import axios from 'axios'
const API = axios.create({ baseURL: 'http://localhost:3001' })
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPostDetail = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const createPosts = (newPost) => API.post('/posts', newPost)
export const updatePosts = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePosts = (id) => API.delete(`/posts/${id}`)
export const likePosts = (id) => API.patch(`/posts/${id}/likepost`)
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);