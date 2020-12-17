import React, { useEffect, useState } from "react";
import { getData, createData, upDateData } from "./utils/API";

const App = () => {
  const [data, setData] = useState([{
    // title: "",
    // message: "",
  }]);

  const [dataBase, setDataBase] = useState([{
    title: "",
    message: "",
  }]);
  // when our component mounts we run getData from our API and set our state
  useEffect(() => {
    getData().then(({ data }) => setDataBase(data));
  }, [setData]);
//   console.log(dataBase)
  // when form is submmited we run createData from our API  and pass in our state
  const handleSubmit = (event) => {
    event.preventDefault();
    createData(data);
    // console.log(data);
  };

const handleButton = (id) => {
console.log(id);
upDateData(id);
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label>Message</label>
        <input
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
        <button type="submit">Submit Data</button>
      </form>
  <div>{dataBase.map((item) => (
      <h1>{item.title} {item.message}<button onClick={()=> handleButton(item._id)}>Edit</button></h1>
  ))}</div>
    </div>
  );
};

export default App;
