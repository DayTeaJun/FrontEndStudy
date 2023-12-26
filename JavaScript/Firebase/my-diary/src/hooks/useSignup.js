import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // 에러 정보 저장
  const [error, setError] = useState(null);
  // 현재 서버와 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  // 전역 공유적인 컨텍스트 받기
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null); // 아직 에러 없음
    setIsPending(true); // 통신 진행중

    // 회원가입
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCreadential) => {
        // 회원가입 완료시 사용자 정보 저장
        const user = userCreadential.user;
        console.log(user);

        if (!user) {
          throw new Error('회원가입 실패');
        }

        // 회웝가입 진행이 되면, 유저 정보 업데이트(닉네임 업데이트)
        // appAuth.currentUser 는 현재 로그인한 유저의 정보
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            dispatch({ type: 'login', payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, signup };
};
