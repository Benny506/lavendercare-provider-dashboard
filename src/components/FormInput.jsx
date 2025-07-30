const FormInput = ({ type, placeholder, label, id }) => {
    return (
        <div className="flex flex-col text-left">
            <label htmlFor={id || type} className="mb-1 text-sm font-light">{label}</label>
            <input id={id || type} type={type} placeholder={placeholder} className="border rounded-lg px-4 py-2 focus:outline-none bg-white" />
        </div>
    )
}

export default FormInput

