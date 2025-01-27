import { useState } from "react";
import Menu from "./Menu";
import { insertInfo, deleteInfo } from "../api/pmid";
import styled from "styled-components";

const Div = styled.div`
  // 전체 컨테이너
  #container {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    height: 70vh;
    margin: auto;
    padding-top: 30px;
  }

  // pmid:
  #pmidarea {
    display: flex;
    justify-content: space-around;
    width: 30%;
    margin-top: 30px;
  }
  // input + button (insert, delete)
  #inputarea {
    padding-top: 20px;
    input {
      height: 30px;
      width: 200px;
      margin-bottom: 10px;
    }
    button {
      height: 35px;
      width: 70px;
      color: white;
      background-color: gray;
      border: none;
      font-size: 1rem;
      margin: 15px;
    }
  }
  // keyword json:
  #keywordarea {
    display: flex;
    justify-content: space-evenly;
    width: 40%;
    margin-top: 30px;
    textarea {
      margin: 10px;
      height: 80%;
      width: 60%;
    }
  }
`;

const Manager = () => {
  // 입력 값 관리 (pmid, keyword_json)
  const [pmid, setPmid] = useState("");
  const [keywordjson, setKeywordjson] = useState("");

  // insert (pmid, keyword json 모두 입력 후 실행)
  const insertPmid = () => {
    // pmid와 keyword 정보를 입력해야 insert
    if (pmid === "" || pmid === undefined) {
      alert("pmid를 입력해주세요");
    } else if (keywordjson === "" || keywordjson === undefined) {
      alert("keyword 정보를 입력해주세요");
    } else {
      let keywordObj;
      try {
        // JSON 객체로 변환
        keywordObj = JSON.parse(keywordjson);
      } catch (error) {
        alert("JSON 형식으로 입력해주세요.");
        return;
      }

      // 삽입할 Data 객체 생성
      const insertData = {
        pmid: pmid,
        keywordjson: keywordObj,
      };

      insertInfo(insertData);
    }
  };

  // delete (pmid만 입력 후 실행)
  const deletePmid = (pmid) => {
    deleteInfo(pmid);
  };

  return (
    <Div>
      <Menu />
      <div id="container">
        <div id="pmidarea">
          <h1>PMID:</h1>
          <div id="inputarea">
            <input
              type="text"
              value={pmid}
              onChange={(e) => setPmid(e.target.value)}
            />
            <div>
              <button onClick={insertPmid}>insert</button>
              <button onClick={() => deletePmid(pmid)}>delete</button>
            </div>
          </div>
        </div>
        <div id="keywordarea">
          <h2>keyword json:</h2>
          <textarea
            value={keywordjson}
            onChange={(e) => setKeywordjson(e.target.value)}
          />
        </div>
      </div>
    </Div>
  );
};

export default Manager;
