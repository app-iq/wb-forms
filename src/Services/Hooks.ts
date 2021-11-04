import {useContext} from "react";
import {ServiceContext} from "./ServiceContext";

export function useServiceFactory() {
    const serviceFactory = useContext(ServiceContext);
    if(!serviceFactory){
        throw new Error("cannot resolve service factory");
    }
    return serviceFactory;
}


