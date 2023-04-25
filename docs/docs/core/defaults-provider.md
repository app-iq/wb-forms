---
sidebar_position: 7
---

# Defaults Provider

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
