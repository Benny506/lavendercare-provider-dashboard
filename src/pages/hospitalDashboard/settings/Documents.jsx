import React from 'react'
import TopDivider from "@/components/TopDivider"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { Upload } from 'lucide-react'
import UploadCredential from './UploadCredential'

const documents = [
    {
        name: "Registration Certificate",
        status: "Uploaded",
        reSubmissionDate: "2025-07-06",
        approval: "Approved",
    },
    {
        name: "Accreditation Letter",
        status: "Missing",
        reSubmissionDate: "-",
        approval: "Rejected",
    },
    {
        name: "Government Approval",
        status: "Uploaded",
        reSubmissionDate: "2025-07-04",
        approval: "Under Review",
    },
    {
        name: "Insurance Proof (optional)",
        status: "Uploaded",
        reSubmissionDate: "2025-07-02",
        approval: "Approved",
    },
]

const STATUS_STYLES = {
    Uploaded: { bg: 'bg-[#F0F5EA]', text: 'text-[#5D9126]' },
    Missing: { bg: 'bg-[#FCE8E7]', text: 'text-[#E41C11]' },
}
const APPROVAL_STYLES = {
    Approved: { bg: 'bg-[#F0F5EA]', text: 'text-[#5D9126]' },
    Rejected: { bg: 'bg-[#FCE8E7]', text: 'text-[#E41C11]' },
    'Under Review': { bg: 'bg-[#FFF0E6]', text: 'text-[#B54C00]' },
}

function getStatusBadge(status) {
    const { bg, text } = STATUS_STYLES[status] || STATUS_STYLES.Missing
    return (
        <span className={`${bg} rounded-2xl px-3 py-1 ${text} text-sm font-medium`}>
            {status}
        </span>
    )
}

function getApprovalBadge(approval) {
    const { bg, text } = APPROVAL_STYLES[approval] || APPROVAL_STYLES['Under Review']
    return (
        <span className={`${bg} rounded-2xl px-3 py-1 ${text} text-sm font-medium`}>
            {approval}
        </span>
    )
}

function getActionButtons(status) {
    if (status === "Missing") {
        return (
            <Button className="bg-primary-600 text-white px-4 py-1 text-sm rounded">
                Upload
            </Button>
        )
    }
    if (status === "Uploaded") {
        return (
            <div className="flex items-center gap1">
                <Button className="p-2 bg-white text-black">
                    <Icon icon="fa7-regular:edit" width={20} height={20} />
                </Button>
                <Button className="p-2 bg-white text-black">
                    <Icon icon="mdi:eye-outline" width={20} height={20} />
                </Button>
            </div>
        )
    }
    return null
}

const Documents = () => (
    <div>
        <TopDivider />
        <h2 className="font-extrabold text-xl mb-3">Documents & Accreditation</h2>
        <div className="w-full bg-white rounded-2xl p-4">
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-5 gap-4 items-center font-semibold text-sm text-gray-600 border-b pb-2">
                <div>Document Name</div>
                <div>Status</div>
                <div>ReSubmission Date</div>
                <div>Approval</div>
                <div>Action</div>
            </div>

            {/* Data Rows */}
            {documents.map((doc, idx) => (
                <div
                    key={idx}
                    className="hidden sm:grid grid-cols-5 gap-4 items-center text-sm text-gray-700 py-3 border-b last:border-b-0"
                >
                    <div>{doc.name}</div>
                    <div>{getStatusBadge(doc.status)}</div>
                    <div>{doc.reSubmissionDate}</div>
                    <div>{getApprovalBadge(doc.approval)}</div>
                    <div>{getActionButtons(doc.status)}</div>
                </div>
            ))}

            {documents.map((doc, idx) => (
                <div key={idx} className="flex flex-col border-b last:border-b-0 py-4 gap-4 px-2 sm:hidden">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Document Name:</span>
                        <p className='text-wrap text-end'>{doc.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Status:</span>
                        <p>{getStatusBadge(doc.status)}</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">ReSubmission Date:</span>
                        <p>{doc.reSubmissionDate}</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Approval:</span>
                        <p>{getApprovalBadge(doc.approval)}</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Action:</span>
                        <p>{getActionButtons(doc.status)}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* <UploadCredential /> */}
    </div>
)

export default Documents
