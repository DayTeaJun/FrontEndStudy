import React, { useState } from "react";
import "./style.css";
import { createStore } from "redux";
// 리액트-리덕스 4인방
import { Provider, useSelector, useDispatch, connect } from "react-redux";
// Provider : 어떤 컴포넌트에게 state를 제공할 것인지 울타리를 제공함.
// useSelector : 어떤 state값을 쓸 것인지 선택
// useDispatch : state값을 변경 시킬 때 씀
// connect : 재사용성이 필요하면 사용함.(이 코드에서는 쓰지 않음.)

// reducer는 store에 안에 있는 state를 어떻게 바꿀것인지 결정하는 것
// 그래서 두개의 파라미터를 받음, 현재상태값과 어떻게바꿀것인가에 대한 요청을 받는 action
function reducer(currentState, action) {
  // 만약에 currentState값이 정의되지 않았다면?
  // 기본 state값을 리턴해줘서 설정할 수 있음.
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }

  // 이때 리덕스는 각각의 state 변화를 불변하게 유지해야됨
  // 새로운 state를 만듦, 과거의 state를 복제함
  const newState = { ...currentState };
  // 이 복제본을 수정하면 불변성을 유지할 수 있음. -> 이렇게 변화시킨 것을 return함
  // return한 값이 새로운 state의 값이 된다.

  // reducer가 호출 됬을 때, 만약에 action.type이 PLUS면
  if (action.type === "PLUS") {
    newState.number++;
  }
  console.log(currentState);
  return newState;
}

// createStore을 통해서 store을 생성함.
const store = createStore(reducer);

export default function App() {
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        {/* Provider를 쓸려면 store을 정의해줘야함 */}
        <Provider store={store}>
          {/* 이제 아래 감싸진 컴포넌트들은 store을 사용할 수 있게됨. */}
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}

function Left2(props) {
  // state를 사용하고 있는 number만 값이 바뀜 아래 콘솔로그는 실행이 되지 않음.
  // 부모에도 영향을 미치지 않으므로 성능적으로도 좋다.
  console.log("2");
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}

function Left3(props) {
  console.log("3");

  // useSelector는 함수로 인자를 받는다.
  //function f(state) {
  // state값을 입력값을 받고
  // 지금은 number값을 받겠다.
  //  return state.number;
  //}

  // number값을 무선으로 받고 싶을 때, useSelector
  const number = useSelector((state) => state.number);
  return (
    <div>
      {/* 여기 number는 state.number 즉, store에 있는 number값을 useSelector를 이용해 무선으로 받아 온 것임. */}
      <h1>Left3 : {number}</h1>
    </div>
  );
}

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}

function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}

function Right3(props) {
  // dispatch는 useDispatch()로 받을 수 있다.
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        // dispatch에 type을 PLUS라고 하는 action에 전달함. 이러면 reducer가 호출됨.
        onClick={() => {
          dispatch({ type: "PLUS" });
        }}
      ></input>
    </div>
  );
}
