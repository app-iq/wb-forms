import React from "react";
import {defaultServices} from "./DefaultServices";
import {Services} from "./Services";
import {useService} from "./Hooks";

export const ServiceContext = React.createContext<Services>(defaultServices);
export const ServiceProvider = ServiceContext.Provider;


export function withService<T>(Component: any, serviceName: keyof Services, injectPropName?: string) {
    //TODO : NEED => FIXES , CLEANUP , TESTS
    return function (props: any) {
        const service = useService<T>(serviceName);
        const toInjectPropName = injectPropName ?? serviceName;
        if (props[toInjectPropName]) {
            console.warn(`${toInjectPropName} prop is already passed to the component , try to use different prop name for the injected service`);
        }
        const injectedProps = {...props, [toInjectPropName]: service};
        return <Component {...injectedProps}/>
    }
}