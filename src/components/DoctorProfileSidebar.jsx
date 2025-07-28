import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Icon = ({ icon, className = "w-4 h-4" }) => {
  return (
    <iconify-icon
      icon={icon}
      class={className}
      style={{ display: 'inline-block' }}
    />
  );
};

const DoctorProfileSidebar = ({ doctor, onAssignCaseload, onDelete }) => {
  return (
    <div className="bg-white max-h-max p-6 rounded-l-lg shadow-sm border border-gray-200 w-64">
      {/* Profile Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src="/assets/Avatar.svg" alt={doctor.name} className={"w-full h-full object-contain"} />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        {/* <div className=" bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/api/placeholder/48/48" 
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
          
        </div> */}
        <div>
          <h2 className="font-semibold text-gray-900">{doctor.name}</h2>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
        </div>
      </div>

      {/* Assign Caseload Button */}
      <div className="w-full flex justify-start items-start">
        <Button
          onClick={onAssignCaseload}
          className="bg-primary-600 text-white py-2 rounded-full text-sm font-medium mb-6 transition-colors"
        >
          Assign Caseload
        </Button>
      </div>

      {/* About Section */}
      <div className="mb-6 border-b border-gray-400 pb-5">
        <h3 className="font-medium text-gray-900 mb-3">About</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="ph:phone" className="w-4 h-4" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="ph:envelope" className="w-4 h-4" />
            <span>{doctor.email}</span>
          </div>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="mb-6 border-b border-gray-400 pb-5">
        <h3 className="font-medium text-gray-900 mb-2">Credentials</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">License No</span> {doctor.licenseNo}
        </p>
      </div>

      {/* Availability Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Availability</h3>
          <Icon icon="ph:caret-right" className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex w-full justify-start">
        <Button
          className="bg-red-500 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
        >
          Delete
        </Button>
      </div>
    </div>

  )
}

export default DoctorProfileSidebar