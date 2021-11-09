import {DefaultStateUpdater} from "../../Services/DefaultImplementation/DefaultStateUpdater";
import {buildMockFieldState} from "../../Utils/TestHelpers";
import {FieldActions} from "../../Data/Actions/Field/FieldActions";

describe('DefaultStateUpdater', () => {

    it('should dispatch changeProperty when value changes', function () {
        let dispatchMock = jest.fn();
        const updater = new DefaultStateUpdater(dispatchMock);
        const state = buildMockFieldState({name: 'test', readonly: false, skipValidation: true});
        updater.update(state, {name: 'test', readonly: true, skipValidation: false});
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenCalledWith(FieldActions.changeProperty("test", "readonly", true));
        expect(dispatchMock).toHaveBeenCalledWith(FieldActions.changeProperty("test", "skipValidation", false));
    });

    it('should not update un-updatable props', function () {
        let dispatchMock = jest.fn();
        console.warn = jest.fn();
        const updater = new DefaultStateUpdater(dispatchMock);
        const state = buildMockFieldState({
            name: 'test', services: {
                fieldValidator: undefined,
                changeHandler: undefined
            }
        });
        updater.update(state, {name: 'new-name'});
        updater.update(state, {name: 'test', services: {}});
        updater.update(state, {name: 'test', changeHandler: () => ({} as any)});
        expect(dispatchMock).toBeCalledTimes(0);
        expect(console.warn).toHaveBeenCalledWith("name cannot be changed");
        expect(console.warn).toHaveBeenCalledWith("services cannot be changed");
        expect(console.warn).toHaveBeenCalledWith("changeHandler cannot be changed");
    });

    it('should not update new prop value is undefined', function () {
        let dispatchMock = jest.fn();
        console.warn = jest.fn();
        const updater = new DefaultStateUpdater(dispatchMock);
        const state = buildMockFieldState({
            name: 'test', dummyValue: 'test'
        });
        updater.update(state, {name: 'test', dummyValue: undefined});
        expect(dispatchMock).toBeCalledTimes(0);
        expect(console.warn).not.toBeCalled();
    });

})