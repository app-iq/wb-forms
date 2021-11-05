import {FieldValidator} from "../Protocol/FieldValidator";
import {ChangeHandler} from "../Protocol/ChangeHandler";
import {SubmitService} from "../Protocol/SubmitService";

export interface ServiceFactory {
    createFieldValidator(fieldName: string): FieldValidator;

    createChangeHandler(fieldName: string): ChangeHandler;

    createSubmitService(): SubmitService;
}

