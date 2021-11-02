import React, {useContext} from "react";
import {Defaults, easyFormDefaults} from "./EasyFormDefaults";

const DefaultContext = React.createContext<Defaults>(easyFormDefaults);
const DefaultProvider = DefaultContext.Provider;


export function useDefaults(): Defaults {
    return useContext(DefaultContext);
}


export function WithDefaults(Component: any) {
    return function Component(props: any) {
        const defaults = useDefaults();
        return <Component {...props} defaults={defaults}/>
    }
}