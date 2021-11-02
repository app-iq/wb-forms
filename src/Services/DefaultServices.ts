import {DefaultFieldsRenderService} from "./DefaultImplementation/DefaultFieldsRenderService";
import {Services} from "./Services";

export const defaultServices: Services = {
    fieldsRenderService: () => new DefaultFieldsRenderService()
}