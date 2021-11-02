import {FieldsRenderService} from "./Protocol/FieldsRenderService";

export type ServiceCallback<TService> = (options?:any) => TService

export interface Services {
    fieldsRenderService: ServiceCallback<FieldsRenderService>;
}