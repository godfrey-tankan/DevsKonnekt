"use server";

export const getPostsByUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/posts/author/${userId}/`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/posts/${postId}/`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/posts/`);
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/posts/`,
      post
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const updatePost = async (postId, post) => {
  try {
    const response = await axios.put(
      `${process.env.BACKEND_URL}/posts/${postId}/`,
      post
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/posts/${postId}/`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const bookmarkPost = async (postId) => {
  try {
    const response = await axios.patch(
      `${process.env.BACKEND_URL}/posts/${postId}/bookmark`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const unbookmarkPost = async (postId) => {
  try {
    const response = await axios.patch(
      `${process.env.BACKEND_URL}/posts/${postId}/unbookmark`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};

export const getBookmarkedPosts = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/posts/${userId}/bookmarks`
    );
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};