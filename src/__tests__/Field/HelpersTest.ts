import {defaultInitializeFunc} from "../../Field/Helpers";
import {Defaults} from "../../Defaults/FormDefaults";
import {FieldState} from "../../Data/Types/FieldState";

describe('Helpers', () => {

    describe('defaultInitializeFunc', function () {

        let fieldValidator = jest.fn();
        let changeHandler = jest.fn();
        const valueSelector = jest.fn();
        const onValueChanged = jest.fn();

        const defaults: Defaults = {fieldValue: 'x', clearValue: '-', valueSelector: jest.fn()};


        let props = {

            name: 'test',
            valueSelector: valueSelector,
            initialValue: '',
            validationRules: 'rules',

            skipValidation: true,
            validateOnChange: false,
            initialValid: true,
            hidden: true,

            readonly: true,
            clearValue: 'cleared',

            onValueChange: onValueChanged,
            changeHandler: changeHandler,
            fieldValidator: fieldValidator,
        };

        it('should use props', function () {
            const field = defaultInitializeFunc(props, defaults);
            let expected: FieldState = {
                name: 'test',
                valueSelector: valueSelector,
                value: '',
                readonly: true,
                valid: true,
                hidden: true,
                clearValue: 'cleared',
                validationRules: 'rules',
                skipValidation: true,
                validateOnChange: false,
                services: {
                    fieldValidator: fieldValidator,
                    changeHandler: changeHandler
                }
            };
            expect(field).toEqual(expected)
        });

        it('should initialize value,valid state from props', function () {
            const field = defaultInitializeFunc({...props, initialValue: 'test', initialValid: false}, defaults);
            expect(field.value).toEqual('test');
            expect(field.valid).toEqual(false);
        });


    });

})