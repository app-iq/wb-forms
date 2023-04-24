import { TextField } from './TextField';
import { PasswordField } from './PasswordField';
import { Dropdown } from './Dropdown';
import { RadioButton } from './RadioButton';
import React from 'react';
import Checkbox from './Checkbox';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultFieldsMap: Record<string, React.ComponentType<any>> = {
    text: TextField,
    password: PasswordField,
    dropdown: Dropdown,
    radio: RadioButton,
    checkbox: Checkbox,
};
