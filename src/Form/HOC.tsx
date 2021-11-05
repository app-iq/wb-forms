import {useServiceFactory} from "../Services/ServiceFactory/Hooks";
import {useContext} from "react";
import {DispatchContext, DispatchFunction} from "./DispatchContext";
import {useRootState} from "./RootStateContext";
import {ServiceFactory} from "../Services/ServiceFactory/ServiceFactory";
import {RootState} from "../Data/Types/RootState";

export interface WithActionDataProps {
    serviceFactory: ServiceFactory;
    dispatch: DispatchFunction;
    rootState: RootState;
}

export function withActionData(Component: any) {
    return function Wrapper(props: any) {
        const serviceFactory = useServiceFactory();
        const dispatch = useContext(DispatchContext);
        const rootState = useRootState();
        const toInjectProps: WithActionDataProps = {
            rootState: rootState,
            dispatch: dispatch,
            serviceFactory: serviceFactory
        }
        return <Component {...props} actionData={toInjectProps}/>
    }
}