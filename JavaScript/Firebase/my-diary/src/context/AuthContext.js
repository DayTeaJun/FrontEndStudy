import { createContext, useReducer } from 'react';

// context 객체 생성
const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// context 를 구독할 컴포넌트의 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
