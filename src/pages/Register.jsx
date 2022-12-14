import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

function Register() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [isMember, setIsMember] = useState(true);

  const handleChangeSetIsMember = () => setIsMember((prev) => !prev);

  useEffect(() => {
    if (user) navigate('/todo');
  }, [user, navigate]);

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
