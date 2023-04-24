import { Form } from 'wb-forms';
import { ArrayTextField, ArrayKeyValueField } from '../../Components/ArrayField';

export function ArrayFieldExample() {
    
    return <Form fieldConfiguration={{
                     items: {
                         validationRules: '^\\d{3,30}$'
                     }
                 }}>
        <h1>Array Field Example</h1>
        <hr/>

        <ArrayTextField name='items' />

        <hr />

        <ArrayKeyValueField name='pairs' />

    </Form>;
}
