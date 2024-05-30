import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { appAuth } from '../firebase/config';

// context 객체 생성
const AuthContext = createContext();

// Reducer, 객체 데이터 다룰 때 사용
const authReducer = (state, action) => {
  switch (action.type) {
    // 회원가입, 로그인 하나로 통합
    case 'login':
      // ...state(기존 유저 정보), action.payload로 받아온 유저정보를 합침
      return { ...state, user: action.payload };

    case 'logout':
      // 기존 유저 정보 null로 정보 없앰
      return { ...state, user: null };

    case 'isAuthReady':
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

// context 를 구독할 컴포넌트의 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
  // 유저 정보 관리 (state 유저 정보, dispatch는 authReducer 호출 state 업데이트)
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    // 유저 변화 관찰
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch({ type: 'isAuthReady', payload: user });
    });
    // 자동 구독 해지
    return unsubscribe;
  }, []);

  console.log(state);

  // value 값을 children 에게 공유
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
