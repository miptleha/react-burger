import { useState, useCallback } from 'react';

export function useForm(initialState, submitCb) {
    const [state, setState] = useState(initialState);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (submitCb) {
            const statePure = { ...state };
            delete statePure.wasSubmit;
            submitCb(statePure);
            setState({ ...state, wasSubmit: true });
        }
    }, [state, submitCb]);

    const onChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }, [state]);

    return { state, setState, onSubmit, onChange };
}
