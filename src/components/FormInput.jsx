const FormInput = ({ 
    type, placeholder="", label, id, icon, 
    name, onChange=()=>{}, onBlur=()=>{}, 
    value 
}) => {
    return (
        <div className="flex flex-col text-left">
            <label htmlFor={id || type} className="mb-1 text-sm font-light">{label}</label>
            <div className="flex align-items-center border px-4 justify-between rounded-lg bg-white">
                <input 
                    id={id || type} 
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    type={type} 
                    placeholder={placeholder} 
                    className="py-2 focus:outline-none" 
                    style={{
                        width: icon ? '85%' : '100%'
                    }}
                />
                {
                    icon &&
                        <div
                            style={{
                                width: '10%' 
                            }}
                            className="flex items-center justify-end"
                        >
                            { icon }
                        </div> 
                }
            </div>
        </div>
    )
}

export default FormInput

