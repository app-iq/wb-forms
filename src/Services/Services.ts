import {FieldsRenderService} from "./Protocol/FieldsRenderService";
import {FieldValidator} from "./Protocol/FieldValidator";

export type ServiceCallback<TService> = (options?:any) => TService

export interface Services {
    fieldsRenderService: ServiceCallback<FieldsRenderService>;
    fieldValidator : ServiceCallback<FieldValidator>;
}