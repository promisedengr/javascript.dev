import { useState } from 'react';

function useInput(val: string) {

    const [value, setValue] = useState(val);

    const handleChange = (text: string) => {
        setValue(text)
    }

    const handleClear = () => {
        setValue('')
    }

    return {
        value,
        handleClear,
        handleChange
    }
}

export { useInput }