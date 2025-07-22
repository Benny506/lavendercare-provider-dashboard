import { Routes, Route } from "react-router-dom";
import App from "../App";
import Layout from "../layouts/Layout";
import LoginForm from "@/pages/provider/LoginForm";
import RecoverPassword from "@/pages/provider/RecoverPassword";
import OtpVerification from "@/pages/provider/OtpVerification";
import PasswordRecovered from "@/pages/provider/PasswordRecovered";
import CreateNewPassword from "@/pages/provider/CreateNewPassword";

import HospitalLayout from "@/layouts/HospitalLayout";
import SignUp from "@/pages/hospital/SignUp";
import EmailVerification from "@/pages/hospital/EmailVerification";
import EmailVerificationSuccess from "@/pages/hospital/EmailVerificationSuccess";
import HospitalInformation from "@/pages/hospital/HospitalInformation";
import HospitalServices from "@/pages/hospital/HospitalServices";
import HospitalDocuments from "@/pages/hospital/HospitalDocuments";
import AccountCreated from "@/pages/hospital/AccountCreated";

import IndividualLayout from "@/layouts/IndividualLayout";
import IndividualSignUp from "@/pages/individual/IndividualSignUp";
import IndividualEmailVerification from "@/pages/individual/EmailVerification";
import IndividualEmailVerificationSuccess from "@/pages/individual/EmailVerificationSuccess";
import ProfileDetails from "@/pages/individual/ProfileDetails";
import CredentialsExperience from "@/pages/individual/CredentialsExperience";
import FeesSession from "@/pages/individual/FeesSession";
import IndividualAccountCreated from "@/pages/individual/AccountCreated";

const AppRoutes = () => (
  <Routes>
    {/* Main provider layout */}
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/create-password" element={<CreateNewPassword />} />
      <Route path="/recovered-password" element={<PasswordRecovered />} />
    </Route>

    {/* Hospital layout */}
    <Route path="/hospital" element={<HospitalLayout />}>
      <Route index element={<SignUp />} /> 
      <Route path="verification" element={<EmailVerification />} /> 
      <Route path="verification-success" element={<EmailVerificationSuccess />} /> 
      <Route path="hospital-information" element={<HospitalInformation />} /> 
      <Route path="hospital-services" element={<HospitalServices />} /> 
      <Route path="hospital-documents" element={<HospitalDocuments />} /> 
      <Route path="account-created" element={<AccountCreated />} /> 
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
