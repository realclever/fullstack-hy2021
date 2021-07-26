import blogService from "../services/blogs";

export const createBlog = (blog) => {
  return async (dispatch) => {
    const create = await blogService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: create,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const like = { ...blog, likes: (blog.likes += 1) };
    await blogService.like(blog.id, like);
    dispatch({
      type: "LIKE_BLOG",
      data: like,
    });
  };
};

export const removeBLog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog,
    });
  };
};

const blogReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG":
      const likedBlog = action.data;
      const likes = state.map((n) => (n.id === likedBlog.id ? likedBlog : n));
      return [...likes];
    case "REMOVE_BLOG":
      const removedBlog = action.data;
      const remove = state.filter((n) => n.id !== removedBlog.id);
      return [...remove];
    default:
      return state;
  }
};

export default blogReducer;
