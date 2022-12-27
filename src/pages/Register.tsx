import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import useUser from '../hooks/useUser';

function Register() {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUser();

  const [isMember, setIsMember] = useState(true);

  const handleChangeSetIsMember = () => setIsMember((prev) => !prev);

  useEffect(() => {
    if (token) navigate('/todo');
  }, [token, navigate]);

  return (
    <div className="">
      {isMember ? (
        <SignIn handleChangeSetIsMember={handleChangeSetIsMember} />
      ) : (
        <SignUp handleChangeSetIsMember={handleChangeSetIsMember} />
      )}
    </div>
  );
}

export default Register;
