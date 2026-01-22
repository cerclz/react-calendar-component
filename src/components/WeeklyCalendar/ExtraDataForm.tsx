// ExtraDataForm.tsx

import { useState } from "react"

type DataForm = {
    input1: string
    input2: number
    input3: string
    input4: string
}

const EMPTY_DATA_FORM: DataForm = {
    input1: '',
    input2: 0,
    input3: '',
    input4: ''
}

export const ExtraDataForm = () => {

    const [extraFormData, setExtraFormData] = useState<DataForm>(EMPTY_DATA_FORM)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setExtraFormData(prev => ({
            ...prev,
            [name]: value
        })
        )
    }

    return (
        <div>
            <div>
                <input placeholder="input 1" type="text" name="input1" value={extraFormData.input1} onChange={onChange}></input>
            </div>
            <div>
                <input placeholder="input 2" type="number" name="input2" value={extraFormData.input2} onChange={onChange}></input>
            </div>
            <div>
                <input placeholder="input 3" type="text" name="input3" value={extraFormData.input3} onChange={onChange}></input>
            </div>
            <div>
                <input placeholder="input 4" type="text" name="input4" value={extraFormData.input4} onChange={onChange}></input>
            </div>


        </div>
    )
}