import {StateUpdater} from "../Protocol/StateUpdater";
import {FieldProps} from "../../Field/FieldProps";
import {FieldState} from "../../Data/Types/FieldState";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";
import {DispatchFunction} from "../../Form/DispatchContext";

export class DefaultStateUpdater implements StateUpdater {
    private readonly dispatch: DispatchFunction;

    constructor(dispatch: DispatchFunction) {
        this.dispatch = dispatch;
    }

    update(field: FieldState, props: FieldProps): void {
        const keys = Object.keys(props);
        keys.forEach((key) => {
            const stateValue = field[key];
            if (stateValue === undefined) {
                return;
            }
            const propsValue = props[key as keyof FieldProps];
            const unUpdatableProperties: (keyof FieldState)[] = ["name", "services"]
            if (unUpdatableProperties.includes(key) && propsValue !== stateValue) {
                console.warn(`${key} cannot be changed`);
                return;
            }
            if (propsValue !== stateValue && propsValue !== undefined) {
                this.dispatch(FieldActions.changeProperty(props.name, key, propsValue));
            }
        });

    }

}