import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFirestore } from '../firebase/config';

export const useCollection = (transaction) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // onSnapshot을 실행시키면 Firebase와 통신 상태로 두기 때문에 unsubscribe로 반환하여 통신을 중단함
    const unsubscribe = onSnapshot(
      // 가장 최신의 collection 내용을 반환
      collection(appFirestore, transaction),
      (snapshot) => {
        // snapshot 최신 collection의 내용을 저장(배열형태인 doc로 저장)
        let result = [];
        // docs document 접근 및 배열형태이므로 result에 저장함
        snapshot.docs.forEach((doc) => {
          // 각각의 document의 문서를 가져오는 docs.data
          // data() 반환값을 객체형태로 저장(doc 아이디 저장)
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      // onSnapshot 은 tryCatch처럼 사용가능
      (error) => {
        setError(error.message);
      }
    );
    // 만든 함수(훅)이 마운트 될때(통신이 다 완료된 후, 실행하도록)
    // useEffect 훅의 return 값에 함수를 반환하면 clean-up 함수가 됩니다. 외부에서 데이터를 구독하는 경우 clean-up 함수는 useEffect훅을 사용하는 컴포넌트가 마운트 해제될때 실행되어 구독을 종료하게 됩니다.
    // 참고 : https://ko.reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return unsubscribe;
  }, [collection]);

  return { documents, error };
};
