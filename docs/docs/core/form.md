---
sidebar_position: 1
---

# Form

`Form` is the most important component, it should wrap all your fields and form related components such as the button.

    import { Form } from 'wb-forms';


    <Form>
        <MyTextField />
        <MySelectField />
        <MySubmitButton />
    <Form>

the `Form` component receive the following props (all are optional):

    {
        serviceFactoryCallback?: (dispatch: DispatchFunction, state: RootState, props: FormProps) => ServiceFactory;
        reducers?: RootReducer<Action<any, any>>[];
        serviceOptions?: {
            [serviceName: string]: any;
        }
    }

- **serviceFactoryCallback** callback function used to create your custom service factory, checkout **Services** section for more information. //TODO:

- **reducers** array of reducers that will be combined with the root reducer to handle your custom actions, checkout **State** section for more information. //TODO:

- **serviceOptions** object that you should used to inject options of each service, for example the options for submit service.
