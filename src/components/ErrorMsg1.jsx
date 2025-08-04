export default function ErrorMsg1({ position, errorMsg }){
    return(
        <p 
            style={{
                textAlign: position || 'left'
            }}
            className="m-0 p-0 font-family-GT fw-600 txt-15 my-3 txt-EB1C25"
        >
            { errorMsg }
        </p>
    )
}