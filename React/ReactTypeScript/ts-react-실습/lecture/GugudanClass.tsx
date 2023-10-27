// class형 컴포넌트
import * as React from "react";
import { Component } from "react";

// interface를 나타내기 위해 I를 앞에 붙이는 경우가 있음
interface IState {
  first: number;
  second: number;
  value: string;
  result: string;
}

// Componet의 제네릭 자리로는, 첫번째 자리에는 props, 두번째는 state에 대한 타이핑
class GugudanClass extends Component<{}, IState> {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  // 타입추론에 대한 힌트는 해당 사용할려하는 코드에 커서를 올리면 추론을 해줌
  // HTML 태그인 onSubmit
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // prevState가 위 Component에 제네릭을 받지 않을경우 기본값으로 빈 객체 {} 가 되므로, 빈 객체 대신 위에서 Component에서 제네릭을 받아서 타입추론하게 해준다.
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((prevState) => {
        return {
          // prevState의 타입추론이 안되므로, interface 추가하여
          // value가 string으로 타입추론됨
          result: "정답" + prevState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
        };
      });
      // this.input! 사용되지만 if가 더 안전함
      if (this.input) {
        this.input.focus();
      }
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
      if (this.input) {
        this.input.focus();
      }
    }
  };

  // 타입추론에 대한 힌트는 해당 사용할려하는 코드에 커서를 올리면 추론을 해줌
  // 리턴은 없으므로 void
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  // input의 초기값에 null을 넣고 input이 있을 경우와 없을 경우의 타입을 맞춤
  input: HTMLInputElement | null = null;

  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            type="number"
            value={this.state.value}
            // e타입이 알아서 추론됨(아래처럼 같이 사용((e) => setConstantValue(e.target.value))할 경우, 매개변수가 타입추론이 됨)
            // (parameter) e: React.ChangeEvent<HTMLInputElement>
            onChange={this.onChange}
          />
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

export default GugudanClass;
