import IndividualSidebar from '@/components/IndividualSidebar'
import IndividualTopBar from '@/components/IndividualTopBar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const IndividualDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-primary-100 bg-img2">
    <IndividualSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <div className="flex-1 p-6">
      <IndividualTopBar setIsOpen={setIsOpen} />
      <Outlet />
    </div>
  </div>
  )
}

export default IndividualDashboardLayout