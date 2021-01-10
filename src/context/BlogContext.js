import React, { useReducer } from "react";

const BlogContext = React.createContext();

const BlogProvider = ({ children }) => {
    return (
        <BlogContext.Provider>
            {children} 
        </BlogContext.Provider>
    );
};

export default BlogProvider;