# wbox-forms

react library to build forms and being happy at the same time

Content :

- Introduction
- Quick Start
- Form Options
- Field Options
- Form Factory
- Defaults
- Action Button


## Introduction

this library help you build ready to go forms, what means we handle for you:

- Rendering
- State Management
- Validation
- Submitting

in addition to that its very easy to **customize** and **extend**.

## Quick Start

    import {Form} from "wbox-forms"
    /*
     * for PasswordField,TextField,SubmitButton 
     * we assume you used one of our extention libraries like wbox-forms-tailwind or wbox-forms-material-ui
     * or you've built them your self
     */

    const submitOptions = {
        url : 'http://example.com/login',
        onSuccess : response => console.log(response) 
    };
    <Form options={{submit : submitOptions}}>
        <TextField name={'username'} validationRules={'^\\.{3:10}$'}/>
        <PasswordField name={'password'} validationRules={'^[0-9]+$'}/>
        <SubmitButton>Login</SubmitButton>
    </Form>

from just this code you will have fully functional form.

## Form Options

    {
        serviceFactoryCallback?: (dispatch: DispatchFunction, state: RootState, props: FormProps) => ServiceFactory;
        getDispatch?: (dispatch: DispatchFunction) => void;
        getState?: (state: RootState) => void;
        reducers?: RootReducer<Action<any, any>>[];
        serviceOptions?: {
            [serviceName: string]: any;
        }
    }

* **serviceFactoryCallback** callback function used to create your custom service factory, the callback will
  receive `dispatch` , `rootState` and `props` the passed props to the form


* **reducers** array of reducers that will be combined with the root reducer to handle your custom state management


* **serviceOptions** object that you used to inject options of each service, for example the options for submit service,
  the key is of each service option is the service name


* **getDispatch** callback function that used to get `dispatch` function


* **getState** callback function that used to get `rootState` object

one note to mention that when you use `getDispatch` or `getState` callback you need to `useCallback` hook to create the
callback if you used function component, or a reference to instance method if you used class component, the main idea is
that you shouldn't create new callback on each render.

## Field Options

    {
        name: string;
        valueSelector?: ValueSelector;
        initialValue?: string;
        validationRules?: any;
        skipValidation?: boolean;
        validateOnChange?: boolean;
        initialValid?: boolean;
        hidden?: boolean;
        readonly?: boolean;
        onValueChange?: (newValue: any) => void;
        clearValue?: any;
    }

* **name** name is th only required prop that you need to path to the field, this should be unique in the form.


* **valueSelector** callback that used to extract value from the input change event.


* **initialValue** the initial value of the field.


* **validationRules** the rules that will be used by the validation service to validate field value.


* **skipValidation** flag to indicate either to validate this field or not.


* **validateOnChange** flag to indicate either to validate this field on value change.


* **initialValid** the initial valid state for the field.


* **hidden** flag to indicate either to render the input or not.


* **readonly** flag to indicate either to prevent changes on field or not.


* **onValueChange** callback that will be called on value changes.


* **clearValue** the value that will be used to set field value when clear action triggered.

## Form Factory

we provide `DefaultFormFactory` class that can be used to render form from configuration object

look at this example

    const types = {
        'text' : TextField,
        'password' : PasswordField
    }

    const formFactory = new DefaultFormFactory(types);

    return formFactory.create({
        formConfig: {
            serviceOptions: {submit: submitOptions}
        },
        fieldConfig: {
            username : {
                fieldConfig: {name: 'username', initialValue: 'admin'},
                type: 'text'
            },
            password : {
                fieldConfig: {name: 'password'},
                type: 'password'
            }
        }
    });

`DefaultFormFactory` accepts field type map in its constructor, it's an object that what component to render.

in the extension libraries you should not worry about this, because each ui extension library will provide its own
factory.

## Defaults

if you want to override the default values you can wrap your `Form` component with `DefaultsProvider`

    const defaultValues = {...};
    <DefaultsProvider value={defaultValues}>
        <Form>
            ...
        </Form>
    <DefaultsProvider/>

the values that you can override are

    {
        clearValue: any;
        fieldValue: string;
        valueSelector: ValueSelector;
    }

the current default values are

    import {textValueSelector} from "wbox-forms";
    
    {
        fieldValue: '',
        clearValue: '',
        valueSelector: textValueSelector
    };


## Action Button

you can use `Button` component to render button that could be used to do dispatch actions.


the component take `render` a callback function that will receive `serviceFactory`,`dispatch`,`rootState` as arguments,
and return react element.

example:

    <Button render={(fs,dispatch,state) => <button onClick={() => ...}>DO SOMETHING</button>}/>


