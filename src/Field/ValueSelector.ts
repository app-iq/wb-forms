import {FieldState} from "../Data/Types/FieldState";

export type ValueSelector = (e: any , field : FieldState) => any;

export const textValueSelector: ValueSelector = (e: any) => e.target.value;

export const checkboxValueSelector : ValueSelector = (e: any) => e.target.checked;