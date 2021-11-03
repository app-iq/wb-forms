import {checkboxValueSelector, textValueSelector} from "../../Field/ValueSelector";

describe('Value Selector' , () => {
    it('should select value from value (textValueSelector)' , () =>{
        const value = textValueSelector({target : {value : 'test-value'}});
        expect(value).toEqual('test-value');
    });

    it('should select value from value (checkboxValueSelector)' , () =>{
        const value = checkboxValueSelector({target : {checked : true}});
        expect(value).toEqual(true);
    });
});