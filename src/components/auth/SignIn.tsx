import React, { useState } from 'react';
import { authAPI } from '../../apis';
import useUser from '../../hooks/useUser';

interface SignInProps {
  handleChangeSetIsMember(): void;
}

function SignUp({ handleChangeSetIsMember }: SignInProps) {
  const { onSetUser } = useUser();

  const [signInInputs, setSignInInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = signInInputs;

  const onChangeSignInInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    authAPI
      .signIn({ email, password })
      .then((res) => res.json())
      .then((data) => {
        if (!data.access_token || data.error) throw new Error(data.message);
        onSetUser({
          name: email.split('@')[0],
          token: data.access_token,
        });
        alert('로그인 완료! 🌞');
      })
      .catch((err) => {
        alert(`로그인 실패 ${err.message}`);
      });
  };

  return (
    <div className="border w-72 p-4">
      <h1 className="font-bold text-lg">로그인</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          className="border p-1 outline-none rounded-md mt-2"
          name="email"
          value={email}
          onChange={onChangeSignInInputs}
        />
        <input
          type="password"
          className="border p-1 outline-none rounded-md mt-2"
          name="password"
          value={password}
          onChange={onChangeSignInInputs}
        />
        <button
          type="submit"
          className={`my-2 rounded-md ${
            email && password ? 'bg-blue-300' : 'bg-blue-100'
          } p-1`}
          disabled={!email || !password}
          onClick={handleSubmit}
        >
          로그인하기
        </button>
      </form>
      <div className="text-sm mt-1">
        회원이아니신가요?
        <button className="font-semibold ml-1" onClick={handleChangeSetIsMember}>
          회원가입하러가기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
