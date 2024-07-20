// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import loginIcons from '../assest/signin.gif';
// import SummaryApi from '../common';
// import imageTobase64 from '../helpers/imageTobase64';

// const SignUp = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//         name: "",
//         confirmPassword: "",
//         profilePic: "",
//     });
//     const navigate = useNavigate();

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleUploadPic = async (e) => {
//         const file = e.target.files[0];
//         const imagePic = await imageTobase64(file);
//         setData((prev) => ({
//             ...prev,
//             profilePic: imagePic,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (data.password === data.confirmPassword) {
//             try {
//                 const dataResponse = await fetch(SummaryApi.signUP.url, {
//                     method: SummaryApi.signUP.method,
//                     headers: {
//                         "content-type": "application/json",
//                     },
//                     body: JSON.stringify(data),
//                 });

//                 const dataApi = await dataResponse.json();

//                 if (dataApi.success) {
//                     toast.success(dataApi.message);
//                     navigate("/login");
//                 } else if (dataApi.error) {
//                     toast.error(dataApi.message);
//                 }
//             } catch (error) {
//                 toast.error("An error occurred. Please try again.");
//             }
//         } else {
//             toast.error("Please check password and confirm password");
//         }
//     };

//     return (
//         <section id='signup'>
//             <div className='mx-auto container p-4'>
//                 <div className='bg-white p-5 w-full max-w-sm mx-auto'>
//                     <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
//                         <img src={data.profilePic || loginIcons} alt='Profile' />
//                         <form>
//                             <label>
//                                 <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
//                                     Upload Photo
//                                 </div>
//                                 <input type='file' className='hidden' onChange={handleUploadPic} />
//                             </label>
//                         </form>
//                     </div>

//                     <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
//                         <div className='grid'>
//                             <label>Name:</label>
//                             <div className='bg-slate-100 p-2'>
//                                 <input
//                                     type='text'
//                                     placeholder='Enter your name'
//                                     name='name'
//                                     value={data.name}
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'
//                                 />
//                             </div>
//                         </div>

//                         <div className='grid'>
//                             <label>Email:</label>
//                             <div className='bg-slate-100 p-2'>
//                                 <input
//                                     type='email'
//                                     placeholder='Enter email'
//                                     name='email'
//                                     value={data.email}
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label>Password:</label>
//                             <div className='bg-slate-100 p-2 flex'>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder='Enter password'
//                                     value={data.password}
//                                     name='password'
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'
//                                 />
//                                 <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <label>Confirm Password:</label>
//                             <div className='bg-slate-100 p-2 flex'>
//                                 <input
//                                     type={showConfirmPassword ? "text" : "password"}
//                                     placeholder='Enter confirm password'
//                                     value={data.confirmPassword}
//                                     name='confirmPassword'
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'
//                                 />
//                                 <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
//                                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </div>
//                             </div>
//                         </div>

//                         <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
//                             Sign Up
//                         </button>
//                     </form>

//                     <p className='my-5'>
//                         Already have an account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link>
//                     </p>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default SignUp;



import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginIcons from '../assest/signin.gif';
import SummaryApi from '../common';
import imageTobase64 from '../helpers/imageTobase64';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('');
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        profilePic: '',
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateField(name, value);
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
            ...prev,
            profilePic: imagePic,
        }));
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        if (name === 'password') {
            const strength = getPasswordStrength(value);
            setPasswordStrength(strength);

            if (strength === 'Weak') {
                errorMsg = 'Password is too weak';
            }
        }

        if (name === 'confirmPassword' && value !== data.password) {
            errorMsg = 'Passwords do not match';
        }

        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));
    };

    const getPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[!@#$%^&*]/)) {
            return 'Strong';
        }
        return 'Moderate';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            try {
                const dataResponse = await fetch(SummaryApi.signUP.url, {
                    method: SummaryApi.signUP.method,
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const dataApi = await dataResponse.json();

                if (dataApi.success) {
                    toast.success(dataApi.message);
                    navigate('/login');
                } else if (dataApi.error) {
                    toast.error(dataApi.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        } else {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: 'Passwords do not match',
            }));
        }
    };

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='Profile' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                {errors.name && <p className='text-red-600'>{errors.name}</p>}
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                {errors.email && <p className='text-red-600'>{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.password && <p className='text-red-600'>{errors.password}</p>}
                            <p className={`text-sm ${passwordStrength === 'Weak' ? 'text-red-600' : passwordStrength === 'Strong' ? 'text-green-600' : 'text-yellow-600'}`}>
                                Password Strength: {passwordStrength}
                            </p>
                        </div>

                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword}</p>}
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                            Sign Up
                        </button>
                    </form>

                    <p className='my-5'>
                        Already have an account? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
