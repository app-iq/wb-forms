import {EasyFormAction} from "./EasyFormAction";

export enum ConfigurationActionType {
    UPDATE_FIELD = "UPDATE_FIELD_CONFIGURATION",
    UPDATE_FORM = "UPDATE_FORM_CONFIGURATION"
}


export interface ConfigurationAction<TPayload> extends EasyFormAction<ConfigurationActionType, TPayload> {
}
