import {defaultInitializeFunc} from "../../Field/Helpers";
import {formDefaults} from "../../Defaults/FormDefaults";

describe('Helpers', () => {

    it('should build field with initial state using props', () => {
        const valueSelector = jest.fn();
        const field = defaultInitializeFunc({
            name: 'test', valueSelector: valueSelector, initialValue: 'test-value'
        }, formDefaults);
        expect(field).toEqual({
            name: 'test',
            value: 'test-value',
            valueSelector: valueSelector
        });
    });

    it('should build field with initial state using defaults', function () {
        const field = defaultInitializeFunc({name: 'test'}, formDefaults);
        expect(field).toEqual({
            name: 'test',
            value: formDefaults.fieldValue,
            valueSelector: formDefaults.valueSelector
        });
    });

});