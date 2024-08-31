// import React, { useContext, useState } from 'react';
// import { FaShoppingCart } from "react-icons/fa";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { GrSearch } from "react-icons/gr";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import logo from '../assest/logo.png';
// import SummaryApi from '../common';
// import ROLE from '../common/role';
// import Context from '../context';
// import { setUserDetails } from '../store/userSlice';

// const Header = () => {
//   const user = useSelector(state => state?.user?.user);
//   const dispatch = useDispatch();
//   const [menuDisplay, setMenuDisplay] = useState(false);
//   const context = useContext(Context);
//   const navigate = useNavigate();
//   const searchInput = useLocation();
//   const URLSearch = new URLSearchParams(searchInput?.search);
//   const searchQuery = URLSearch.get("q") || "";  // Use get instead of getAll for single value
//   const [search, setSearch] = useState(searchQuery);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch(SummaryApi.logout_user.url, {
//         method: SummaryApi.logout_user.method,
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(data.message);
//         dispatch(setUserDetails(null));
//         navigate("/");
//       } else if (data.error) {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     setSearch(value);

//     if (value) {
//       navigate(`/search?q=${value}`);
//     } else {
//       navigate("/search");
//     }
//   };

//   return (
//     <header className="h-16 shadow-md bg-gray-900 fixed w-full z-40">
//       <div className="h-full container mx-auto flex items-center px-4 justify-between text-white">
//         <div>
//           <Link to="/">
//             <img src={logo} alt="Logo" width={50} height={50} />
//           </Link>
//         </div>
//         <div className="hidden lg:flex items-center w-full justify-between max-w-md border rounded-full focus-within:shadow pl-2">
//           <input
//             type="text"
//             placeholder="Search product here..."
//             className="w-full outline-none bg-white text-black px-4 py-2 rounded-l-full"
//             onChange={handleSearch}
//             value={search}
//           />
//           <button className="text-lg w-12 h-12 bg-red-600 flex items-center justify-center rounded-r-full text-white">
//             <GrSearch />
//           </button>
//         </div>

//         <div className="flex items-center gap-7">
//           <div className="relative flex justify-center">
//             {user?._id && (
//               <div
//                 className="text-3xl cursor-pointer relative flex justify-center text-black"
//                 onClick={() => setMenuDisplay(prev => !prev)}
//               >
//                 {user?.profilePic ? (
//                   <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
//                 ) : (
//                   <FaRegCircleUser />
//                 )}
//               </div>
//             )}

//             {menuDisplay && (
//               <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
//                 <nav>
//                   {user?.role === ROLE.ADMIN && (
//                     <Link
//                       to={"/admin-panel/all-products"}
//                       className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
//                       onClick={() => setMenuDisplay(prev => !prev)}
//                     >
//                       Admin Panel
//                     </Link>
//                   )}
//                   <Link
//                     to={'/order'}
//                     className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
//                     onClick={() => setMenuDisplay(prev => !prev)}
//                   >
//                     Order
//                   </Link>
//                   <Link
//                     to={'/update-password'}
//                     className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
//                     onClick={() => setMenuDisplay(prev => !prev)}
//                   >
//                     Change Password
//                   </Link>
//                 </nav>
//               </div>
//             )}
//           </div>

//           {user?._id && (
//             <Link to="/cart" className="text-2xl relative text-white">
//               <span>
//                 <FaShoppingCart />
//               </span>

//               <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
//                 <p className="text-sm">{context?.cartProductCount}</p>
//               </div>
//             </Link>
//           )}

//           <div>
//             {user?._id ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link to="/login" className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;




import React, { useContext, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assest/logo.png';
import SummaryApi from '../common';
import ROLE from '../common/role';
import Context from '../context';
import { clearUserData } from '../store/userSlice';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        // Clear the user details from Redux state
        dispatch(clearUserData());

        // Clear the cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Clear session storage
        sessionStorage.clear();

        toast.success(data.message);
        navigate("/");
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-gray-900 fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between text-white">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" width={50} height={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-md border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none bg-white text-black px-4 py-2 rounded-l-full"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg w-12 h-12 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </button>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center text-black"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
                      onClick={() => setMenuDisplay(prev => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={'/order'}
                    className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
                    onClick={() => setMenuDisplay(prev => !prev)}
                  >
                    Order
                  </Link>
                  <Link
                    to={'/update-password'}
                    className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-black'
                    onClick={() => setMenuDisplay(prev => !prev)}
                  >
                    Change Password
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to="/cart" className="text-2xl relative text-white">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
