import {FieldsRenderService} from "../Protocol/FieldsRenderService";
import React, {ReactElement} from "react";
import {GroupContainer} from "../../Form/GroupContainer";

export class DefaultFieldsRenderService implements FieldsRenderService {

    render(children: React.ReactElement[] | React.ReactElement): React.ReactElement | React.ReactElement[] | null {

        const groups: ReactElement[][] = [];
        const childrenArr = Array.isArray(children) ? children : [children];
        let currentGroup: ReactElement[] | ReactElement = [];
        for (let element of childrenArr) {
            if (element.type === GroupContainer) {
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                }
                if (element.props.children) {
                    groups.push(element.props.children);
                }
                currentGroup = [];
            } else {
                currentGroup.push(element);
            }
        }
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups.map((group, index) => {
            return <div key={index} data-easyform-group={index}>
                {group}
            </div>
        });
    }

}