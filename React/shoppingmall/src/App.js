import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import Card from "./Components/Card";
import { shoes } from "./DataList";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./routes/Detail";
import About from "./routes/About";
import Event from "./routes/Event";

function App() {
  const [shoesData, setShoesData] = useState(shoes);
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand path="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about/member");
              }}
            >
              Member
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about/location");
              }}
            >
              Location
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="*" element={<div>404</div>} />
        <Route path="/" element={<Card shoesData={shoesData} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* <Route>안에 <Route>를 넣을 수 있는데 이걸 Nested routes 라고 부릅니다.
        저렇게 쓰면
        /about/member로 접속시 <About> &<div>멤버들</div> 을 보여줍니다.
        /about/location으로 접속시 <About> & <div>회사위치</div> 을 보여줍니다. */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<h3>첫 주문시 양배추즙 서비스</h3>} />
          <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
