import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileImg({ profile_img, width, height, name }){

    const imgWidth = width || '40px'
    const imgHeight = height || '40px'

    return(
        <>
            {
                profile_img
                ?
                    <img src={profile_img} style={{ width: imgWidth, height: imgHeight }} />
                :
                    <Avatar className="w-10 h-10">
                        <AvatarImage />
                        <AvatarFallback className="bg-purple-100 text-purple-600 font-medium">
                            {name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>                   
            }
        </>     
    )
}