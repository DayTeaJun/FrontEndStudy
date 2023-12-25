import { useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // displayName은 Firebase에서 유저 정보에 저장할 수 있는 속성 중 하나(명칭)
  const [displayName, setDisplayName] = useState('');
  const { error, isPending, signup } = useSignup();

  const handleData = (e) => {
    if (e.target.type === 'email') {
      setEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setPassword(e.target.value);
    } else if (e.target.type === 'text') {
      setDisplayName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.Signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor="myEmail">email : </label>
        <input
          type="email"
          id="myEmail"
          required
          value={email}
          onChange={handleData}
        />

        <label htmlFor="myPassword">password : </label>
        <input
          type="password"
          id="myPassword"
          required
          value={password}
          onChange={handleData}
        />

        <label htmlFor="myNickName">nickname : </label>
        <input
          type="text"
          id="myNickName"
          required
          value={displayName}
          onChange={handleData}
        />

        <button type="submit" className={styles.btn}>
          회원가입
        </button>
      </fieldset>
    </form>
  );
}
