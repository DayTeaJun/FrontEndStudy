import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeAge } from './store';
import { addCount, subCount } from './store/userSlice';

// createSlice은 useSelector을 이용해서 받아옴

function App() {
  // 콜벡함수를 받음
  // 매개변수는 store안에 있는 user 즉, createSlice안의 name과 initialState을 가져옴
  // state에 변경할 값만 가져와야함,
  // 여기선 state 전부를 가져오는데, return state.user 하면,
  // 그 하나만 가져와서 랜더링함.
  let state = useSelector((state) => {
    return state;
  });
  // console.log(state.user);
  console.log(state.user2);
  // a는 store.js 파일의 reducer안에 들어 있는 내용을 가져옴
  // console.log(a); -> user: "jun" 이 등록 되있음.
  // console.log(a.user); -> user의 key값인 "jun"을 가져옴

  // useDispatch()로 changeName함수가 실행 될 수 있게 state를 바꿔줘 요청을 함.
  let dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(changeName());
        }}
      >
        이름바꿔!
      </button>
      <button
        onClick={() => {
          // 10을 chageAge 매개변수로 action을 전달 할 수 있음
          // dispatch(changeAge(1));
        }}
      >
        나이바꿔!
      </button>

      <button
        onClick={() => {
          dispatch(addCount(0));
        }}
      >
        ++
      </button>

      <button
        onClick={() => {
          dispatch(subCount(0));
        }}
      >
        --
      </button>
      <h1>{state.user2[0].count}</h1>
    </div>
  );
}
export default App;
