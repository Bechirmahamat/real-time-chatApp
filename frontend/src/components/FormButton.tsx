type props = {
    isLoading: boolean
    text: string
    type: 'submit' | 'button'
    styles: string
}
const FormButton = ({ isLoading, text, type, styles }: props) => {
    return (
        <div>
            <button
                className={`btn btn-primary  ${styles} `}
                type={type}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className='loading loading-spinner'></span>
                        <span>loading</span>
                    </>
                ) : (
                    <span>{text}</span>
                )}
            </button>
        </div>
    )
}
export default FormButton
