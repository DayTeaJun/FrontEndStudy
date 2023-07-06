import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const Box = styled.div`
  padding: 20px;
  color: grey;
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
  // 기존 상품순서를 변경했을경우 상세페이지가 불규칙해진 것을 find 메서드를 통해 막음
  const findItem = shoes.find((item) => item.id == id);

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
      </div>
    </div>
  );
}
