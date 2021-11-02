import React, {useContext} from "react";
import {Defaults, easyFormDefaults} from "./EasyFormDefaults";

const DefaultsContext = React.createContext<Defaults>(easyFormDefaults);
const DefaultsProvider = DefaultsContext.Provider;


export function useDefaults(): Defaults {
    return useContext(DefaultsContext);
}


export function WithDefaults(Component: any) {
    return function Component(props: any) {
        const defaults = useDefaults();
        return <Component {...props} defaults={defaults}/>
    }
}