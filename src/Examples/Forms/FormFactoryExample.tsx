import {DefaultFormFactory} from '../../Factory/DefaultFormFactory';
import {RadioProps} from '../../DefaultComponents/RadioButton';
import {defaultFieldsMap} from '../../DefaultComponents/DefaultFieldsMap';

export function FormFactoryExample() {
    const factory = new DefaultFormFactory(defaultFieldsMap);

    return factory.create({
        fields: {
            comment: {
                type: 'text',
                options: {name: 'comment'}
            },
            rating: {
                type: 'radio',
                options: {name: 'radio', options: ['Bad', 'Normal', 'Great']} as RadioProps
            }
        },
        formOptions: {
            serviceOptions: {
                submit: {url: 'http://localhost:8080/review'}
            }
        },
        extraOptions: {}
    });
}
