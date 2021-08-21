import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.

  const [ currentTime, setCurrentTime ] = useState(new Date);
  const timeOptions = {
    timeZone: "Asia/Seoul", 
	year: "numeric", 
	month: "long", 
	day: "numeric", 
	weekday: "long", 
	hour: "numeric", 
	minute: "numeric", 
	second: "numeric"  
  }
  const currentTimeString = currentTime.toLocaleDateString('en-US', timeOptions);

  useEffect(() => {
    setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);
  }, [])

  return (
    <TodoHeadBlock>
      <DateText>{currentTimeString}</DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
