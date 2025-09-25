export default function Image({ src, alt, className, onClick, style }){

    const handleImgClick = (e) => onClick && onClick(e)

    return(
        <img 
            src={`${src}`}
            alt={alt}
            className={className}
            onClick={handleImgClick}
            style={style}
        />
    )
}