import React from 'react';
import {Action} from '../Data/Action';

export type DispatchFunction = (action: Action<unknown, unknown>) => void;

const defaultDispatch: DispatchFunction = () => {
    throw new Error('cannot find Form component');
};

export const DispatchContext = React.createContext<DispatchFunction>(defaultDispatch);


