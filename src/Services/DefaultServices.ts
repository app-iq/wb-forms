import {Services} from "../Context/ServiceContext";
import {DefaultFieldsRenderService} from "./DefaultImplementation/DefaultFieldsRenderService";

export const defaultServices : Services = {
    fieldsRenderService : new DefaultFieldsRenderService()
}