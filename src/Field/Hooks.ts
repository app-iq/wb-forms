import {useContext} from "react";
import {FieldsContext} from "./FieldsContext";
import {FieldState} from "../Data/Types/FieldState";

export function useField(name: string) : FieldState {
    const fields = useContext(FieldsContext);
    return fields[name];
}