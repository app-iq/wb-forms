import {ReactElement} from "react";

export interface FieldsRenderService {
    render(children: ReactElement[] | ReactElement): ReactElement | ReactElement[] | null;
}