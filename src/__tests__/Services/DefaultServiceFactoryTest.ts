import {DefaultServiceFactory} from "../../Services/ServiceFactory/DefaultServiceFactory";
import {RootState} from "../../Data/Types/RootState";
import {buildMockFieldState} from "../TestHelpers";
import {DefaultChangeHandler} from "../../Services/DefaultImplementation/DefaultChangeHandler";
import {RegexBasedFieldValidator} from "../../Services/DefaultImplementation/RegexBasedFieldValidator";
import {DefaultHttpSubmitService} from "../../Services/DefaultImplementation/DefaultHttpSubmitService";
import {DefaultStateUpdater} from "../../Services/DefaultImplementation/DefaultStateUpdater";

describe('DefaultServiceFactory', () => {
    it('should create onChangeHandler from field', function () {
        let mockedChangeHandler = {};
        let changeHandlerCallback = jest.fn().mockReturnValue(mockedChangeHandler);
        const rootState: RootState = {
            fields: {
                username: buildMockFieldState({
                    services: {
                        changeHandler: changeHandlerCallback,
                        fieldValidator: undefined
                    }
                })
            },
            form: {
                loading: false
            }
        }
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toEqual(mockedChangeHandler);
        expect(changeHandlerCallback).toBeCalled();
    });

    it('should create DefaultChangeHandler', function () {
        const rootState: RootState = {
            fields: {
                username: buildMockFieldState()
            },
            form: {
                loading: false
            }
        }
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const handler = serviceFactory.createChangeHandler('username');
        expect(handler).toBeInstanceOf(DefaultChangeHandler);
    });

    it('should create FieldValidator from field', function () {
        let mockedFieldValidator = {};
        let fieldValidatorCallback = jest.fn().mockReturnValue(mockedFieldValidator);
        const rootState: RootState = {
            fields: {
                username: buildMockFieldState({
                    services: {
                        fieldValidator: fieldValidatorCallback,
                        changeHandler: undefined
                    }
                })
            },
            form: {
                loading: false
            }
        }
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toEqual(mockedFieldValidator);
        expect(fieldValidatorCallback).toBeCalled();
    });

    it('should create RegexBasedFieldValidator', function () {
        const rootState: RootState = {
            fields: {
                username: buildMockFieldState()
            },
            form: {
                loading: false
            }
        }
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const validator = serviceFactory.createFieldValidator('username');
        expect(validator).toBeInstanceOf(RegexBasedFieldValidator);
    });


    it('should create DefaultHttpSubmitService', function () {
        const rootState: RootState = {fields: {}, form: {loading: false}};
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const submitter = serviceFactory.createSubmitService();
        expect(submitter).toBeInstanceOf(DefaultHttpSubmitService);
    });


    it('should create DefaultStateUpdater', function () {
        const rootState: RootState = {fields: {}, form: {loading: false}};
        const serviceFactory = new DefaultServiceFactory(rootState, jest.fn(), {children: []});
        const submitter = serviceFactory.createStateUpdater();
        expect(submitter).toBeInstanceOf(DefaultStateUpdater);
    });

})