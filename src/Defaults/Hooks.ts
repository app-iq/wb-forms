import {Defaults} from "./FormDefaults";
import {useContext} from "react";
import {DefaultsContext} from "./DefaultsContext";

export function useDefaults(): Defaults {
    return useContext(DefaultsContext);
}