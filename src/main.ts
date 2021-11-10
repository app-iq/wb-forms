import {Form} from "./Form/Form";
import {withField} from "./Field/HOCs";
import {FieldActions} from "./Data/Actions/Field/FieldActions";
import {FormActions} from "./Data/Actions/Form/FormActions";
import {SubmitActions} from "./Data/Actions/Form/SubmitActions";
import {SetupActions} from "./Data/Actions/Setup/SetupActions";
import {FieldState} from "./Data/Types/FieldState";
import {RootState} from "./Data/Types/RootState";
import {DefaultsProvider} from "./Defaults/DefaultsContext";
import {DefaultFormFactory} from "./Factory/DefaultFormFactory";
import {FieldConfig, FieldTypeMap, FormConfiguration} from "./Factory/DefaultFormFactoryConfiguration";
import {FieldProps} from "./Field/FieldProps";
import {FieldServices} from "./Field/FieldServices";
import {FieldInitializeFunc} from "./Field/Helpers";
import {checkboxValueSelector, filesValueSelector, singleFileSelector, textValueSelector} from "./Field/ValueSelector";
import { FormProps } from "./Form/FormProps";
import { WithActionDataProps } from "./Form/HOCs";
import { Button } from "./Form/Button/Button";
import { ChangeHandler } from "./Services/Protocol/ChangeHandler";
import { FieldValidator } from "./Services/Protocol/FieldValidator";
import { StateUpdater } from "./Services/Protocol/StateUpdater";
import { SubmitService } from "./Services/Protocol/SubmitService";
import { DefaultChangeHandler } from "./Services/DefaultImplementation/DefaultChangeHandler";
import { DefaultHttpSubmitService } from "./Services/DefaultImplementation/DefaultHttpSubmitService";
import { DefaultStateUpdater } from "./Services/DefaultImplementation/DefaultStateUpdater";
import { RegexBasedFieldValidator } from "./Services/DefaultImplementation/RegexBasedFieldValidator";
import { ServiceFactory } from "./Services/ServiceFactory/ServiceFactory";
import { DefaultServiceFactory } from "./Services/ServiceFactory/DefaultServiceFactory";


export {
    Form,
    withField,
}

export {
    FieldActions,
    FormActions,
    SubmitActions,
    SetupActions,
}

export type {
    FieldState,
    RootState
}

export {
    DefaultsProvider,
}


export {
    DefaultFormFactory
}

export type {
    FieldTypeMap,
    FieldConfig,
    FormConfiguration
}

export type {
    FieldProps,
    FieldServices,
    FieldInitializeFunc
}

export {
    textValueSelector,
    checkboxValueSelector,
    filesValueSelector,
    singleFileSelector
}

export {
    Button
}

export type {
    FormProps,
    WithActionDataProps
}


export type {
    ChangeHandler,
    FieldValidator,
    StateUpdater,
    SubmitService,
    ServiceFactory
}

export {
    DefaultChangeHandler,
    DefaultHttpSubmitService,
    DefaultStateUpdater,
    RegexBasedFieldValidator,
    DefaultServiceFactory
}