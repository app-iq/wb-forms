import React, {ReactElement} from "react";

export interface FieldGroupProps {
    children: ReactElement[] | ReactElement;
}

export class GroupContainer extends React.Component<FieldGroupProps> {
    render() {
        return <></>
    }
}