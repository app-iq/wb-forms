import {State} from '../Data/State';
import {useContext} from 'react';
import {StateContext} from './StateContext';
import {DispatchContext} from './DispatchContext';

export function useState(): State {
    return useContext(StateContext);
}

export function useDispatch() {
    return useContext(DispatchContext);
}
