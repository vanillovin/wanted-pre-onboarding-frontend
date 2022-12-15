import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function NavigationBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="absolute p-4 top-0 left-0 w-full flex items-center justify-around bg-blue-100 bg-opacity-40">
      <h1>Hello {user ? `${user.name} :)` : ':)'}</h1>
      <ul className="flex items-center">
        <li>
          <Link to="/todo">투두</Link>
        </li>
        <li>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-200 rounded-md px-1 text-white ml-2"
            >
              로그아웃
            </button>
          ) : (
            <div>
              <button
                className="bg-blue-200 rounded-md px-1 text-white ml-2"
                onClick={() => navigate('/')}
              >
                로그인/회원가입
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
