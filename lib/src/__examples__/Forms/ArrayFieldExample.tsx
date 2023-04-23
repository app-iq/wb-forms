import {Form} from '../../Form/Form';
import { ArrayKeyValueField, ArrayTextField } from '../../DefaultComponents/ArrayField';

export function ArrayFieldExample() {
    
    return <Form fieldConfiguration={{
                     password: {
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
