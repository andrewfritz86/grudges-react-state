import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

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

const Application = () => {
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

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
