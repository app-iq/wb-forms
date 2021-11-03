import React, {useContext} from "react";
import {defaultServices} from "./DefaultServices";
import {ServiceCallback, Services} from "./Services";

export const ServiceContext = React.createContext<Services>(defaultServices);
export const ServiceProvider = ServiceContext.Provider;

export function useService<T>(service: keyof Services): ServiceCallback<T> {
    const services = useContext(ServiceContext);
    return services[service] as ServiceCallback<any>;
}

export function withService<T>(Component: any, serviceName: keyof Services, injectPropName?: string) {
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