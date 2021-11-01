import React, {ReactElement, useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducer";
import {SetupActions} from "../Actions/SetupAction";

export function EasyForm({children}: { children: ReactElement[] | ReactElement }) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    const childrenArr = Array.isArray(children) ? children : [children];
    useEffect(() => {
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name)));
    },[childrenArr]);

    return <div>
        {
            children
        }
    </div>
}



