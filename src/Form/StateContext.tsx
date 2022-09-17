import React from 'react';
import {initialState} from '../Data/RootReducer';
import {State} from '../Data/State';

export const StateContext = React.createContext<State>(initialState);

