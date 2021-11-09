import {useDefaults} from "./Hooks";
import React from "react";
import {Defaults} from "./FormDefaults";

export interface WithDefaultsProps {
    defaults: Defaults;
}

export function withDefaults(Component: any) {
    return function Wrapper(props: any) {
        const defaults = useDefaults();
        return <Component {...props} defaults={defaults}/>
    }
}