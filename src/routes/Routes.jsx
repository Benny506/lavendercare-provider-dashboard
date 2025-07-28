import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import HospitalLayout from "@/layouts/HospitalLayout";
import IndividualLayout from "@/layouts/IndividualLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Login from "@/pages/provider/Login";
import LoginForm from "@/pages/provider/LoginForm";
import RecoverPassword from "@/pages/provider/RecoverPassword";
import OtpVerification from "@/pages/provider/OtpVerification";
import CreateNewPassword from "@/pages/provider/CreateNewPassword";
import PasswordRecovered from "@/pages/provider/PasswordRecovered";

import SignUp from "@/pages/hospitalProvider/SignUp";
import EmailVerification from "@/pages/hospitalProvider/EmailVerification";
import EmailVerificationSuccess from "@/pages/hospitalProvider/EmailVerificationSuccess";
import HospitalInformation from "@/pages/hospitalProvider/HospitalInformation";
import HospitalServices from "@/pages/hospitalProvider/HospitalServices";
import HospitalDocuments from "@/pages/hospitalProvider/HospitalDocuments";
import AccountCreated from "@/pages/hospitalProvider/AccountCreated";

import IndividualSignUp from "@/pages/individualProvider/IndividualSignUp";
import IndividualEmailVerification from "@/pages/individualProvider/EmailVerification";
import IndividualEmailVerificationSuccess from "@/pages/individualProvider/EmailVerificationSuccess";
import ProfileDetails from "@/pages/individualProvider/ProfileDetails";
import CredentialsExperience from "@/pages/individualProvider/CredentialsExperience";
import FeesSession from "@/pages/individualProvider/FeesSession";
import IndividualAccountCreated from "@/pages/individualProvider/AccountCreated";

import Dashboard from "@/pages/hospitalDashboard/dashboard/Dashboard";
import AddDoctor from "@/pages/hospitalDashboard/dashboard/AddDoctor";
import DoctorCredentials from "@/pages/hospitalDashboard/dashboard/DoctorCredentials";
import DoctorAvailability from "@/pages/hospitalDashboard/dashboard/DoctorAvailability";

import AllDoctors from "@/pages/hospitalDashboard/doctors/AllDoctors";
import DoctorProfile from "@/pages/hospitalDashboard/doctors/DoctorProfile";
import DoctorSchedule from "@/pages/hospitalDashboard/doctors/DoctorSchedule";

import AllConsultations from "@/pages/hospitalDashboard/consultations/AllConsultations";
import AllSchedules from "@/pages/hospitalDashboard/schedules/AllSchedules";
import AllCaseload from "@/pages/hospitalDashboard/caseload/AllCaseload";

import Insights from "@/pages/hospitalDashboard/analytics/Insights";
import Settings from "@/pages/hospitalDashboard/settings/Settings";
import GeneralSettings from "@/pages/hospitalDashboard/settings/GeneralSettings";
import EditHospitalInformation from "@/pages/hospitalDashboard/settings/EditHospitalInformation";
import Notifications from "@/pages/hospitalDashboard/settings/Notifications";
import Documents from "@/pages/hospitalDashboard/settings/Documents";

const AppRoutes = () => (
  <Routes>
    {/* Main provider layout */}
    <Route element={<Layout />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/create-password" element={<CreateNewPassword />} />
      <Route path="/recovered-password" element={<PasswordRecovered />} />
    </Route>

    {/* HospitalProvider layout */}
    <Route path="/hospital-provider" element={<HospitalLayout />}>
      <Route index element={<SignUp />} />
      <Route path="verification" element={<EmailVerification />} />
      <Route path="verification-success" element={<EmailVerificationSuccess />} />
      <Route path="hospital-information" element={<HospitalInformation />} />
      <Route path="hospital-services" element={<HospitalServices />} />
      <Route path="hospital-documents" element={<HospitalDocuments />} />
      <Route path="account-created" element={<AccountCreated />} />
    </Route>

    /* Hospital Dashboard */
    <Route path="/hospital/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="add-doctor" element={<AddDoctor />} />
      <Route path="doctor-credential" element={<DoctorCredentials />} />
      <Route path="doctor-availability" element={<DoctorAvailability />} />
    </Route>

    <Route path="/hospital/dashboard/doctor" element={<DashboardLayout />} >
      <Route path="all-doctors" element={<AllDoctors />} />
      <Route path="doctor-profile" element={<DoctorProfile />} />
      <Route path="doctor-profile/schedule" element={<DoctorSchedule />} />
    </Route>

    <Route path="/hospital/dashboard/consultation" element={<DashboardLayout />} >
      <Route index element={<AllConsultations />} />
    </Route>

    <Route path="/hospital/dashboard/schedules" element={<DashboardLayout />} >
      <Route index element={<AllSchedules />} />
    </Route>

    <Route path="/hospital/dashboard/caseload" element={<DashboardLayout />} >
      <Route index element={<AllCaseload />} />
    </Route>

    <Route path="/hospital/dashboard/analytics" element={<DashboardLayout />} >
      <Route index element={<Insights />} />
    </Route>

    <Route path="/hospital/dashboard/settings" element={<DashboardLayout />} >
      <Route index element={<Settings />} />
      <Route path="general-settings" element={<GeneralSettings />} />
      <Route path="general-settings/hospital-information" element={<EditHospitalInformation />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="documents" element={<Documents />} />
    </Route>

    {/* Individual layout */}
    <Route path="/individual" element={<IndividualLayout />}>
      <Route index element={<IndividualSignUp />} />
      <Route path="verification" element={<IndividualEmailVerification />} />
      <Route path="verification-success" element={<IndividualEmailVerificationSuccess />} />
      <Route path="profile-details" element={<ProfileDetails />} />
      <Route path="credentials" element={<CredentialsExperience />} />
      <Route path="fee-session" element={<FeesSession />} />
      <Route path="account-created" element={<IndividualAccountCreated />} />
    </Route>

  </Routes>
);

export default AppRoutes;
