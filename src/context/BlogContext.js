import createDataContext from "./createDataContext";
import blog from "../api/blog";

const blogReducer = (state, action) => {
  // state === { data: object }
  // action === { type: 'add_blogpost' || 'edit_blogpost' || 'delete_blogpost' }

  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogpost":
      // this returns a new array containing all blogPosts whose id !== action.payload, which is id
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

// addBlogPost(dispatch) => {return () => dispatch(...)}
// function returns a function that calls dispatch functions
const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    //dispatch({ type: "add_blogpost", payload: { title, content } });
    await blog.post("/create", { title, content });
    if (callback) {
        callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) {
        callback();
    }
  };
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await blog.get("/posts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [{ id: 1, title: "TEST POST", content: "TEST CONTENT" }]
);