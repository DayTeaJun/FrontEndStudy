import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    setIsPending(true);

    // firebase 로그인 시 사용하는 메서드
    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCreadential) => {
        const user = userCreadential.user;
        dispatch({ type: "login", payload: user });
        setError(null);
        setIsPending(false);
        if (!user) {
          throw new Error("회원가입 실패");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};
