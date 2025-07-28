import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

const UploadCredential = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            {/* Background Image Container */}
            <div className="bg-img rounded-xl p-4 w-full max-w-sm shadow-xl relative">
                <div className="bg-white rounded-xl p-6 w-full relative flex flex-col gap-1">

                    {/* Back Icon */}
                    <div className="flex items-center gap-2 text-primary-600 cursor-pointer mb-4">
                        <Icon icon="material-symbols:arrow-back" className="text-xl" />
                        <span className="font-semibold text-sm">Back</span>
                    </div>

                    <div>
                        {/* Upload Credential Title */}
                        <h2 className="text-lg font-bold mb-4">Upload Credential Document</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                            <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                            <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                            <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                            <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
                        </div>

                        <Button className="bg-primary-600 text-white rounded-full py-3 font-semibold text-md mt-4 transition w-full flex items-center justify-center gap-2">
                            Submit
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UploadCredential