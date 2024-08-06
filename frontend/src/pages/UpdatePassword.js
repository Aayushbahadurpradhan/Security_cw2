// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import SummaryApi from '../common';

// function UpdatePassword() {
//   const user = useSelector(state => state?.user?.user);  // Access user data from Redux state
//   const [data, setData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (data.newPassword === data.confirmPassword) {
//       try {
//         const dataResponse = await fetch(SummaryApi.updatePassword.url, {
//           method: SummaryApi.updatePassword.method,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             currentPassword: data.currentPassword,
//             newPassword: data.newPassword,
//             confirmPassword: data.confirmPassword,
//           }),
//           credentials: 'include' // Ensure cookies are sent with the request
//         });

//         const dataApi = await dataResponse.json();

//         if (dataApi.success) {
//           toast.success(dataApi.message);
//           navigate('/login');  // Redirect user to login after password change
//         } else {
//           toast.error(dataApi.message);
//         }
//       } catch (error) {
//         toast.error("An error occurred. Please try again.");
//       }
//     } else {
//       setError("Passwords do not match");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setError(""); // Clear error when user starts typing
//   };

//   return (
//     <section id='update-password'>
//       <div className='mx-auto container p-4'>
//         <div className='bg-white p-5 w-full max-w-sm mx-auto'>
//           <h1 className='text-center text-2xl font-bold mb-6'>Change Password</h1>
//           <form className='flex flex-col gap-2' onSubmit={handlePasswordChange}>
//             <div className='grid'>
//               <label htmlFor="currentPassword">Current Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showCurrentPassword ? "text" : "password"}
//                   id="currentPassword"
//                   name="currentPassword"
//                   value={data.currentPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowCurrentPassword((prev) => !prev)}>
//                   {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <div className='grid'>
//               <label htmlFor="newPassword">New Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showNewPassword ? "text" : "password"}
//                   id="newPassword"
//                   name="newPassword"
//                   value={data.newPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowNewPassword((prev) => !prev)}>
//                   {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <div className='grid'>
//               <label htmlFor="confirmPassword">Confirm New Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={data.confirmPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
//               Submit
//             </button>
//           </form>
//           {error && <p className="text-red-600 text-center mt-4">{error}</p>}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UpdatePassword;

// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import SummaryApi from '../common';

// function UpdatePassword() {
//   const user = useSelector(state => state?.user?.user);  // Access user data from Redux state
//   const [data, setData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (data.newPassword === data.confirmPassword) {
//       try {
//         const dataResponse = await fetch(SummaryApi.updatePassword.url, {
//           method: SummaryApi.updatePassword.method,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             currentPassword: data.currentPassword,
//             newPassword: data.newPassword,
//             confirmPassword: data.confirmPassword,
//           }),
//           credentials: 'include' // Ensure cookies are sent with the request
//         });

//         const dataApi = await dataResponse.json();

//         if (dataApi.success || dataApi.redirect) {  // Check for success or redirect
//           toast.success("Password updated successfully. Please log in again.");
//           navigate('/login');  // Redirect user to login after password change
//         } else {
//           toast.error(dataApi.message);
//         }
//       } catch (error) {
//         toast.error("An error occurred. Please try again.");
//       }
//     } else {
//       setError("Passwords do not match");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setError(""); // Clear error when user starts typing
//   };

//   return (
//     <section id='update-password'>
//       <div className='mx-auto container p-4'>
//         <div className='bg-white p-5 w-full max-w-sm mx-auto'>
//           <h1 className='text-center text-2xl font-bold mb-6'>Change Password</h1>
//           <form className='flex flex-col gap-2' onSubmit={handlePasswordChange}>
//             <div className='grid'>
//               <label htmlFor="currentPassword">Current Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showCurrentPassword ? "text" : "password"}
//                   id="currentPassword"
//                   name="currentPassword"
//                   value={data.currentPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowCurrentPassword((prev) => !prev)}>
//                   {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <div className='grid'>
//               <label htmlFor="newPassword">New Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showNewPassword ? "text" : "password"}
//                   id="newPassword"
//                   name="newPassword"
//                   value={data.newPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowNewPassword((prev) => !prev)}>
//                   {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <div className='grid'>
//               <label htmlFor="confirmPassword">Confirm New Password:</label>
//               <div className='bg-slate-100 p-2 flex'>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={data.confirmPassword}
//                   onChange={handleInputChange}
//                   required
//                   className='w-full h-full outline-none bg-transparent'
//                 />
//                 <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//             </div>

//             <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
//               Submit
//             </button>
//           </form>
//           {error && <p className="text-red-600 text-center mt-4">{error}</p>}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UpdatePassword;


import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

function UpdatePassword() {
  const user = useSelector(state => state?.user?.user);  // Access user data from Redux state
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (data.newPassword === data.confirmPassword) {
      try {
        const dataResponse = await fetch(SummaryApi.updatePassword.url, {
          method: SummaryApi.updatePassword.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          }),
          credentials: 'include' // Ensure cookies are sent with the request
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success || dataApi.redirect) {  // Check for success or redirect
          toast.success("Password updated successfully. Please log in again.");
          navigate('/login');  // Redirect user to login after password change
        } else {
          toast.error(dataApi.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validatePasswordStrength(name, value);  // Validate password strength when typing
    setError(""); // Clear error when user starts typing
  };

  const validatePasswordStrength = (name, value) => {
    if (name === 'newPassword') {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[!@#$%^&*]/)) {
      return 'Strong';
    }
    return 'Moderate';
  };

  return (
    <section id='update-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <h1 className='text-center text-2xl font-bold mb-6'>Change Password</h1>
          <form className='flex flex-col gap-2' onSubmit={handlePasswordChange}>
            <div className='grid'>
              <label htmlFor="currentPassword">Current Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={data.currentPassword}
                  onChange={handleInputChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowCurrentPassword((prev) => !prev)}>
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className='grid'>
              <label htmlFor="newPassword">New Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleInputChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowNewPassword((prev) => !prev)}>
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <p className={`text-sm ${passwordStrength === 'Weak' ? 'text-red-600' : passwordStrength === 'Strong' ? 'text-green-600' : 'text-yellow-600'}`}>
                Password Strength: {passwordStrength}
              </p>
            </div>

            <div className='grid'>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Submit
            </button>
          </form>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default UpdatePassword;
