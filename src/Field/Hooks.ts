import {FieldState, State} from '../Data/State';
import {useState} from 'wb-core-provider';

export function useField(name: string): FieldState {
    const state = useState<State>();
    return state.fields[name];
}
