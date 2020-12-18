import React, { useEffect, useState } from "react";
import { getData, createData, upDateData } from "./utils/API";

const App = () => {
  const [data, setData] = useState([
    {
      // title: "",
      // message: "",
    },
  ]);

  const [editData, setEditData] = useState([
    {
      // title: "",
      // message: "",
    },
  ]);

  const [dataBase, setDataBase] = useState([
    {
      title: "",
      message: "",
    },
  ]);

  const [edit, setEdit] = useState(null);
  const [currentId, setCurrentId] = useState("");
  // when our component mounts we run getData from our API and set our state
  useEffect(() => {
    getData().then(({ data }) => setDataBase(data));
  }, []);
  //   console.log(dataBase)
  // when form is submmited we run createData from our API  and pass in our state
  const handleSubmit = (event) => {
    event.preventDefault();
    createData(data);
    // console.log(data);
  };

  const handleButton = async (id) => {
    await setCurrentId(id);
    console.log(currentId);

    setEdit(true);
  };

  const handleEdit = async () => {
    setEdit(false);
    upDateData(currentId, editData);
    await setDataBase([editData]);
    console.log(editData);
  };

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
      <div>
        {dataBase.map((item) => (
          <h5>
            {item.title} {item.message}
            <button onClick={() => handleButton(item._id)}>Edit</button>{" "}
          </h5>
        ))}
        {edit ? (
          <form onSubmit={handleEdit}>
            <label>Title</label>
            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <label>Message</label>
            <input
              value={editData.message}
              onChange={(e) =>
                setEditData({ ...editData, message: e.target.value })
              }
            />
            <button type="submit">Edit Data</button>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
