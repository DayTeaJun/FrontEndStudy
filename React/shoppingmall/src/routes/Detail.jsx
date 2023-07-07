import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import "./Detail.css";

const Box = styled.div`
  padding: 20px;
  background-color: ${(props) => (props.bg == "yellow" ? "yellow" : "white")};
`;

const YellowBtn = styled.button`
  background: ${(props) => props.bg};
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 20px;
`;

export default function Detail({ shoes }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  // 기존 상품순서를 변경했을경우 상세페이지가 불규칙해진 것을 find 메서드를 통해 막음
  const findItem = shoes.find((item) => item.id == id);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (isNaN(inputText) == true) {
      alert("그러지마세요");
    }
  }, [inputText]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              findItem.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}원</p>
          <button className="btn btn-danger">주문하기</button>
          <Box>
            <YellowBtn bg="skyblue">버튼</YellowBtn>
          </Box>
        </div>
        {isLoading && <Box bg="yellow">노랑</Box>}
        <input type="text" value={inputText} onChange={handleChange} />
      </div>

      {/* defaultActiveKey : 기본적으로 눌러진 버튼에 해당하는 eventKey 입력
      eventKey : 버튼들 마다 유니크하게 부여 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link0">
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="link1">
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="link2">
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab tab={tab}></Tab>
    </div>
  );
}

const Tab = ({ tab }) => {
  const [fade, setFade] = useState("");

  // Q. setTimeout 왜 씁니까
  // 리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.
  // state 변경함수들이 연달아서 여러개 처리되어야한다면
  // state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다.
  // 그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
  // 찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다.
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};
