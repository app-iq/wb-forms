import {State} from '../../Data/State';
import {FormProps} from '../../Form/FormProps';
import {ChangeHandler} from '../Protocol/ChangeHandler';
import {DefaultChangeHandler} from '../DefaultImplementation/DefaultChangeHandler';
import {FieldValidator} from '../Protocol/FieldValidator';
import {RegexBasedFieldValidator} from '../DefaultImplementation/RegexBasedFieldValidator';
import {SubmitService} from '../Protocol/SubmitService';
import {DefaultHttpSubmitService} from '../DefaultImplementation/DefaultHttpSubmitService';
import {ServiceFactory} from './ServiceFactory';
import {FieldConfiguration} from '../../Field/FieldProps';
import {PropsWithChildren} from 'react';
import {ValueSelector} from '../../Field/ValueSelector';
import {FormValidator} from '../Protocol/FormValidator';
import {DefaultFormValidator} from '../DefaultImplementation/DefaultFormValidator';
import {DispatchFunction} from 'wb-core-provider';

export class DefaultServiceFactory implements ServiceFactory {

    private readonly state: State;
    private readonly dispatch: DispatchFunction;
    private readonly formProps: FormProps;

    constructor(state: State, dispatch: DispatchFunction, formProps: PropsWithChildren<FormProps>) {
        this.state = state;
        this.dispatch = dispatch;
        this.formProps = formProps;
    }

    createChangeHandler(fieldName: string, defaultValueSelector?: ValueSelector): ChangeHandler {
        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.changeHandler) {
            return fieldConfiguration.changeHandler(this.dispatch, this.state, this);
        }

        return new DefaultChangeHandler(this.dispatch, fieldName, this.createFieldValidator(fieldName), fieldConfiguration ?? {}, defaultValueSelector);
    }

    createFieldValidator(fieldName: string): FieldValidator {
        const fieldConfiguration = this.getFieldConfiguration(fieldName);
        if (fieldConfiguration?.fieldValidator) {
            return fieldConfiguration.fieldValidator(this.dispatch, this.state, this);
        }

        return new RegexBasedFieldValidator();
    }

    createSubmitService(): SubmitService {
        return new DefaultHttpSubmitService(this.dispatch, this.state, this.formProps.serviceOptions ?? {});
    }

    getFieldConfiguration(fieldName: string): FieldConfiguration | undefined {
        return this.formProps.fieldConfiguration?.[fieldName];
    }

    createFormValidator(): FormValidator {
        return new DefaultFormValidator(this.state.fields, this);
    }

}
