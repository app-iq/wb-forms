import DefaultTextField from "./Components/DefaultTextField";
import React, {useEffect, useState} from "react";
import {EasyForm} from "../Form/EasyForm";
import {DispatchFunction} from "../Form/DispatchContext";
import {useServiceFactory} from "../Services/Hooks";
import {DefaultHttpSubmitOptions} from "../Services/DefaultImplementation/DefaultHttpSubmitService";
import {useRootState} from "../Form/RootStateContext";

export function SimpleExample() {


    const [dispatch, setDispatch] = useState<DispatchFunction | undefined>(undefined);
    const [readonly, setReadonly] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setReadonly(!readonly), 2000);
        return () => clearInterval(id);
    });

    const submit: DefaultHttpSubmitOptions = {
        onResponseStatus: (status, statusText) => console.log('onResponseStatus', status, statusText),
        onSuccess: response => console.log('onSuccess', response),
        onFail: error => console.log('onFail', error),
        onComplete: () => console.log('onComplete'),
        url: 'https://forms-webbox.free.beeceptor.com/test-post'
    }

    return <EasyForm getDispatch={dispatch => setDispatch(() => dispatch)} serviceOptions={{
        submit
    }}>
        <div>
            <span>Username</span>
            <DefaultTextField name={'username'} readonly={readonly} initialValue={'ali faris'}/>
        </div>
        <div>
            <span>Password</span>
            <DefaultTextField name={'password'} validationRules={'^[0-9]{4,6}$'}/>
        </div>

        <LoginButton/>

    </EasyForm>;
}


function LoginButton() {
    const serviceFactory = useServiceFactory();
    const rootState = useRootState();
    return <button disabled={rootState.form.loading}
                   onClick={() => {
                       const submitter = serviceFactory.createSubmitService();
                       return submitter.submit();
                   }}>
        {rootState.form.loading ? 'Loading...' : 'LOGIN'}
    </button>
}