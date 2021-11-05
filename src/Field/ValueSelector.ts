import {FieldState} from "../Data/Types/FieldState";

export type ValueSelector = (e: any, field: FieldState) => any;

export const textValueSelector: ValueSelector = (e: any) => e.target.value;

export const checkboxValueSelector: ValueSelector = (e: any) => e.target.checked;

export const filesValueSelector: ValueSelector = (e: any) => e.target.files;

export const singleFileSelector: ValueSelector = (e: any, fieldState: FieldState) => {
    const files = filesValueSelector(e, fieldState);
    return files && files.length > 0 ? files[0] : undefined;
};