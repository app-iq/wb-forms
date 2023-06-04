import { DefaultFormValidator } from '../../Services/DefaultImplementation/DefaultFormValidator';
import { FieldsState } from '../../Data/State';
import { Mock } from 'typemoq';
import { ServiceFactory } from '../../Services/ServiceFactory/ServiceFactory';
import { It, Times } from 'typemoq';
import { FieldValidator } from '../../Services/Protocol/FieldValidator';

class MockedFieldValidator implements FieldValidator {
    private readonly valid: boolean;

    constructor(valid: boolean) {
        this.valid = valid;
    }

    validate(): boolean {
        return this.valid;
    }
}

describe('DefaultFormValidator', () => {
    it('should validate form / not valid form', function () {
        const fields: FieldsState = {
            name: { value: 'Ali Faris', valid: true, ready: true },
            email: { value: 'test.com', valid: true, ready: true },
            phone: { value: '0000', valid: true, ready: true },
        };
        const serviceFactory = Mock.ofType<ServiceFactory>();
        serviceFactory
            .setup(sf => sf.getFieldConfiguration(It.isAny()))
            .returns(() => ({
                validationRules: 'required',
            }));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('name')))
            .returns(() => new MockedFieldValidator(true));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('email')))
            .returns(() => new MockedFieldValidator(false));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('phone')))
            .returns(() => new MockedFieldValidator(true));

        const formValidator = new DefaultFormValidator(fields, serviceFactory.object, jest.fn());
        const validationResult = formValidator.validate();

        expect(validationResult.valid).toEqual(false);
    });

    it('should validate form / valid form', function () {
        const fields: FieldsState = {
            name: { value: 'Ali Faris', valid: true, ready: true },
            email: { value: 'test@email.com', valid: true, ready: true },
            phone: { value: '0000', valid: true, ready: true },
        };
        const serviceFactory = Mock.ofType<ServiceFactory>();
        serviceFactory.setup(sf => sf.getFieldConfiguration(It.isAny())).returns(() => ({}));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('name')))
            .returns(() => new MockedFieldValidator(true));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('email')))
            .returns(() => new MockedFieldValidator(true));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('phone')))
            .returns(() => new MockedFieldValidator(true));

        const formValidator = new DefaultFormValidator(fields, serviceFactory.object, jest.fn());
        const validationResult = formValidator.validate();
        expect(validationResult.valid).toEqual(true);
    });

    it('should skipValidation for marked fields', function () {
        const fields: FieldsState = {
            name: { value: 'Ali Faris', valid: true, ready: true },
            email: { value: 'test.com', valid: true, ready: true },
        };

        const serviceFactory = Mock.ofType<ServiceFactory>();
        const mockedNameFieldValidator = Mock.ofType<FieldValidator>();
        mockedNameFieldValidator.setup(v => v.validate(It.isAny(), It.isAny())).returns(() => true);
        const mockedEmailFieldValidator = Mock.ofType<FieldValidator>();
        mockedEmailFieldValidator.setup(v => v.validate(It.isAny(), It.isAny())).returns(() => false);
        serviceFactory
            .setup(sf => sf.getFieldConfiguration(It.isValue('name')))
            .returns(() => ({ validationRules: 'required' }));
        serviceFactory
            .setup(sf => sf.getFieldConfiguration(It.isValue('email')))
            .returns(() => ({ skipValidation: true }));
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('name')))
            .returns(() => mockedNameFieldValidator.object);
        serviceFactory
            .setup(sf => sf.createFieldValidator(It.isValue('email')))
            .returns(() => mockedEmailFieldValidator.object);

        const formValidator = new DefaultFormValidator(fields, serviceFactory.object, jest.fn());
        const validationResult = formValidator.validate();

        expect(validationResult.valid).toEqual(true);
        mockedNameFieldValidator.verify(v => v.validate(It.isAny(), 'required'), Times.once());
        mockedEmailFieldValidator.verify(v => v.validate(It.isAny(), It.isValue(undefined)), Times.never());
    });
});
