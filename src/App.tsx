import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import Spinner from "./components/common/Spinner";
import TodoContainer from "./components/todo/TodoContainer";
import Login from "components/login/Login";

function App() {
  //@TODO login
  const [isLogged, setIsLogged] = useState(false);

  const RenderLayout = (
    <div>
      <TodoContainer />
    </div>
  );

  const LoginLayout = (
      <LoginWrap>
          <Login setIsLogged={setIsLogged}/>
      </LoginWrap>
  )

  return isLogged ? RenderLayout : LoginLayout;
}

const LoginWrap = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default App;
