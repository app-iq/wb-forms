import {DefaultChangeHandler} from '../../Services/DefaultImplementation/DefaultChangeHandler';
import {FieldActions} from '../../Data/Field/FieldActions';
import {FieldConfiguration} from '../../Field/FieldProps';
import * as TypeMoq from 'typemoq';
import {FieldValidator} from '../../Services/Protocol/FieldValidator';
import {DispatchFunction} from '../../Form/DispatchContext';

describe('DefaultChangeHandler', function () {

    it('should dispatch changeValue action', function () {
        const dispatch = jest.fn();
        const validator = TypeMoq.Mock.ofType<FieldValidator>();
        const handler = new DefaultChangeHandler(dispatch, 'username', validator.object, {
            valueSelector: value => value
        });
        handler.handle('new-value');
        expect(dispatch).toBeCalledWith(FieldActions.changeValue('username', 'new-value'));
    });

    it('should dispatch changeValidationState action', function () {
        const dispatch = jest.fn();
        const validator = TypeMoq.Mock.ofType<FieldValidator>();
        validator.setup(v => v.validate).returns(() => () => false);
        const handler = new DefaultChangeHandler(dispatch, 'username', validator.object, {
            validateOnChange: true,
            validationRules: 'mocked-rules',
            valueSelector: value => value
        });
        handler.handle('new-value');
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, FieldActions.changeValidationState('username', false));
    });


    it('should not dispatch any action if readonly is true', function () {
        const dispatch = jest.fn();
        const validator = TypeMoq.Mock.ofType<FieldValidator>();
        const handler = new DefaultChangeHandler(dispatch, 'test', validator.object, {readonly: true});
        handler.handle('new-value');
        expect(dispatch).not.toBeCalled();
    });


    function assertValidationActionNotDispatch(fieldName: string, dispatch: DispatchFunction, fieldConfiguration: FieldConfiguration) {
        const validator = TypeMoq.Mock.ofType<FieldValidator>();
        const handler = new DefaultChangeHandler(dispatch, fieldName, validator.object, fieldConfiguration);
        handler.handle('new-value');
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).not.toHaveBeenNthCalledWith(2, FieldActions.changeValidationState('username', false));
    }

    it('should not dispatch changeValidationState action', function () {
        const fieldConfiguration: FieldConfiguration = {
            validateOnChange: true,
            skipValidation: false,
            validationRules: 'some-rules',
            valueSelector: value => value
        };
        assertValidationActionNotDispatch('username', jest.fn(), {...fieldConfiguration, skipValidation: true});
        assertValidationActionNotDispatch('username', jest.fn(), {...fieldConfiguration, validateOnChange: false});
        assertValidationActionNotDispatch('username', jest.fn(), {...fieldConfiguration, validationRules: ''});
        assertValidationActionNotDispatch('username', jest.fn(), {...fieldConfiguration, validationRules: null});
        assertValidationActionNotDispatch('username', jest.fn(), {...fieldConfiguration, validationRules: undefined});
    });

    it('should call listener callback when passed', function () {
        const dispatch = jest.fn();
        const validator = TypeMoq.Mock.ofType<FieldValidator>();
        const handler = new DefaultChangeHandler(dispatch, 'test', validator.object, {
            valueSelector: value => value
        });
        const listenerCallback = jest.fn();
        handler.handle('new-value', listenerCallback);
        expect(listenerCallback).toBeCalledWith('new-value', dispatch);
    });

});
