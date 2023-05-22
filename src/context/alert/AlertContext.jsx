import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import alertReducer from "./AlertReducer";

const AlertContext = createContext();
const AlertProvider = ({ children }) => {
  const initialState = "";

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });

    setTimeout(() => {
      dispatch({
        type: "REMOVE_ALERT",
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AlertProvider, AlertContext };
