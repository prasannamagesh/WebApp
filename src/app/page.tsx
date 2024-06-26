// pages/index.tsx
'use client'
import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  temporaryAddress: string;
  permanentAddress: string;
  country: string;
  nativeLanguage: string;
  dob: string;
  currentOrganization: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    temporaryAddress: '',
    permanentAddress: '',
    country: '',
    nativeLanguage: '',
    dob: '',
    currentOrganization: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedFormData);
    validateField(name, value, updatedFormData);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value, formData);
  };

  const validateField = (name: string, value: any, formData: FormData) => {
    let newErrors: FormErrors = { ...errors };

    if (!value && name !== 'agreeToTerms') {
      newErrors[name] = `${name.replace(/([A-Z])/g, ' $1')} is required`;
    } else {
      switch (name) {
        case 'phoneNumber':
          if (!/^\d{10}$/.test(value)) {
            newErrors.phoneNumber = 'Phone Number must be 10 digits';
          } else {
            delete newErrors.phoneNumber;
          }
          break;

        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors.email = 'Email is invalid';
          } else {
            delete newErrors.email;
          }
          break;

        case 'agreeToTerms':
          if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
          } else {
            delete newErrors.agreeToTerms;
          }
          break;

        default:
          delete newErrors[name];
          break;
      }
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    let formIsValid = true;
    let newErrors: FormErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'agreeToTerms') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        formIsValid = false;
      }
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      <header className="w-full bg-indigo-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Hi Apoorva</h1>
        <h3 className="text-center text-1xl font-bold">All the best for Automation Learning</h3>
      </header>
      <main className="flex-grow w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Details</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Temporary Address */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="temporaryAddress">
                Temporary Address
              </label>
              <textarea
                name="temporaryAddress"
                id="temporaryAddress"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.temporaryAddress ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.temporaryAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.temporaryAddress && <p className="text-red-500 text-sm">{errors.temporaryAddress}</p>}
            </div>

            {/* Permanent Address */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="permanentAddress">
                Permanent Address
              </label>
              <textarea
                name="permanentAddress"
                id="permanentAddress"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.permanentAddress ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.permanentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
            </div>

            {/* Country/Region */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="country">
                Country/Region
              </label>
              <select
                name="country"
                id="country"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select your country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                {/* Add more options as needed */}
              </select>
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>

            {/* Native Language */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nativeLanguage">
                Native Language
              </label>
              <input
                type="text"
                name="nativeLanguage"
                id="nativeLanguage"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.nativeLanguage ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.nativeLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nativeLanguage && <p className="text-red-500 text-sm">{errors.nativeLanguage}</p>}
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            {/* Current Organization */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="currentOrganization">
                Current Organization
              </label>
              <input
                type="text"
                name="currentOrganization"
                id="currentOrganization"
                className={`text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${errors.currentOrganization ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.currentOrganization}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.currentOrganization && <p className="text-red-500 text-sm">{errors.currentOrganization}</p>}
            </div>

            {/* Agree to Terms */}
            <div className="mb-4">
              <label className="block text-gray-700">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mr-2"
                />
                I agree to the terms and conditions
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
