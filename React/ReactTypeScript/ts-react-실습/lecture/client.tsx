// typescript에서는
// import React from 'react' 쓰면 안됨(tsconfig에서 옵션(ExmoduleInterop)주면 사용가능하긴함)
// react가 export default가 없기 때문에 * as 로 해야됨
// 또는 commonJS export 이기 때문에
// import React = require('react') 도 사용, 거의 밑에처럼 사용하긴함
import * as React from "react";
import * as ReactDOM from "react-dom";

import Gugudan from "./Gugudan";
import GugudanClass from "./GugudanClass";

ReactDOM.render(<GugudanClass />, document.querySelector("#root"));

// npx webpack 또는 npm run dev 하면 컴파일됨
