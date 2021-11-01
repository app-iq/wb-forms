import React, {ReactElement, useEffect, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducer";
import {SetupActions} from "../Actions/SetupAction";
import {FieldsContext} from "../Context/FieldsContext";
import {DispatchContext} from "../Context/DispatchContext";

export function EasyForm({children}: { children: ReactElement[] | ReactElement }) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    const childrenArr = Array.isArray(children) ? children : [children];
    useEffect(() => {
        childrenArr.forEach(c => dispatch(SetupActions.initializeField(c.props.name)));
    }, [childrenArr]);

    return <div>
        <DispatchContext.Provider value={dispatch}>
            <FieldsContext.Provider value={state.fields}>
                {
                    children
                }
            </FieldsContext.Provider>
        </DispatchContext.Provider>
    </div>
}



