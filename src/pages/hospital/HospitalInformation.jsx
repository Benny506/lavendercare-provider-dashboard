import ProviderAccount from "@/components/ProviderAccount"

const HospitalInformation = () => {
  return (
    <div className="flex flex-col items-center justify-center">

        <div className="absolute top-8 right-10">
            <ProviderAccount />
        </div>


      <div className="w-full max-w-2xl bg-white rounded-2xl px-10 py-10 flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-2 text-left w-full">Fill Out Your Information</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-base">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          {/* Hospital Name */}
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalName" className="mb-1 text-sm font-medium">Hospital Name</label>
            <input id="hospitalName" type="text" placeholder="Type your Hospital name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          {/* Hospital Address */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium" htmlFor="street">Hospital Address</label>
            <label htmlFor="street" className="mb-1 text-xs font-medium">Street address</label>
            <input id="street" type="text" placeholder="Type your Street address" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white mb-2" />
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="city" className="mb-1 text-xs font-medium">City</label>
                <input id="city" type="text" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white w-full" />
              </div>
              <div className="flex-1">
                <label htmlFor="state" className="mb-1 text-xs font-medium">State/Province</label>
                <input id="state" type="text" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white w-full" />
              </div>
            </div>
            <label htmlFor="country" className="mb-1 text-xs font-medium mt-2">Country</label>
            <select id="country" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white">
              <option value="">Select</option>
              <option value="ng">Nigeria</option>
              <option value="gh">Ghana</option>
              <option value="ke">Kenya</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          {/* Hospital Email Address */}
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalEmail" className="mb-1 text-sm font-medium">Hospital Email Address</label>
            <input id="hospitalEmail" type="email" placeholder="Type your Hospital Email Address" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          {/* Official Phone Number */}
          <div className="flex flex-col text-left">
            <label htmlFor="phone" className="mb-1 text-sm font-medium">Official Phone Number</label>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white w-24">
                <option value="+234">+234</option>
                <option value="+233">+233</option>
                <option value="+254">+254</option>
                {/* Add more country codes as needed */}
              </select>
              <input id="phone" type="tel" placeholder="Type your Hospital number" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white flex-1" />
            </div>
          </div>
          {/* Website URL (optional) */}
          <div className="flex flex-col text-left">
            <label htmlFor="website" className="mb-1 text-sm font-medium">Website URL <span className="text-xs text-gray-400">(optional)</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">http://</span>
              <input id="website" type="url" placeholder="www.yoursite.com" className="border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white flex-1" />
            </div>
          </div>
          {/* Create Password */}
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Create Password</label>
            <input id="password" type="password" placeholder="Create password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col text-left">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Re-Type password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          {/* Next Button */}
          <button type="submit" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2">
            Next
            <span className="ml-2">→</span>
          </button>
          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HospitalInformation