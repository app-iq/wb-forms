import {useReducer} from "react";
import {easyFormReducer, easyFormReducerInitialState} from "../Data/EasyFormReducer";

export function EasyForm() {
    const [state, dispatch] = useReducer(easyFormReducer, easyFormReducerInitialState);

    return <div>
        Easy Form
    </div>
}



