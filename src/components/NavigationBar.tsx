import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

function NavigationBar() {
  const navigate = useNavigate();
  const {
    user: { name },
    onResetUser,
  } = useUser();

  const handleLogout = () => {
    onResetUser();
    navigate('/');
  };

  return (
    <nav className="absolute p-4 top-0 left-0 w-full flex items-center justify-around bg-blue-100 bg-opacity-40">
      <h1>Hello {name ? `${name} :)` : ':)'}</h1>
      <ul className="flex items-center">
        <li>
          <Link to="/todo">투두</Link>
        </li>
        <li>
          {name ? (
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
