# React-EasyForm

a library that make your life easier

## Features

* Form Generation
* Validation
* Submitting
* Customizable



### Architecture


    <ServiceProvider>
        <DispatchProvider>
            <EventProvider>
                <ConfigurationProvider>
                    <StateProvider>
                        <FormComponent>
                            <FieldComponent />
                            <FieldComponent />
                            ...
                        </FormProvider>
                    </StateProvider>
                <ConfigurationProvider/>
            </EventProvider>
        </DispatchProvider>
    </ServiceProvider>



**Configuration Provider**

    {
        fields : {
            [filedName : string] : FieldConfiguration;
        };

        form: FormConfiguration;
    }


**State Provider**

    {
        fields : {
            [fieldName : string] : FieldState;
        };

        forms: FormState;
    }

**Service Provider** 

    {
        [serviceName : string] : Service as any;
    }

**Event Provider**

    {
        [eventId : string] : Listener[];
    }



**State** 

    {
        configuration : Configuration;
        state: State;
    }


    {
        fields : {
            configuration : FieldConfiguration;
            state : FieldState;
            ref : ref;
        };
        form: {
            configuration : FormConfiguration;
            state : FormState;
        }
    }
