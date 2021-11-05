import React, {useContext} from "react";
import {Defaults, formDefaults} from "./FormDefaults";

const DefaultsContext = React.createContext<Defaults>(formDefaults);
const DefaultsProvider = DefaultsContext.Provider;

export function useDefaults(): Defaults {
    return useContext(DefaultsContext);
}


export function withDefaults(Component: any) {
    return function Wrapper(props: any) {
        const defaults = useDefaults();
        return <Component {...props} defaults={defaults}/>
    }
}