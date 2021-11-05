import {SubmitAction, SubmitActionType} from "./SubmitAction";

export class SubmitActions {

    public static submitStart(): SubmitAction<undefined> {
        return {
            type: SubmitActionType.SUBMIT_START,
            payload: undefined
        };
    }

    public static submitFail(error: any): SubmitAction<any> {
        return {
            type: SubmitActionType.SUBMIT_FAIL,
            payload: error
        };
    }

    public static submitSucceed(response: any): SubmitAction<any> {
        return {
            type: SubmitActionType.SUBMIT_SUCCESS,
            payload: response
        };
    }

    public static submitComplete(): SubmitAction<undefined> {
        return {
            type: SubmitActionType.SUBMIT_COMPLETE,
            payload: undefined
        };
    }

}