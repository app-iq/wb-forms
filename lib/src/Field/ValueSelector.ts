import {FieldValue} from '../Data/State';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueSelector = (e: any) => FieldValue;

export const textValueSelector: ValueSelector = e => e.target.value;

export const checkboxValueSelector: ValueSelector = e => e.target.checked;

export const filesValueSelector: ValueSelector = e => e.target.files;

export const singleFileSelector: ValueSelector = e => {
    const files = filesValueSelector(e);
    return files && files.length > 0 ? files[0] : undefined;
};
