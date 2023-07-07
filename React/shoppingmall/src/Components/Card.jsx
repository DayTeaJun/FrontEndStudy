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
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(2);

  const axiosData = async (count) => {
    setIsLoading(false);
    const res = await axios.get(
      `https://codingapple1.github.io/shop/data${count}.json`
    );
    const resData = res.data;
    console.log(resData);
    setCount((prev) => {
      return prev + 1;
    });
    setIsLoading(true);
    setData(resData);
  };

  return (
    <>
      {!isLoading && (
        <>
          <span>로딩중</span>
        </>
      )}
      {count <= 3 ? (
        <Btn type="button" onClick={() => axiosData(count)}>
          나와라얍
        </Btn>
      ) : null}
      {/* {shoesData.map((item) => {
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
      })} */}
      {isLoading &&
        data.map((item) => {
          return (
            <>
              <div className="container" key={item.id}>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`https://codingapple1.github.io/shop/shoes${
                        item.id - 1
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
    </>
  );
}
