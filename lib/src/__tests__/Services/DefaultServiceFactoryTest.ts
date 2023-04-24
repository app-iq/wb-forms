import {DefaultServiceFactory} from '../../Services/ServiceFactory/DefaultServiceFactory';
import {State} from '../../Data/State';
import {buildMockFieldState} from '../../Utils/TestHelpers';
import {DefaultChangeHandler} from '../../Services/DefaultImplementation/DefaultChangeHandler';
import {RegexBasedFieldValidator} from '../../Services/DefaultImplementation/RegexBasedFieldValidator';
import {DefaultHttpSubmitService} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';

describe('DefaultServiceFactory', () => {
    it('should create onChangeHandler from field', function () {
        const mockedChangeHandler = {};
        const changeHandlerCallback = jest.fn().mockReturnValue(mockedChangeHandler);
        const rootState: State = {
            fields: {username: buildMockFieldState()},
            form: {loading: false}
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {
            children: [], fieldConfiguration: {
                username: {
                    changeHandler: changeHandlerCallback
                }
            }
        });
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toEqual(mockedChangeHandler);
        expect(changeHandlerCallback).toBeCalled();
    });

    it('should create DefaultChangeHandler', function () {
        const rootState: State = {
            fields: {
                username: buildMockFieldState()
            },
            form: {
                loading: false
            }
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toBeInstanceOf(DefaultChangeHandler);
    });

    it('should create FieldValidator from field', function () {
        const mockedFieldValidator = {};
        const fieldValidatorCallback = jest.fn().mockReturnValue(mockedFieldValidator);
        const rootState: State = {
            fields: {username: buildMockFieldState()},
            form: {loading: false}
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {
            children: [], fieldConfiguration: {
                username: {
                    fieldValidator: fieldValidatorCallback
                }
            }
        });
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toEqual(mockedFieldValidator);
        expect(fieldValidatorCallback).toBeCalled();
    });

    it('should create RegexBasedFieldValidator', function () {
        const rootState: State = {
            fields: {
                username: buildMockFieldState()
            },
            form: {
                loading: false
            }
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toBeInstanceOf(RegexBasedFieldValidator);
    });


    it('should create DefaultHttpSubmitService', function () {
        const rootState: State = {fields: {}, form: {loading: false}};
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const submitter = serviceFactory.createSubmitService();
        expect(submitter).toBeInstanceOf(DefaultHttpSubmitService);
    });

});