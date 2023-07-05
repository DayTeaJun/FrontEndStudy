import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import Card from "./Components/Card";
import { shoes } from "./DataList";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<Card shoesData={shoesData} />} />
        <Route path="/detail" element={<div>상세페이지</div>} />
        <Route path="/about" element={<div>어바웃페이지</div>} />
      </Routes>
    </>
  );
}
export default App;
