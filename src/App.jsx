import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from "./style/globalStyle";
import { reductionDate } from './util/dataFormat';

function App() {
  // input 값 상태관리
  const [toDo, setToDo] = useState('');
  // toDoList 상태관리
  const [toDoList, setToDoList] = useState(() => {
    const savedList = localStorage.getItem('toDoList');
    return savedList ? JSON.parse(savedList) : [];
  });

  // onSubmit시 input 초기화 및 toDoList data 변경 실행할 함수
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 입력값이 없을 경우 return
    if (toDo.trim() === '') return;

    // toDoList에 추가할 객체
    const toDoObj = {
      id: Date.now(),
      title: toDo,
      date: reductionDate(new Date()), // 날짜 포맷 변경 유틸 사용
    };

    // 상태관리 값 변경
    setToDoList([toDoObj, ...toDoList]);
    setToDo('');
  };

  // 삭제 버튼 클릭시 toDoList data 삭제 실행할 함수
  const onDel = (id) => {
    setToDoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // toDoList 상태값이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <Layout>
      {/* styled-components 사용해 전역 스타일 만든 함수 호출 */}
      <GlobalStyle />
      <h1>ToDoList</h1>
      <ToDoBox>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
          <button type="submit">저장</button>
        </form>
        
        <ToDoStyle>
          {toDoList.length > 0 ? (
            toDoList.map((item, i) => (
              <li key={item.id}>
                <div>{i + 1}. {item.title}</div>
                <div>
                  <span>{item.date}</span>
                  <button onClick={() => onDel(item.id)}>x</button>
                </div>
              </li>
            ))) : (
              <li>저장한 내용이 없습니다.</li>
            )
          }
        </ToDoStyle>
      </ToDoBox>
    </Layout>
  );
}

export default App;

// 스타일 컴포넌트
const Layout = styled.div`
  height: 100vh;
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`;

const ToDoBox = styled.div`
  input {
    width: 20rem;
    height: 2rem;
    padding-left: 0.75rem;
    border: 1px solid #999;
    border-radius: 10px 0 0 10px;
  }

  > form button {
    height: 2rem;
    background-color: #fff;
    border: 1px solid #999;
    border-left: none;
    border-radius: 0 10px 10px 0;
  }
`;

const ToDoStyle = styled.ul`
  padding-left: 1rem;

  li {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  span {
    color: #999;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    display: inline-block;
  }

  button {
    color: red;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid red;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;
