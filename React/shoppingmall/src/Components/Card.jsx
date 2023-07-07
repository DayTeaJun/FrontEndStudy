import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";

const Btn = styled.button`
  padding: 10px 5px;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 10px;
`;

export default function Card({ shoesData }) {
  const [data, setData] = useState([]);

  return (
    <>
      <Btn
        type="button"
        onClick={async () => {
          const res = await axios.get(
            "https://codingapple1.github.io/shop/data2.json"
          );
          const resData = res.data;
          console.log(resData);
          setData(resData);
        }}
      >
        나와라얍
      </Btn>
      {shoesData.map((item) => {
        return (
          <>
            <div className="container" key={item.id}>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={`https://codingapple1.github.io/shop/shoes${
                      item.id + 1
                    }.jpg`}
                    width="80%"
                  />
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          </>
        );
      })}
      {data.length !== 0 &&
        data.map((item) => {
          return (
            <>
              <div className="container" key={item.id}>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`https://codingapple1.github.io/shop/shoes${
                        item.id + 1
                      }.jpg`}
                      width="80%"
                    />
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
              ;
            </>
          );
        })}
      ;
    </>
  );
}
