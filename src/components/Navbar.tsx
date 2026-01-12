import { Link, useNavigate, useLocation,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import { createPortal } from 'react-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  }, [location.pathname]);

  
  useEffect(() => {
    // FETCH NO. OF BLOGS
    const fetchBlogCount = async () => {
      if (user?.id) {
        const { count } = await supabase
          .from('blogs')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id);
        setBlogCount(count || 0);
      }
    };
    fetchBlogCount();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Login');
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname.startsWith(path);

  
  return (
    <div
      className={`navbar min-h-[88px] px-10 sticky top-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white backdrop-blur-xl shadow-lg' : 'bg-white/90 shadow-md'}
      `}
    >
      <div className="flex-1">
        <Link
          to="/home"
          className="text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          GameHub
        </Link>
      </div>

      {/** DESKTOP*/}
      <div className="hidden md:flex gap-8 items-center relative">
        <NavLink to="/home" active={isActive('/home')}>
          Trending Articles
        </NavLink>
        <NavLink to="/create-blog" active={isActive('/create-blog')}>
          Create a Blog
        </NavLink>
        <NavLink to="/my-blogs" active={isActive('/my-blogs')}>
          My Blogs
        </NavLink>

        <div className="relative">
          <button
            className="text-gray-700 hover:text-blue-600 transition text-xl flex items-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FiUser />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => { setShowProfileModal(true); setDropdownOpen(false) }}
              >
                <FiUser /> Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"
                onClick={confirmLogout} 
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/** MOBILE */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="w-6 h-[2px] bg-gray-800"></span>
        <span className="w-6 h-[2px] bg-gray-800"></span>
        <span className="w-6 h-[2px] bg-gray-800"></span>
      </button>

      {mobileOpen && (
        <div className="md:hidden absolute top-[88px] left-0 w-full bg-white shadow-lg px-6 pb-6 pt-4 space-y-4 z-40">
          <MobileLink to="/home">Trending Articles</MobileLink>
          <MobileLink to="/create-blog">Create Blog</MobileLink>
          <MobileLink to="/my-blogs">My Blogs</MobileLink>
          <button
            onClick={confirmLogout}
            className="block text-red-500 font-medium"
          >
            Logout
          </button>
        </div>
      )}

     {showProfileModal &&
      createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Blogs Created:</span> {blogCount}
            </p>

            <button
              className="btn btn-primary w-full mt-2"
              onClick={() => setShowProfileModal(false)}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )
    }

      {showLogoutModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Are you sure you want to logout?
              </h2>

              <div className="flex justify-around mt-6">
                <button
                  className="w-24 border rounded text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  onClick={handleConfirmLogout}
                >
                  Yes
                </button>

                <button
                  className="w-24 border rounded text-green-500 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                  onClick={closeLogoutModal}
                >
                  No
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
};

    const NavLink = ({
      to,
      active,
      children,
    }: {
      to: string;
      active: boolean;
      children: React.ReactNode;
    }) => (
      <Link
        to={to}
        className={`relative font-medium transition
          ${active ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}
        `}
      >
        {children}
        {active && (
          <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-blue-600 rounded-full"></span>
        )}
      </Link>
    );

    const MobileLink = ({
      to,
      children,
    }: {
      to: string;
      children: React.ReactNode;
    }) => (
      <Link
        to={to}
        className="block text-gray-800 font-medium text-lg"
      >
        {children}
      </Link>
    );

export default Navbar;
