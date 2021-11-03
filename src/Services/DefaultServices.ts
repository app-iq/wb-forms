import {DefaultFieldsRenderService} from "./DefaultImplementation/DefaultFieldsRenderService";
import {Services} from "./Services";
import {RegexBasedFieldValidator} from "./DefaultImplementation/RegexBasedFieldValidator";

export const defaultServices: Services = {
    fieldsRenderService: () => new DefaultFieldsRenderService(),
    fieldValidator: () => new RegexBasedFieldValidator()
}