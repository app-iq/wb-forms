import {  useSubmit } from 'wb-forms';

interface Props {
    title?: string;
}

export function SubmitButton(props: Props) {
    const onSubmit = useSubmit({
        onValidationFailed: () => alert('validation failed')
    });
    return (
        <button
            onClick={e => {
                e.preventDefault();
                return onSubmit();
            }}
        >
            {props.title ?? 'SUBMIT'}
        </button>
    );
}
