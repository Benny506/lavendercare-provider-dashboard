import TopDivider from "@/components/TopDivider"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

const EditHospitalInformation = () => {
    return (
        <div>
            <TopDivider />

            <div>
                <h2 className="font-extrabold text-xl mb-3">General Settings</h2>

                <div className="w-full bg-white rounded-2xl p-3">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-3">
                            <img src="/assets/hospital-logo.svg" alt="" />
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">Grace Maternity Center</p>
                                    <span className="bg-[#FCE8E7] text-[#CF190F] rounded-3xl px-2">Unverified</span>
                                </div>
                                <Button className="bg-transparent border-[#6F3DCB] border text-[#6F3DCB] max-w-max">
                                    Upload Logo
                                </Button>
                            </div>
                        </div>

                        <Button className="bg-[#669F2A] text-white rounded-3xl">
                            Verify Account
                        </Button>
                    </div>

                    <form className="w-xl flex flex-col gap-4 p-4">
                    {/* Hospital Name */}
                    <div>
                        <label className="mb-1 text-sm font-medium">Hospital Name</label>
                        <input type="text" placeholder="What is the doctor Full Name" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                    </div>
                    {/* Email Address */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Official Email</div>
                        <input type="email" placeholder="What is the doctor Email Address" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base " />
                    </div>
                    {/* Official Phone Number */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Phone Number</div>
                        <div className="flex">
                            <select className="border border-[#B1B1B0] focus:outline-none rounded-l px-1 py-2 text-base bg-white" defaultValue="+234">
                                <option value="+234">+234</option>
                                <option value="+234">+234</option>
                                <option value="+234">+234</option>
                            </select>
                            <input type="text"  placeholder="81234232323" className="border-t border-b border-r border-[#B1B1B0] focus:outline-none rounded-r px-3 py-2 w-full text-base" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="speciality" className=" text-sm font-medium">Location</label>
                    <input type="search" name="" id="" className="border border-[#B1B1B0] focus:outline-none rounded-lg px- py-2 bg-white" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="language">Defaut Language</label>
                        <select name="" id="" className="border border-[#B1B1B0] focus:outline-none rounded-lg px- py-2 bg-white">
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="currency">
                            Currency Format
                        </label>
                        <select name="" id="" className="border border-[#B1B1B0] focus:outline-none rounded-lg px- py-2 bg-white">
                            <option value="naira">Naira</option>
                            <option value="dollar">Dollar</option>
                            <option value="euro">Euro</option>
                        </select>
                    </div>


                    <div className='flex items-center justify-between relative max-w-1/3'>
                        <Button type="button" className="bg-[#D2C3EF] text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer">
                            Save Changes
                        </Button>
                    </div>
                </form>
                </div>

            </div>
        </div>
    )
}

export default EditHospitalInformation