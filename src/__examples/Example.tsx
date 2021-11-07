import DefaultTextField from "./Components/DefaultTextField";
import React, {useEffect, useState} from "react";
import {Form} from "../Form/Form";
import {DispatchFunction} from "../Form/DispatchContext";
import {DefaultHttpSubmitOptions} from "../Services/DefaultImplementation/DefaultHttpSubmitService";
import {Button} from "../Form/Button/Button";
import {DefaultFormFactory} from "../Factory/DefaultFormFactory";
import {FieldTypeMap} from "../Factory/DefaultFormFactoryConfiguration";
import DefaultDropdownField from "./Components/DefaultDropdownField";

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

    // const types : FieldTypeMap = {
    //     'text' : DefaultTextField,
    //     'dropdown' : DefaultDropdownField
    // }
    // const formFactory = new DefaultFormFactory<FieldTypeMap>(types);
    //
    // return formFactory.create({
    //     formConfig: {
    //         serviceOptions: {
    //             submit : submit
    //         }
    //     },
    //     fieldConfig: {
    //         username : {
    //             fieldConfig : {
    //                 name: 'username',
    //                 initialValue : 'ali'
    //             },
    //             type: 'text'
    //         },
    //         password : {
    //             fieldConfig : {
    //                 name: 'password',
    //                 validationRules : '^[0-9]{4}$'
    //             },
    //             type: 'text'
    //         },
    //
    //         country : {
    //             fieldConfig : {
    //                 name: 'country',
    //                 options : ["Iraq" , "Italy" , "Japan"]
    //             },
    //             type: 'dropdown'
    //         },
    //
    //     }
    // });

    return <Form getDispatch={dispatch => setDispatch(() => dispatch)} serviceOptions={{
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

        <Button render={(serviceFactory, dispatch, state) =>
            <button disabled={state.form.loading}
                    onClick={() => {
                        const submitter = serviceFactory.createSubmitService();
                        return submitter.submit();
                    }}>
                {state.form.loading ? 'Loading...' : 'LOGIN'}
            </button>}
        />

    </Form>;
}