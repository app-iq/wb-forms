import React, {useContext} from "react";
import {FieldsRenderService} from "../Services/Protocol/FieldsRenderService";

export interface Services {
    fieldsRenderService : FieldsRenderService;
}

export const ServiceContext = React.createContext<Services>(undefined as any);


export function useService<T>(service: keyof Services) : T{
    const services = useContext(ServiceContext);
    return services[service] as any as T;
}

export function withService<T>(Component: any, serviceName: keyof Services, injectPropName?: string) {
    return function (props: any) {
        const service = useService<T>(serviceName);
        const toInjectPropName = injectPropName ?? serviceName;
        const injectedProps = {...props, [toInjectPropName]: service};
        return <Component {...injectedProps}/>
    }
}