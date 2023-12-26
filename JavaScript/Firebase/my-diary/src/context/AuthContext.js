import { createContext, useReducer } from 'react';

// context 객체 생성
const AuthContext = createContext();

// Reducer, 객체 데이터 다룰 때 사용
const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// context 를 구독할 컴포넌트의 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
  // 유저 정보 관리
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // value 값을 children 에게 공유
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
