---
sidebar_position: 5
---

# Validation

there are two level of validations, field level and form level.

## Field Validation

for this behavior, we use FieldValidator which is created via the service factory.

    createFieldValidator(fieldName: string): FieldValidator;

by default, `RegexBasedFieldValidator` is returned, but you can change that by either using custom service factory that would create what ever field validator you need or you can pass new field validator instance via field configuration props:

    <Form fieldConfiguration={{
        email: {
            fieldValidator: (dispatch, state, serviceFactory) => new EmailValidator()
        }
    }}>

        <TextField name='email' />

    </Form>

by default, the validation happens when field value changed, you still can provide few properties to alter the behavior of the validation:

| configuration name  |  details |
|---|---|
| validationRules | a value that will be used by the field validator to check if the value valid or not, an example of this can be regex expression|
| skipValidation | a flag to skip validation, by default its `false` |
| validateOnChange | a flag to update validation state when the value changed, by default its `true` |
| fieldValidator | we already talked about this, its used to create a new validator for the specified field |

    <Form fieldConfiguration={{
        email: {
            fieldValidator: (dispatch, state, serviceFactory) => new MyCustomValidator(),
            skipValidation: true,
            validationRules: 'required|email',
            validateOnChange: false
        }
    }}>

        <TextField name='email' />
        ...

    </Form>

## Form Validation

for this behavior, we use FormValidator which is created via the service factory.

    createFormValidator(): FormValidator;

by default, the form validator will go throw each field and collect `ValidationResult` object, the default implementation will return empty array for errors it will only return `valid` flag to indicate if the form is valid or not, it will also change the state of valid status for each field.
