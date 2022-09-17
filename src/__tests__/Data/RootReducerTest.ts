import {buildRootReducer, RootReducer} from '../../Data/RootReducer';
import {State} from '../../Data/State';
import {SetupActions} from '../../Data/Setup/SetupActions';
import {buildMockFieldState} from '../../Utils/TestHelpers';
import {FormActions} from '../../Data/Form/FormActions';
import {SubmitActions} from '../../Data/Form/SubmitActions';
import {FieldActions} from '../../Data/Field/FieldActions';
import {Action} from '../../Data/Action';

describe('RootReducer', () => {
    it('should build root reducer without extra passed reducers', function () {
        const rootReducer = buildRootReducer();
        const rootState: State = {
            fields: {
                name: buildMockFieldState({name: 'name'})
            },
            form: {loading: false}
        };

        let newState = rootReducer(rootState, SetupActions.initializeField('username', buildMockFieldState({name: 'username'})));
        expect(newState).not.toEqual(rootState);
        newState = rootReducer(rootState, FormActions.setCustomValue('loading', true));
        expect(newState).not.toEqual(rootState);
        newState = rootReducer(rootState, SubmitActions.submitSucceed('succeed'));
        expect(newState).not.toEqual(rootState);
        newState = rootReducer(rootState, FieldActions.changeValue('name', 'ali'));
        expect(newState).not.toEqual(rootState);
        newState = rootReducer(rootState, {type: 'UNKNOWN_ACTION', payload: undefined});
        expect(newState).toEqual(rootState);
    });


    it('should build root reducer with extra passed reducers', function () {

        const reducer1: RootReducer<Action<unknown, unknown>> = (state, action) => {
            if (action.type === 'TEST-REDUCER-1') {
                return ({...state, form: {...state.form, response: 'TEST REDUCER 1'}});
            }
            return state;
        };
        const reducer2: RootReducer<Action<unknown, unknown>> = (state, action) => {
            if (action.type === 'TEST-REDUCER-2') {
                return ({...state, form: {...state.form, response: 'TEST REDUCER 2'}});
            }
            return state;
        };
        const rootReducer = buildRootReducer([reducer1, reducer2]);
        const rootState: State = {
            fields: {
                name: buildMockFieldState({name: 'name'})
            },
            form: {loading: false}
        };

        let newState = rootReducer(rootState, {type: 'TEST-REDUCER-1', payload: undefined});
        expect(newState).toEqual({...rootState, form: {...rootState.form, response: 'TEST REDUCER 1'}});
        newState = rootReducer(rootState, {type: 'TEST-REDUCER-2', payload: undefined});
        expect(newState).toEqual({...rootState, form: {...rootState.form, response: 'TEST REDUCER 2'}});
    });

    it('should return same state when reducer returns undefined', function () {
        const rootReducer = buildRootReducer();
        const rootState: State = {
            fields: {
                name: buildMockFieldState({name: 'name'})
            },
            form: {loading: false}
        };
        const unknownAction: Action<unknown, unknown> = {type: 'UNKNOWN_ACTION', payload: 'UNKNOWN_PAYLOAD'};
        const newState = rootReducer(rootState, unknownAction);
        expect(newState).toEqual(rootState);
    });


});
