import {DefaultFieldsRenderService} from "./DefaultImplementation/DefaultFieldsRenderService";
import {Services} from "./Services";
import {RegexBasedFieldValidator} from "./DefaultImplementation/RegexBasedFieldValidator";
import {DefaultChangeHandler} from "./DefaultImplementation/DefaultChangeHandler";

export const defaultServices: Services = {
    fieldsRenderService: () => new DefaultFieldsRenderService(),
    fieldValidator: () => new RegexBasedFieldValidator(),
    changeHandler: (dispatch, options) => new DefaultChangeHandler(dispatch , options!.state , options!.validator),
}