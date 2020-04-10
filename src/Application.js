import React, { useReducer } from 'react';

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
    const grudges = state.map((grudge) => {
      if (grudge.id === action.payload) {
        grudge.forgiven = !grudge.forgiven;
      }
      return grudge;
    });
    return [...grudges];
  }
  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = ({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: { id: id(), forgiven: false, person, reason }
    });
  };

  const toggleForgiveness = (id) => {
    dispatch({
      type: TOGGLE_FORGIVENESS,
      payload: id
    });
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
