import {FormState} from "../../Types/RootState";

export interface UpdatePropertyPayload {
    propertyName : keyof FormState;
    value : string;
}