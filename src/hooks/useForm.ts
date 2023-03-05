import { useState, useCallback, FormEventHandler, FormEvent, ChangeEvent } from 'react';

export function useForm<T extends {wasSubmit?: boolean}>(initialState: T, submitCb: (e: T) => void) {
    const [state, setState] = useState(initialState);

    const onSubmit = useCallback<FormEventHandler>((e: FormEvent) => {
        e.preventDefault();
        if (submitCb) {
            const statePure = { ...state };
            delete statePure.wasSubmit;
            submitCb(statePure);
            setState({ ...state, wasSubmit: true });
        }
    }, [state, submitCb]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }, [state]);

    return { state, setState, onSubmit, onChange };
}
