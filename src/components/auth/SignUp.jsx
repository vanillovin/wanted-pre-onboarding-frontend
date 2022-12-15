import { useState } from 'react';
import { authAPI } from '../../apis';

function SignUp({ handleChangeSetIsMember }) {
  const [emailInputs, setEmailInputs] = useState({
    value: '',
    error: null,
  });
  const [passwordInputs, setPasswordInputs] = useState({
    value: '',
    error: null,
  });

  const onChangeEmailInputs = (e) => {
    const value = e.target.value;
    setEmailInputs((prev) => ({ ...prev, value }));
    const check = value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (check === null) {
      setEmailInputs((prev) => ({ ...prev, error: '이메일 형식이 올바르지 않습니다' }));
    } else {
      setEmailInputs((prev) => ({ ...prev, error: null }));
    }
  };

  const onChangePasswordInputs = (e) => {
    const value = e.target.value;
    setPasswordInputs((prev) => ({ ...prev, value }));
    const check = value.length < 8;
    if (check) {
      setPasswordInputs((prev) => ({
        ...prev,
        error: '비밀번호는 8자 이상 입력해 주세요',
      }));
    } else {
      setPasswordInputs((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authAPI
      .signUp({ email: emailInputs.value, password: passwordInputs.value })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.message);
        alert('가입이 완료됐습니다.');
        localStorage.setItem('USER', data.access_token);
        handleChangeSetIsMember();
      })
      .catch((err) => {
        alert(`가입 실패 ${err.message}`);
      });
  };

  return (
    <div className="border w-72 p-4">
      <h1 className="font-bold text-lg">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          className="border p-1 outline-none rounded-md mt-2"
          name="email"
          value={emailInputs.value}
          onChange={onChangeEmailInputs}
        />
        {emailInputs.error && (
          <p className="text-red-400 text-sm mt-1">{emailInputs.error}</p>
        )}
        <input
          type="password"
          className="border p-1 outline-none rounded-md mt-2"
          name="password"
          value={passwordInputs.value}
          onChange={onChangePasswordInputs}
        />
        {passwordInputs.error && (
          <p className="text-red-400 text-sm mt-1">{passwordInputs.error}</p>
        )}
        <button
          type="submit"
          className={`my-2 rounded-md ${
            !emailInputs.error && !passwordInputs.error ? 'bg-blue-300' : 'bg-blue-100'
          } p-1`}
          disabled={
            !emailInputs.value ||
            !passwordInputs.value ||
            emailInputs.error ||
            passwordInputs.error
          }
          onClick={handleSubmit}
        >
          회원가입하기
        </button>
      </form>
      <div className="text-sm mt-1">
        회원이신가요?
        <button className="font-semibold ml-1" onClick={handleChangeSetIsMember}>
          로그인하러가기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
