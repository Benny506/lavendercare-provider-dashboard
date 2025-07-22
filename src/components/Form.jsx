const Form = ({formName, formDescription}) => {
  return (
    <div className=" py-5 w-full max-w-md flex flex-col items-center">

        <h1 className="text-3xl font-bold mb-2 text-center">{formName}</h1>
        <p className="text-center text-[#565655] text-sm">{formDescription}</p>

      </div>
  )
}

export default Form