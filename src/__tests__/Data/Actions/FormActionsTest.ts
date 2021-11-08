import {FormActions} from "../../../Data/Actions/Form/FormActions";
import {FormAction, FormActionType} from "../../../Data/Actions/Form/FormAction";
import {UpdatePropertyPayload} from "../../../Data/Actions/Form/Payload";

describe('FromActions', () => {

    it('should create clear action', function () {
        const action = FormActions.clearValues();
        const expected: FormAction<undefined> = {
            type: FormActionType.CLEAR,
            payload: undefined
        };
        expect(action).toEqual(expected);
    });

    it('should create change property action', function () {
        const action = FormActions.updateProperty('error', {message: 'test error'});
        const expected: FormAction<UpdatePropertyPayload> = {
            type: FormActionType.UPDATE_PROPERTY,
            payload: {
                propertyName: 'error',
                value: {message: 'test error'}
            }
        };
        expect(action).toEqual(expected);
    });

});