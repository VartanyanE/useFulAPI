import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";

import {
  getData,
  createData,
  upDateData,
  deleteData,
  likeCount,
} from "./utils/API";

const App = () => {
  const [data, setData] = useState([{}]);
  const [editData, setEditData] = useState([{}]);
  const [dataBase, setDataBase] = useState([{}]);
  const [edit, setEdit] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const [like, setLike] = useState({});
  const [image, setImage] = useState({});

  // when our component mounts we run getData from our API and set our state
  useEffect(() => {
    getData().then(({ data }) => setDataBase(data));
  }, []);

  // when form is submmited we run createData from our API  and pass in our state
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createData(data);
    getData().then(({ data }) => setDataBase(data));
  };

  const handleButton = async (id) => {
    await setCurrentId(id);

    setEdit(true);
  };

  const handleEdit = async () => {
    setEdit(false);
    await upDateData(currentId, editData);
    getData().then(({ data }) => setDataBase(data));
  };

  const handleLike = async (id) => {
    setLike(like + 1);
    await setCurrentId(id);
    await getData().then(({ data }) => setDataBase(data));

    likeCount(id);
  };

  const uploadImage = async () => {
    console.log(image);
    await createData(image);
    getData().then(({ data }) => setDataBase(data));
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    getData().then(({ data }) => setDataBase(data));
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
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage({ ...image, selectedFile: base64 })}
      />{" "}
      <button type="submit" onClick={uploadImage}>
        Upload Image
      </button>
      <div>
        {dataBase.map((item) => (
          <div>
            <h5>
              {item.title} {item.message}LIKES---{item.likeCount}
              <button onClick={() => handleButton(item._id)}>Edit</button>{" "}
              <button onClick={() => handleLike(item._id)}>Like</button>{" "}
              <button onClick={() => handleDelete(item._id)}>Delete</button>{" "}
            </h5>
            {item.selectedFile}
          </div>
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
