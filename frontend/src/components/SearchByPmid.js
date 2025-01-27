import React, { useState } from "react";
import Menu from "./Menu";
import styled from "styled-components";

const Div = styled.div`
  // 검색창 style
  #searchbar {
    display: flex;
    align-items: center;
    padding-left: 30px;
    width: 80%;
    margin: auto;
    padding-top: 50px;
    // pmid input창
    input {
      height: 30px;
      margin: 30px;
      padding-left: 5px;
    }

    // pmid 검색 버튼
    button {
      height: 35px;
      width: 70px;
      color: white;
      background-color: gray;
      border: none;
      font-size: 1rem;
    }
  }

  // 결과 text 출력 부분
  #resultarea {
    padding-left: 30px;
    padding-right: 30px;
    width: 80%;
    margin: auto;

    h2 {
      margin-left: 10px;
    }

    #resulttext {
      margin-left: 10px;
      p {
        justify-content: center;
        padding: 15px;
        border: 1px solid;
      }
    }
  }
`;

function SearchByPmid() {
  const [pmid, setPmid] = useState(""); // 사용자가 입력한 pmid
  const [result, setResult] = useState(null); // API 응답 데이터
  const [error, setError] = useState(null); // 에러 메시지

  const searchPmid = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/idivine/search/${pmid}/`
      );
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("검색 결과가 없습니다.");
      setResult(null);
    }
  };
  return (
    <Div>
      <Menu />
      <div id="searchbar">
        <h1>PMID : </h1>
        <input
          type="text"
          value={pmid}
          onChange={(e) => setPmid(e.target.value)} // pmid 입력 핸들러
        />
        <button onClick={searchPmid}>Search</button>
      </div>
      <div id="resultarea">
        <h2>Text:</h2>
        <div id="resulttext">
          {error && <p>{error}</p>}
          {result && (
            <div>
              <p>{JSON.stringify(result.keyword_info[0].text, null, 2)}</p>
            </div>
          )}
        </div>
      </div>
    </Div>
  );
}

export default SearchByPmid;
