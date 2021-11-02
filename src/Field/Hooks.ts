import {useContext} from "react";
import {FieldsContext} from "../Context/FieldsContext";

export function useField(name: string) {
    const fields = useContext(FieldsContext);
    return fields[name];
}