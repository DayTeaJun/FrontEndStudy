import "bootstrap/dist/css/bootstrap.min.css";
import { shoes } from "./DataList";
import { Navbar, Container, Nav } from "react-bootstrap";
import React, { useState } from "react";

function App() {
  const [shoesData, setShoesData] = useState(shoes);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {shoesData.map((item, index) => {
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
export default App;
