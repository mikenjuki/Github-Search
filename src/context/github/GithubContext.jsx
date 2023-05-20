import { createContext, useReducer, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const gitUrl = import.meta.env.VITE_GIT_URL;
const token = import.meta.env.VITE_APP_TOKEN;

const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = useCallback(async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    try {
      const response = await axios.get(`${gitUrl}/search/users?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "GET_USERS",
        payload: response.data.items,
      });
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const clearSearch = () => {
    dispatch({ type: "GET_USERS", payload: [] });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearSearch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GithubContext, GithubProvider };
