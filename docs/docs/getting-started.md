---
sidebar_position: 1
---

# Getting Started

this library help you build ready to go forms, that means we handle for you:

- Rendering
- State Management
- Validation
- Submitting

in addition to that its very easy to **customize** and **extend**.

this library comes with many extension libraries that you can use alter the default behavior of the library or extend it.

## Installation

    npm install wbox-forms

or

    yarn add wbox-forms

## Quick Start

    import {Form} from 'wbox-forms'
    import {TextField} from 'wbox-forms/build/DefaultComponents/TextField'
    import {PasswordField} from 'wbox-forms/build/DefaultComponents/PasswordField'
    import {SubmitButton} from 'wbox-forms/build/DefaultComponents/PasswordField'

    const submitOptions = {
        url : 'http://example.com/login',
        onSuccess : response => console.log(response) 
    };
    <Form options={{submit : submitOptions}} fieldConfiguration={{
        username: {
            validationRules: '^\\.{3:10}$'
        },
        password: {
            validationRules: '^[0-9]+$'
        }
    }}>
        <TextField name={'username'} />
        <PasswordField name={'password'} />
        <SubmitButton title='Login' />
    </Form>

from just this code you will have fully functional form.
