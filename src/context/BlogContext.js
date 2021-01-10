import React, { useReducer } from "react";
import axios from "axios";

const initialState = {
  id: 1,
  title: "TEST TITLE",
  content: "TEST POST",
};

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
    default:
      return state;
  }
};

const BlogContext = React.createContext();

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // addBlogPost(dispatch) => {return () => dispatch(...)}
  // function returns a function that calls dispatch functions
  const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
      dispatch({ type: "add_blogpost", payload: { title, content } });
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

  return (
    <BlogContext.Provider value={{ state, addBlogPost, deleteBlogPost, editBlogPost }}>
        {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
