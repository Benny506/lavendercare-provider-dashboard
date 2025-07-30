import IndividualSidebar from '@/components/IndividualSidebar'
import IndividualTopBar from '@/components/IndividualTopBar'
import { Outlet } from 'react-router-dom'

const IndividualDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-primary-100 bg-img2">
    <IndividualSidebar />
    <div className="flex-1 p-6">
      <IndividualTopBar />
      <Outlet />
    </div>
  </div>
  )
}

export default IndividualDashboardLayout