import { ChangeEvent } from 'react'

type props = {
    containerStyle: string
    inputStyle: string
    value: string
    placeHolder: string
    type: string
    error: string | undefined
    name: string | ''
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
    containerStyle,
    inputStyle,
    value,
    placeHolder,
    type,
    name,
    error,
    onChange,
}: props) => {
    return (
        <div className={`flex flex-col ${containerStyle}`}>
            <label className='mb-1 capitalize' htmlFor={name}>
                {name}
            </label>
            <input
                placeholder={placeHolder}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                className={`input input-bordered focus:outline-offset-2 focus:outline-1  w-full  ${inputStyle}`}
            />
            {error && <p className='text-sm text-red-500'>* {error}</p>}
        </div>
    )
}
export default FormInput
