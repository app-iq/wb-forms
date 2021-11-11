import {DefaultFormFactory} from "../../Factory/DefaultFormFactory";
import {FieldTypeMap, FormConfiguration} from "../../Factory/DefaultFormFactoryConfiguration";
import {configure, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({adapter: new Adapter()});

const DummyComponent1 = ({name}: any) => <div>DummyField 1 : {name}</div>;
const DummyComponent2 = ({name}: any) => <div>DummyField 2 : {name}</div>;

describe('DefaultFormFactory', () => {
    it('should render form from configuration', function () {
        const fieldTypeMap: FieldTypeMap = {
            'text_type_1': DummyComponent1,
            'text_type_2': DummyComponent2
        }
        const factory = new DefaultFormFactory(fieldTypeMap);
        const configuration: FormConfiguration = {
            fieldConfig: {
                username: {type: 'text_type_1', fieldConfig: {name: 'username'}},
                password: {type: 'text_type_2', fieldConfig: {name: 'password'}},
            },
            formConfig: {}
        }
        const wrapper = mount(factory.create(configuration));
        expect(wrapper.find('Form')).not.toBeFalsy();
        expect(wrapper.find('Form').children()).toHaveLength(3);
        expect(wrapper.find('DummyComponent1')).not.toBeFalsy();
        expect(wrapper.find('DummyComponent1').text()).toEqual("DummyField 1 : username");
        expect(wrapper.find('DummyComponent2')).not.toBeFalsy();
        expect(wrapper.find('DummyComponent2').text()).toEqual("DummyField 2 : password");
        expect(wrapper.find('Button')).not.toBeFalsy();
        expect(wrapper.find('button').text()).toEqual("SUBMIT");
    });
});