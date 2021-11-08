import {useServiceFactory} from "../Services/ServiceFactory/Hooks";
import {DispatchFunction} from "./DispatchContext";
import {ServiceFactory} from "../Services/ServiceFactory/ServiceFactory";
import {RootState} from "../Data/Types/RootState";
import {useDispatch, useRootState} from "./Hooks";
import React from "react";

export interface WithActionDataProps {
    serviceFactory: ServiceFactory;
    dispatch: DispatchFunction;
    rootState: RootState;
}

export function withActionData(Component: any) {
    return function Wrapper(props: any) {
        const serviceFactory = useServiceFactory();
        const dispatch = useDispatch();
        const rootState = useRootState();
        const toInjectProps: WithActionDataProps = {
            rootState: rootState,
            dispatch: dispatch,
            serviceFactory: serviceFactory
        }
        return <Component {...props} actionData={toInjectProps}/>
    }
}

export function withRootState(Component: any) {
    return function Wrapper(props: any) {
        const formState = useRootState();
        return <Component {...props} rootState={formState}/>
    }
}