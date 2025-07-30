import TopDivider from "@/components/TopDivider"
import { Button } from "@/components/ui/button"
import Image from "@/components/ui/image"
import { Icon } from "@iconify/react"

const DoctorCredentials = () => {
    return (
        <div>
            <TopDivider />
            <div className="bg-white w-full flex items-start justify-between rounded-2xl">
                <div className="w-lg bg-white rounded-2xl px-10 pt-6 pb-4 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-2 text-left w-full">Add Doctor</h1>
                    <p className="mb-6 text-left text-gray-700 w-full text-sm">
                        Credentials </p>
                    <form action="" className="w-full flex flex-col gap-4">
                        <div>
                            <label className="mb-1 text-sm font-medium">Licence No</label>
                            <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>

                        <div>
                            <div className="font-semibold mb-1">Upload Credential Document</div>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                                {/* <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" /> */}
                                <Image src="/assets/cloud-add.svg" alt="Upload Icon" className="" />
                                <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                                <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                                <label className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                                    Browse File
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 text-sm font-medium">Bio</label>
                            <input type="text" placeholder="Short description ~300 character" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>

                        <div className='flex items-center justify-between relative' onClick={() => Navigate('/hospital/dashboard/doctor-credential')}>
                            <Button type="button" className="bg-primary-600 text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer">
                                Next
                            </Button>
                            <Icon icon="mdi:arrow-right" style={{ color: "white" }} className="absolute text-xl right-43 mt-4.5" />
                        </div>
                    </form>

                    <div className="flex items-center justify-between w-full mt-6 px-4">
                        <p className="text-primary-500 font-extrabold">Previous</p>
                        {/* Pagination dots */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                        </div>
                    </div>
                </div>
                <Button className="rounded-3xl px-4 py-6 bg-primary-600 font-extrabold text-white m-6 cursor-pointer">Invite Doctor via email</Button>
            </div>
        </div>
    )
}

export default DoctorCredentials