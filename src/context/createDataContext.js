import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
    // Creates a Context object which contains multiple child components, notably Provider and Consumer
    const Context = React.createContext();

    // Provider component accepts a value prop to be passed down to
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (dispatch) => { return () => {} } }
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch); // addBlogPost.dispatch
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider };
}