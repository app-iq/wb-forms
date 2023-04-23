---
sidebar_position: 6
---

# Data Submission

we built this library to be customizable, so each behavior have its own module than can be replaced by you.

this library come with default implementations for each behaviors:

| service                   | description                                                               | default behavior                                                                    |
| ------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| field validation          | validating a single field                                                 | simple regex based validation, see TODO: add url                                    |
| form validation           | validating the whole form                                                 | it uses the field validator for all fields and return the result, see TODO: add url |
| field change handler      | handling onChange for the field                                           | see TODO: todo add url                                                              |
| file field change handler | handling onChange for file fields                                         | see TODO: todo add url                                                              |
| data submission           | handling submitting the data to the server                                | http submitter that uses `fetch`                                                    |
| file uploading            | handling file upload, this is used by default for the auto upload feature | using `fetch` to upload the file                                                    |

## ServiceFactory

the service factory is where we create instances of each different service, to get access to the service factory object, you need to use `useServiceFactory` hook:

    import {useServiceFactory} from 'wb-core-provider';
    import {ServiceFactory} from 'wb-forms';

    export function SubmitButton(props: Props) {
        const serviceFactory = useServiceFactory<ServiceFactory>();

        const onSubmit = () => {
            const formValidator = serviceFactory.createFormValidator();
            if (!formValidator.validate().valid) {
                alert('form is not valid');
                return;
            }
            const submitService = serviceFactory.createSubmitService();
            await submitService.submit();
        };
        return <button onClick={(e) => {
            e.preventDefault();
            return onSubmit();
        }}>
            Submit
        </button>;
    }

## Custom Service Factory

you can inject your custom service factory via `Form` component props:

    import {ServiceFactory} from 'wb-forms';

    class MyCustomServiceFactory implements ServiceFactory {
        // your own implementation of the service factory
    }

or maybe use can extend the default service factory

    import {ServiceFactory, DefaultServiceFactory} from 'wb-forms';

    class MyCustomServiceFactory extends DefaultServiceFactory {
        // override what ever you want
    }

then in the `Form` component, you can do this:

    const serviceFactoryCallback = useCallback((dispatch: DispatchFunction, state: State, props: FormProps) => {
        return new MyCustomServiceFactory(state, dispatch, props), [])
    };

    <Form serviceProvider={serviceFactoryCallback}>
        ...
    </Form>
