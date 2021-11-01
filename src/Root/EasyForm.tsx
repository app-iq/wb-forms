import React, {ReactElement, useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducer";

export function EasyForm({children}: { children: ReactElement[] | ReactElement }) {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    children = Array.isArray(children) ? children : [children];

    return <div>
        {
            children.map(c => {
                const Component = c.type;
                return <Component key={c.props.name} {...c.props} />
            })
        }
    </div>
}



