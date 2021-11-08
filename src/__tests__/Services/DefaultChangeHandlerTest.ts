import {DefaultChangeHandler} from "../../Services/DefaultImplementation/DefaultChangeHandler";
import {buildMockFieldState} from "../TestHelpers";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";
import {FieldState} from "../../Data/Types/FieldState";

describe('DefaultChangeHandler', function () {
    it('should dispatch changeValue action', function () {
        const dispatch = jest.fn();
        const fieldState = buildMockFieldState({value: 'ali', name: 'username'});
        const validator = {} as any;
        const handler = new DefaultChangeHandler(dispatch, fieldState, validator);
        handler.handle('new-value');
        expect(dispatch).toBeCalledWith(FieldActions.changeValue('username', 'new-value'));
    });

    it('should dispatch changeValidationState action', function () {
        const dispatch = jest.fn();
        const fieldState = buildMockFieldState({
            value: 'ali',
            valid: true,
            name: 'username',
            validateOnChange: true,
            skipValidation: false,
            validationRules: 'some-rules'
        });
        const validator = {validate: jest.fn().mockReturnValue(false)} as any;
        const handler = new DefaultChangeHandler(dispatch, fieldState, validator);
        handler.handle('new-value');
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, FieldActions.changeValidationState('username', false));
    });


    it('should not dispatch any action if readonly is true', function () {
        const dispatch = jest.fn();
        const fieldState = buildMockFieldState({readonly: true});
        const validator = {} as any;
        const handler = new DefaultChangeHandler(dispatch, fieldState, validator);
        handler.handle('new-value');
        expect(dispatch).not.toBeCalled();
    });


    function assertValidationActionNotDispatch(dispatch: any, fieldState: any) {
        const validator = {} as any;
        const handler = new DefaultChangeHandler(dispatch, fieldState, validator);
        handler.handle('new-value');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).not.toHaveBeenNthCalledWith(2, FieldActions.changeValidationState('username', false));
    }

    it('should not dispatch changeValidationState action', function () {
        const fieldState = buildMockFieldState({
            value: 'ali',
            valid: true,
            name: 'username',
            validateOnChange: true,
            skipValidation: false,
            validationRules: 'some-rules'
        });
        assertValidationActionNotDispatch(jest.fn(), {...fieldState, skipValidation: true} as FieldState);
        assertValidationActionNotDispatch(jest.fn(), {...fieldState, validateOnChange: false} as FieldState);
        assertValidationActionNotDispatch(jest.fn(), {...fieldState, validationRules: ''} as FieldState);
        assertValidationActionNotDispatch(jest.fn(), {...fieldState, validationRules: null} as FieldState);
        assertValidationActionNotDispatch(jest.fn(), {...fieldState, validationRules: undefined} as FieldState);
    });

    it('should call listener callback when passed', function () {
        const dispatch = jest.fn();
        const fieldState = buildMockFieldState();
        const validator = {} as any;
        const handler = new DefaultChangeHandler(dispatch, fieldState, validator);
        let listenerCallback = jest.fn();
        handler.handle('new-value', listenerCallback);
        expect(listenerCallback).toBeCalledWith('new-value');
    });

});