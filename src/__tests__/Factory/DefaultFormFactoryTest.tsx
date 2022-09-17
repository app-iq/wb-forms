import {DefaultFormFactory} from '../../Factory/DefaultFormFactory';
import {FormOptions} from '../../Factory/DefaultFormFactoryConfiguration';
import React, {ComponentType} from 'react';
import {FieldProps} from '../../Field/FieldProps';
import {render, screen} from '@testing-library/react';


const DummyComponent1 = ({name}: FieldProps) => <div>DummyField 1 : {name}</div>;
const DummyComponent2 = ({name}: FieldProps) => <div>DummyField 2 : {name}</div>;

describe('DefaultFormFactory', () => {
    it('should render form from configuration', async function () {
        const fieldTypeMap: Record<string, ComponentType<FieldProps>> = {
            'text_type_1': DummyComponent1,
            'text_type_2': DummyComponent2
        };
        const factory = new DefaultFormFactory(fieldTypeMap);
        const configuration: FormOptions = {
            fields: {
                username: {type: 'text_type_1', options: {name: 'username'}},
                password: {type: 'text_type_2', options: {name: 'password'}},
            },
            formOptions: {},
            extraOptions: {}
        };
        render(factory.create(configuration));

        const usernameField = await screen.findByText('DummyField 1 : username');
        expect(usernameField).toBeTruthy();
        const passwordField = await screen.findByText('DummyField 2 : password');
        expect(passwordField).toBeTruthy();
        const button = await screen.findByText('SUBMIT');
        expect(button).toBeTruthy();
    });
});
