import {ServiceFactory} from "../../Services/ServiceFactory";
import {DispatchFunction} from "../DispatchContext";
import {RootState} from "../../Data/Reducer/RootReducer";
import {withActionData, WithActionDataProps} from "../HOC";
import {FunctionComponent} from "react";

interface Props {
    render: (serviceFactory: ServiceFactory, dispatch: DispatchFunction, state: RootState) => any;
}

export interface ButtonProps extends Props {
    actionData: WithActionDataProps;
}

function _Button(props: ButtonProps) {
    return props.render(props.actionData.serviceFactory, props.actionData.dispatch, props.actionData.rootState);
}

export const Button = withActionData(_Button) as FunctionComponent<Props>;