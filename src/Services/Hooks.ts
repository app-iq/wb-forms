import {FieldServices, ServiceCallback, Services} from "./Services";
import {useContext} from "react";
import {FieldState} from "../Data/Types/FieldState";
import {ServiceContext} from "./ServiceContext";

export function useService<TService , TOptions = any>(service: keyof Services): ServiceCallback<TService> {
    const services = useContext(ServiceContext);
    return services[service] as any as ServiceCallback<TService , TOptions>;
}

export function useFieldService<TService , TOptions = any>(service: keyof FieldServices, field?: FieldState): ServiceCallback<TService , TOptions> {
    const outerService = useService(service);
    if (field?.services[service]) {
        return field.services[service] as any as ServiceCallback<TService , TOptions>;
    }

    return outerService as any as ServiceCallback<TService , TOptions>;
}
