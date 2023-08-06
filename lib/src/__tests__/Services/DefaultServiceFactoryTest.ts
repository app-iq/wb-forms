import {DefaultServiceFactory} from '../../Services/ServiceFactory/DefaultServiceFactory';
import {State} from '../../Data/State';
import {buildMockFieldState} from '../Utils/TestHelpers';
import {DefaultChangeHandler} from '../../Services/DefaultImplementation/DefaultChangeHandler';
import {RegexBasedFieldValidator} from '../../Services/DefaultImplementation/RegexBasedFieldValidator';
import {DefaultHttpSubmitService} from '../../Services/DefaultImplementation/DefaultHttpSubmitService';
import {DefaultDataCollector} from '../../Services/DefaultImplementation/DefaultDataCollector';

describe('DefaultServiceFactory', () => {
    it('should create onChangeHandler from field', () => {
        const mockedChangeHandler = {};
        const changeHandlerCallback = jest.fn().mockReturnValue(mockedChangeHandler);
        const rootState: State = {
            fields: {username: buildMockFieldState()},
            form: {loading: false},
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {
            children: [],
            fieldConfiguration: {
                username: {
                    changeHandler: changeHandlerCallback,
                },
            },
        });
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toEqual(mockedChangeHandler);
        expect(changeHandlerCallback).toBeCalled();
    });

    it('should create DefaultChangeHandler', () => {
        const rootState: State = {
            fields: {
                username: buildMockFieldState(),
            },
            form: {
                loading: false,
            },
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toBeInstanceOf(DefaultChangeHandler);
    });

    it('should create FieldValidator from field', () => {
        const mockedFieldValidator = {};
        const fieldValidatorCallback = jest.fn().mockReturnValue(mockedFieldValidator);
        const rootState: State = {
            fields: {username: buildMockFieldState()},
            form: {loading: false},
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {
            children: [],
            fieldConfiguration: {
                username: {
                    fieldValidator: fieldValidatorCallback,
                },
            },
        });
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toEqual(mockedFieldValidator);
        expect(fieldValidatorCallback).toBeCalled();
    });

    it('should create RegexBasedFieldValidator', () => {
        const rootState: State = {
            fields: {
                username: buildMockFieldState(),
            },
            form: {
                loading: false,
            },
        };
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toBeInstanceOf(RegexBasedFieldValidator);
    });

    it('should create DefaultHttpSubmitService', () => {
        const rootState: State = {fields: {}, form: {loading: false}};
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const submitter = serviceFactory.createSubmitService();
        expect(submitter).toBeInstanceOf(DefaultHttpSubmitService);
    });

    it('should create DefaultDataCollector', () => {
        const rootState: State = {fields: {}, form: {loading: false}};
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const collector = serviceFactory.createDataCollectorService();
        expect(collector).toBeInstanceOf(DefaultDataCollector);
    });
});
