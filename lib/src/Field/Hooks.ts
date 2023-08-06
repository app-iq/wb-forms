import {useState} from 'wb-core-provider';
import {FieldState, State} from '../Data/State';

export function useField(name: string): FieldState {
    const state = useState<State>();
    return state.fields[name];
}
