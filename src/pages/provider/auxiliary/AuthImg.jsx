import Carousel from "@/components/ui/Carousel";
import Image from "@/components/ui/image";

const imagePaths = ['assets/authImg1.png', 'assets/authImg2.png']

export default function AuthImg(){
    return (
        <div className="h-full">
            <Carousel 
                images={imagePaths}
            />
        </div>
    )
}