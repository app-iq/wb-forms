import React, {useContext} from "react";

export interface Services {

}

export const ServiceContext = React.createContext<Services>(undefined as any);


export function useService<T>(service: keyof Services) {
    const services = useContext(ServiceContext);
    return services[service] as T;
}

export function withService<T>(Component: any, serviceName: keyof Services, injectPropName?: string) {
    return function (props: any) {
        const service = useService<T>(serviceName);
        const toInjectPropName = injectPropName ?? serviceName;
        const injectedProps = {...props, [toInjectPropName]: service};
        return <Component {...injectedProps}/>
    }
}