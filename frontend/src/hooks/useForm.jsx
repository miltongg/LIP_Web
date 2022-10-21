import {useState} from "react";

export const useForm = (initialState = {}, initialState2 = []) => {
    const [values, setValues] = useState(initialState)
    const [checked, setChecked] = useState(initialState2)

    const reset = () => {
        setValues(initialState);
        setChecked([])
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    const handleInputChecked = ({target}) => {

        let updateCheckedList = [...checked];
        if (target.checked && checked.length === 0) {
            updateCheckedList = [target.value];
        } else if (target.checked) {
            updateCheckedList = [...checked, target.value];
        } else {
            updateCheckedList.splice(checked.indexOf(target.value), 1)
        }

        setChecked(updateCheckedList)

        setValues({
            ...values,
            [target.name]: updateCheckedList
        })


    }

    return [values, handleInputChange, handleInputChecked, reset]
}