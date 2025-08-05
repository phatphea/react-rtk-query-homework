import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router'; // Added useNavigate
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterMutation } from '../../features/auth/authSlide';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Define Zod schema for validation
const registerSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profilePicture: z.any()
    .optional()
    .refine(file => {
      if (file && file.length > 0) {
        return file[0].size <= 5000000; // Max 5MB
      }
      return true;
    }, `Max image size is 5MB.`)
    .refine(file => {
      if (file && file.length > 0) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file[0].type);
      }
      return true;
    }, `Only JPEG, PNG, or GIF images are allowed.`),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const fileInputRef = useRef(null); // Ref to clear file input
  const navigate = useNavigate(); // Initialize navigate hook
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview

  // Handle form validation errors with toasts
  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message, { position: "top-right", autoClose: 3000 });
    }
    if (errors.email) {
      toast.error(errors.email.message, { position: "top-right", autoClose: 3000 });
    }
    if (errors.password) {
      toast.error(errors.password.message, { position: "top-right", autoClose: 3000 });
    }
    if (errors.profilePicture) {
      toast.error(errors.profilePicture.message, { position: "top-right", autoClose: 3000 });
    }
  }, [errors]);

  // Handle API response
  useEffect(() => {
    if (error) {
      toast.error(`Registration failed: ${error.data?.message || "An error occurred"}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [error]);

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection for preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Revoke previous URL to prevent memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // Set new preview URL
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

    const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.profilePicture && data.profilePicture.length > 0
          ? "https://picsum.photos/800" // Placeholder; replace with real upload service
          : "https://picsum.photos/800",
      };

      const response = await registerUser(payload).unwrap();
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log("Registration successful:", response);

      // Reset form fields
      reset();
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Clear preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#2cc893]">Register</h2>
        
        {/* Profile Picture Upload Area */}
        <label
          htmlFor="profilePicture"
          className="flex flex-col items-center justify-center w-32 h-32 mx-auto rounded-full bg-gray-100 border-dashed border-2 border-gray-400 cursor-pointer overflow-hidden"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              <p className="mt-1 text-xs text-gray-500 text-center">Drag & drop or <br /> <span className="underline text-[#2cc893]">upload a file</span></p>
            </>
          )}
          <input
            id="profilePicture"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            ref={fileInputRef}
            {...register("profilePicture")}
            onChange={(e) => {
              register("profilePicture").onChange(e); // Trigger react-hook-form validation
              handleFileChange(e); // Update preview
            }}
          />
        </label>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Login link */}
          <div className="text-center text-sm">
            <p className="font-medium text-gray-600">
              Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login here</Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}