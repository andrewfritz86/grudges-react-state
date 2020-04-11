import React, { useReducer, createContext, useCallback } from 'react';
import id from 'uuid/v4';

import initialState from './initialState';

// Create context returns and object with Provider and Consumer properties
export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const TOGGLE_FORGIVENESS = 'TOGGLE_FORGIVENESS';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  if (action.type === TOGGLE_FORGIVENESS) {
    return state.map((grudge) => {
      if (grudge.id === action.payload) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
    });
  }
  return state;
};

// Create the provider. It's a function that will wrap any children with the values exported below
export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: { id: id(), forgiven: false, person, reason }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: TOGGLE_FORGIVENESS,
        payload: id
      });
    },
    [dispatch]
  );

  // create the value to be accessible to the anything wrapped in the Provider

  const value = {
    grudges,
    addGrudge,
    toggleForgiveness
  };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
