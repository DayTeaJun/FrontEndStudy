import { collection } from 'firebase/firestore';
import { useReducer } from 'react';
import { appFirestore } from '../firebase/config';

const initState = {
  // 데이터 객체 형태 저장 document
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      // isPending은 현재 통신중을 의미하므로, document는 받아오지 않았기 때문에 null
      return { isPending: true, document: null, success: false, error: null };
    // addDoc 함수를 통해 addDoc type이 실행, 데이터를 전달이 완료된 상태(success)
    // (addDoc을 통해 docRef 에 값을 할당된 상태이고 값은 payload로 전달되어있음)
    case 'addDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
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
  const addDocument = async (doc) => {
    // 통신중임을 알림
    dispatch({ type: 'isPending' });
    try {
      // addDoc : Document 추가, 문서 참조 상수에 저장(docRef)
      // 첫번째 인자(collection 함수인 colRef, 두번째 인자 doc는 addDocument 실행시 받는 인자)
      const docRef = await addDoc(colRef, doc);
      dispatch({ type: 'addDoc', payload: docRef });
      console.log(docRef);
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  // 컬렉션에 문서 제거
  // id 삭제할 document id
  const deleteDocument = (id) => {};

  return { addDocument, deleteDocument, response };
};
