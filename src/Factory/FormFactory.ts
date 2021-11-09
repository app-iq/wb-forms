import {ReactElement} from "react";


export interface FormFactory<TConfiguration> {
    create(configuration: TConfiguration): ReactElement;
}