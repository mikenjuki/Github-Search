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
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get users
  const searchUsers = async (text) => {
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
      // console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Gets a single user
  const getUser = useCallback(async (login) => {
    setLoading();

    try {
      const response = await axios.get(`${gitUrl}/users/${login}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 404) {
        window.location = "/notfound";
      } else {
        dispatch({
          type: "GET_USER",
          payload: response.data,
        });
      }
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created", // Sort by creation date
      per_page: 10, // Get only 10 repositories
    });

    try {
      const response = await axios.get(
        `${gitUrl}/users/${login}/repos?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const sortedRepos = response.data.sort(
      //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
      // );

      dispatch({
        type: "GET_REPOS",
        payload: response.data,
      });

      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user repositories:", error);
    }
  };

  const clearSearch = () => {
    dispatch({ type: "GET_USERS", payload: [] });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  return (
    <GithubContext.Provider
      value={{
        // Replace these with spread
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,

        ...state,
        searchUsers,
        clearSearch,
        getUser,
        getUserRepos,
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
