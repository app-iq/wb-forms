import DefaultTextField from "./Components/DefaultTextField";
import React, {useCallback, useEffect, useState} from "react";
import {DispatchFunction} from "../Root/DispatchContext";
import {EasyForm} from "../Root/EasyForm";
import {FieldActions} from "../Data/Actions/Field/FieldActions";
import {EasyFormReducerState} from "../Data/Reducer/EasyFormReducer";

export function SimpleExample() {

    const [dispatch, setDispatch] = useState<{
        dispatch: DispatchFunction
    } | undefined>(undefined);

    const [state, setState] = useState<EasyFormReducerState | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => dispatch?.dispatch(FieldActions.changeProperty("test", "readonly", true)), 2000);
        const id = setInterval(() => console.log(state) , 1000);
        return () => clearInterval(id);
    }, [dispatch , state]);

    const getDispatchCallback = useCallback(ref => setDispatch({dispatch: ref}), [setDispatch]);
    const getStateCallback = useCallback(state => setState(state), [setState]);

    return <EasyForm getDispatch={getDispatchCallback} getState={getStateCallback}>
        <div>
            <span>Username</span>
            <DefaultTextField name={'username'} initialValue={'ali faris'}/>
        </div>
        <div>
            <span>Password</span>
            <DefaultTextField name={'password'} validationRules={'^[0-9]{4,6}$'}/>
        </div>
    </EasyForm>;
}