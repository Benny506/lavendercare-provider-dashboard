import Image from "./image";

export default function ZeroItems({ zeroText }){
    return(
        <div
            style={{
                flex: 1, flexGrow: 1, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', flexDirection: 'column', height: '100%',
                gap: '15px'
            }}
        >
            <Image 
                src={'/assets/empty.svg'}
                style={{
                    width: '80px',
                    height: '80px',
                }}
            />

            <p className="text-base fw-500 m-0 p-0 text-center txt-15">
                { zeroText }
            </p>
        </div>
    )
}