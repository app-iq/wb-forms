import { FieldValue } from '../../main';

export interface ArrayFieldChangeHandler {
    add(defaultValue: FieldValue): void;
    remove(index: number): void;
    handleChange(index: number, value: FieldValue): void;
}