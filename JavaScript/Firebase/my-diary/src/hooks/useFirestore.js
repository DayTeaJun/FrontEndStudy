import { collection } from "firebase/firestore";
import { useReducer } from "react";
import { appFirestore } from "../firebase/config";

const initState = {
  // 데이터 객체 형태 저장 document
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// transaction : collection 이름(여러 문서(document)를 저장)
export const useFirestore = (transaction) => {
  // response : Firestore에서 전달받는 결과값
  const [response, dispatch] = useReducer(storeReducer, initState);

  // 컬렉션 참조를 firestore에 요청 (appFirestore: Firestore 초기화 객체, transaction : 콜렉션 이름)
  // 컬렉션이 존재하지 않는다면 생성해서 주소를 전달, 있다면 있는 상태의 참조를 전달함
  const colRef = collection(appFirestore, transaction);

  // 컬렉션에 문서 추가
  const addDocument = () => {};

  // 컬렉션에 문서 제거
  // id 삭제할 document id
  const deleteDocument = (id) => {};

  return { addDocument, deleteDocument, response };
};
