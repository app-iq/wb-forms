export type ValueSelector = (e: any) => any;

export const textValueSelector = (e: any) => e.target.value;

export const checkboxValueSelector = (e: any) => e.target.checked;