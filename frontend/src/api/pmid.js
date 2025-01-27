import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/idivine/",
});

// 1. 검색하기(finder)
export const getInfo = async (pmid) => {
  return await instance.get("search/" + pmid + "/");
};

// 2. 등록하기(manager)
export const insertInfo = (data) => {
  return instance.post("manage/", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 2. 삭제하기(manager)
export const deleteInfo = async (pmid) => {
  console.log(pmid);
  return await instance.delete("manage/" + pmid);
};
