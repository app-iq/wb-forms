import {buildFieldWithInitialState} from "../../Field/Helpers";
import {easyFormDefaults} from "../../Defaults/EasyFormDefaults";

describe('Helpers', () => {

    it('should build field with initial state using props', () => {
        const valueSelector = jest.fn();
        const field = buildFieldWithInitialState({
            name: 'test', valueSelector: valueSelector, initialValue: 'test-value'
        }, easyFormDefaults);
        expect(field).toEqual({
            name: 'test',
            value: 'test-value',
            valueSelector: valueSelector
        });
    });

    it('should build field with initial state using defaults', function () {
        const field = buildFieldWithInitialState({name: 'test'}, easyFormDefaults);
        expect(field).toEqual({
            name: 'test',
            value: easyFormDefaults.fieldValue,
            valueSelector: easyFormDefaults.valueSelector
        });
    });

});