import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ProviderAccount from "@/components/ProviderAccount";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup';
import ErrorMsg1 from "@/components/ErrorMsg1";
import { countryCodes } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import supabase from "@/database/dbInit";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

const IndividualSignUp = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prev => !prev)

  const validationSchema = Yup.object().shape({
    provider_name: Yup.string()
      .required("Full name is required"),

    countryCode: Yup.string()
      .required("Country code is required"),

    email: Yup.string()
      .required('Email is required')
      .email('Must be a valid email address'),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),

    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
  });


  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">

      <div className="hidden md:block absolute top-8 right-10">
        <ProviderAccount />
      </div>

      <div className="max-w-[340px] md:max-w-xl bg-white rounded-2xl p-4 md:px-10 pt-10 pb-4 md:mt-10 flex flex-col items-center justify-center">

        <h1 className="text-2xl font-bold mb-2 text-left w-full">Individual Provider Sign Up</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-sm">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            provider_name: '', email: '', password: '', confirmPassword: '',
            phone_number: '', countryCode: '+234'
          }}
          onSubmit={(values) => {
            const stateData = { ...values }
            delete stateData.confirmPassword
            stateData.phone_number = stateData.countryCode + stateData.phone_number

            navigate('/individual/verification', { state: { ...stateData } })
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty }) => (
            <form className="w-full flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="mb-1 text-sm font-medium">Full Name</label>
                <input
                  value={values.provider_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="provider_name"
                  type="text"
                  placeholder="Type your Full name"
                  className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base"
                />
                <ErrorMessage name="provider_name">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
              </div>
              {/* Email Address */}
              <div>
                <div className="font-semibold mb-1">Email Address</div>
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  placeholder="Type your Email Address"
                  className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base"
                />
                <ErrorMessage name="email">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
              </div>
              {/* Official Phone Number */}
              <div>
                <div className="font-semibold mb-1">Official Phone Number</div>
                <div className="flex">
                  <select
                    className="border border-[#B1B1B0] focus:outline-none rounded-l px-3 py-2 text-base bg-white"
                    value={values.countryCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="countryCode"
                  >
                    <option className="text-gray-700" disabled>Select one</option>
                    {countryCodes.map((code, i) => (
                      <option key={i} value={code.type}>{code.label}</option>
                    ))}
                  </select>
                  <input
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phone_number"
                    type="text"
                    placeholder="Type your phone number"
                    className="border-t border-b border-r border-[#B1B1B0] focus:outline-none rounded-r px-3 py-2 w-full text-base"
                  />
                </div>
                <ErrorMessage name="countryCode">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
                <ErrorMessage name="phone_number">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
              </div>
              {/* Create Password */}
              <div>
                <div className="font-semibold mb-1">Create Password</div>
                <div className="flex justify-between items-center border border-[#B1B1B0] focus:outline-none rounded w-full px-3 ">
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Create password"
                    className="py-2 text-base w-4/5"
                  />
                  {
                    passwordVisible
                      ?
                      <Eye className="cursor-pointer" onClick={togglePasswordVisibility} size={20} color="#6F3DCB" />
                      :
                      <EyeOff className="cursor-pointer" onClick={togglePasswordVisibility} size={20} color="#6F3DCB" />
                  }
                </div>
                <ErrorMessage name="password">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
              </div>
              {/* Confirm Password */}
              <div>
                <div className="font-semibold mb-1">Confirm Password</div>
                <div className="flex justify-between items-center border border-[#B1B1B0] focus:outline-none rounded w-full px-3 ">
                  <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Re-Type password"
                    className="py-2 text-base w-4/5"
                  />
                  {
                    confirmPasswordVisible
                      ?
                      <Eye className="cursor-pointer" onClick={toggleConfirmPasswordVisibility} size={20} color="#6F3DCB" />
                      :
                      <EyeOff className="cursor-pointer" onClick={toggleConfirmPasswordVisibility} size={20} color="#6F3DCB" />
                  }
                </div>
                <ErrorMessage name="confirmPassword">
                  {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                </ErrorMessage>
              </div>
              {/* Next Button */}
              <Button
                type="button"
                className="bg-primary-600 text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer"
                onClick={handleSubmit}
                style={{
                  opacity: !(isValid && dirty) ? 0.5 : 1
                }}
                disabled={!(isValid && dirty) ? true : false}
              >
                Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
              </Button>
              {/* Pagination dots */}
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <div className="block md:hidden my-4">
        <ProviderAccount className="mx-auto justify-center" />
      </div>
    </div>
  );
};

export default IndividualSignUp;