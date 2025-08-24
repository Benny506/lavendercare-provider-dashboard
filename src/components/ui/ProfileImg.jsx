import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileImg({ profile_img, width, height, name, containerClass, textClass }){

    const imgWidth = width || '40px'
    const imgHeight = height || '40px'

    return(
        <>
            {
                profile_img
                ?
                    <img className="rounded-full" src={profile_img} style={{ width: imgWidth, height: imgHeight }} alt="profile" />
                :
                    <Avatar className={`${containerClass || 'w-10 h-10'}`}>
                        <AvatarFallback className={`bg-purple-100 text-purple-600 font-medium ${textClass || 'text-base'}`}>
                            {name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>                   
            }
        </>     
    )
}