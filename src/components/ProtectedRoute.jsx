import { getUserDetailsState } from "@/redux/slices/userDetailsSlice"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import Image from "./ui/image"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ children }){
    
    const navigate = useNavigate() 
    
    const userProfile = useSelector(state => getUserDetailsState(state).profile)

    if(!userProfile?.credentials_approved) return (
        <div className="bg-img gap-2 w-screen min-h-screen bg-primary-100 flex flex-col justify-center items-center">
            <Image 
                src={"/assets/logo.svg"}
                style={{
                    width: '80px', height: '80px'
                }}
            />

            <h1 className="m-0 p-0 text-xl fw-800 mb-2">
                You do not have access to view this page
            </h1>

            <Button 
                onClick={() => navigate('/')}
                className={"bg-primary-600 cursor-pointer"}
            >
                Back to login
            </Button>
        </div>
    )

    return(
        <div> 
            { children }
        </div>
    )
}