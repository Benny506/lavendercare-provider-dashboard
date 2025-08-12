import ProviderAccount from "@/components/ProviderAccount"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const HospitalInformation = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">

      <div className="hidden md:block absolute top-8 right-10">
        <ProviderAccount />
      </div>


      <div className="w-full max-w-[340px] md:max-w-xl bg-white rounded-2xl px-4 md:px-10 pt-10 pb-4 flex flex-col items-center md:mt-10">
        <h1 className="text-3xl font-bold mb-2 text-left w-full">Fill Out Your Information</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-base">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-6">
          {/* Hospital Name */}
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalName" className="mb-1 text-sm font-medium">Hospital Name</label>
            <input id="hospitalName" type="text" placeholder="Type your Hospital name" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          {/* Hospital Address */}
          <div className="flex flex-col text-left">
            <label className="mb-2 text-sm font-medium" htmlFor="street">Hospital Address</label>
            <label htmlFor="street" className="mb-1 text-xs font-medium">Street address</label>
            <input id="street" type="text" placeholder="Type your Street address" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white mb-2" />
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="city" className="mb-1 text-xs font-medium">City</label>
                <input id="city" type="text" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white w-full" />
              </div>
              <div className="flex-1">
                <label htmlFor="state" className="mb-1 text-xs font-medium">State/Province</label>
                <input id="state" type="text" className="border rounded-lg px-4 py-2 border-[#B1B1B0] focus:outline-none bg-white w-full" />
              </div>
            </div>
            <label htmlFor="country" className="mb-1 text-xs font-medium mt-2">Country</label>
            <select id="country" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white">
              <option value=""></option>
              <option value="ng">Nigeria</option>
              <option value="gh">Ghana</option>
              <option value="ke">Kenya</option>
            </select>
            {/* Tag  */}
            <span className="text-sm mt-6 text-[#669F2A] bg-[#F0F5EA] w-max py-1 px-2 font-medium rounded-2xl">New</span>
          </div>
          {/* Hospital Email Address */}
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalEmail" className="mb-1 text-sm font-medium">Hospital Email Address</label>
            <input id="hospitalEmail" type="email" placeholder="Type your Hospital Email Address" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          {/* Official Phone Number */}
          <div className="flex flex-col text-left">
            <label htmlFor="phone" className="mb-1 text-sm font-medium">Official Phone Number</label>
            <div className="flex gap-2">
              <select className="border border-[#B1B1B0] focus:outline-none rounded-lg px-2 py-2  bg-white w-24">
                <option value="+234">+234</option>
                <option value="+233">+233</option>
                <option value="+254">+254</option>
              </select>
              <input id="phone" type="tel" placeholder="Type your Hospital number" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white flex-1" />
            </div>
          </div>
          {/* Website URL (optional) */}
          <div className="flex flex-col text-left">
            <label htmlFor="website" className="mb-1 text-sm font-medium">Website URL <span className="text-xs text-gray-400 font-normal">(optional)</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">http://</span>
              <input id="website" type="url" placeholder="www.yoursite.com" className="border border-[#B1B1B0] focus:outline-none rounded-r-lg px-4 py-2  bg-white flex-1" />
            </div>
          </div>
          {/* Create Password */}
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Create Password</label>
            <input id="password" type="password" placeholder="Create password" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col text-left">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Re-Type password" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          {/* Next Button */}
          <Button type="submit" className="bg-primary-600 text-white rounded-full py-7 font-semibold text-lg mt-4 w-full flex items-center justify-center" onClick={() => Navigate('/hospital-provider/hospital-services')}>
            Next
            <span className="">→</span>
          </Button>
          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
          </div>
        </form>
      </div>
      <div className="block md:hidden my-4">
        <ProviderAccount className="mx-auto justify-center" />
      </div>
    </div>
  )
}

export default HospitalInformation