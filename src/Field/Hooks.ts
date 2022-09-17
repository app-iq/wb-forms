import {useContext} from 'react';
import {StateContext} from '../Form/StateContext';
import {FieldState} from '../Data/State';

export function useField(name: string): FieldState {
    const state = useContext(StateContext);
    return state.fields[name];
}
