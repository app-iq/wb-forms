import {configure, mount} from "enzyme";
import {_Button} from "../../Form/Button/Button";
import {WithActionDataProps} from "../../Form/HOCs";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter : new Adapter()});

describe('Button' , () => {
    it('should use render prop to render button passing dispatch,state,serviceFactory', function () {
        let mockedRootState = {fields : {}} as any;
        let mockedDispatch = jest.fn();
        let mockedServiceFactory = {} as any;
        const actionData : WithActionDataProps = {
            rootState : mockedRootState,
            dispatch : mockedDispatch,
            serviceFactory : mockedServiceFactory
        }
        const wrapper = mount(<_Button actionData={actionData} render={(serviceFactory, dispatch, state) => {
            expect(serviceFactory).toEqual(mockedServiceFactory);
            expect(dispatch).toEqual(mockedDispatch);
            expect(state).toEqual(mockedRootState);
            return <button>ACTION</button>
        }} />);
        expect(wrapper.contains(<button>ACTION</button>)).toEqual(true);
    });
})