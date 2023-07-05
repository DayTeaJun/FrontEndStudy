import React, { useState } from "react";
import { shoes } from "../DataList";

export default function Card() {
  const [shoesData, setShoesData] = useState(shoes);
  return (
    <>
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
    </>
  );
}
