import {ServiceFactory} from "../../Services/ServiceFactory/ServiceFactory";
import {DispatchFunction} from "../DispatchContext";
import {withActionData, WithActionDataProps} from "../HOCs";
import {FunctionComponent} from "react";
import {RootState} from "../../Data/Types/RootState";

interface Props {
    render: (serviceFactory: ServiceFactory, dispatch: DispatchFunction, state: RootState) => any;
}

export interface ButtonProps extends Props {
    actionData: WithActionDataProps;
}

export function _Button(props: ButtonProps) {
    return props.render(props.actionData.serviceFactory, props.actionData.dispatch, props.actionData.rootState);
}

export const Button = withActionData(_Button) as FunctionComponent<Props>;