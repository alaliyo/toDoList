import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from "./style/globalStyle";
import { reductionDate } from './util/dataFormat';

function App() {
  const [toDo, setToDo] = useState('');
  const [toDoList, setToDoList] = useState(() => {
    const savedList = localStorage.getItem('toDoList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (toDo.trim() === '') return;
    const toDoObj = {
      title: toDo,
      date: reductionDate(new Date()),
    };

    setToDoList([toDoObj, ...toDoList]);
    setToDo('');
  };

  const onDel = (index) => {
    setToDoList(toDoList.filter((_, i) => i !== index));
  };

  return (
    <Layout>
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
                <li key={i}>
                  <div>{i + 1}. {item.title}</div>
                  <div>
                    <span>{item.date}</span>
                    <button onClick={() => onDel(i)}>x</button>
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
