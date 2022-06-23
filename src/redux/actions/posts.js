import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST_DETAIL } from './actionType'
import * as api from "../../api/";

export const getPostDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPostDetail(id);
    dispatch({ type: FETCH_POST_DETAIL, payload: data });
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING })

  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPosts(post);
    history.push(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
      console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(id, post);
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
      console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePosts(id);
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
      console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(id);
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
      console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_BY_SEARCH, payload: {data} })
    dispatch({ type: END_LOADING })
  } catch (error) {
      console.log(error.message);
  }
};
