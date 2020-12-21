import React, { useEffect, useState } from "react";
import {
  getData,
  createData,
  upDateData,
  deleteData,
  likeCount,
  getLikes,
} from "./utils/API";

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
  const [like, setLike] = useState({});
  // when our component mounts we run getData from our API and set our state
  useEffect(() => {
    getData().then(({ data }) => setDataBase(data));
    // getLikes(currentId).then(({ data }) => setLike(data));
  }, []);
  // console.log(dataBase);
  console.log(currentId);
  console.log(like);
  //   console.log(dataBase)
  // when form is submmited we run createData from our API  and pass in our state
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createData(data);
    getData().then(({ data }) => setDataBase(data));

    // console.log(data);
  };

  const setLikeFunction = async () => {
    let addLike = await dataBase[0].likeCount;
    await console.log(dataBase);
    // setLike({
    //   likeCount: parseInt(addLike),
    // });
  };

  const handleButton = async (id) => {
    await setCurrentId(id);
    console.log(currentId);

    setEdit(true);
  };

  const handleEdit = async () => {
    setEdit(false);
    await upDateData(currentId, editData);
    getData().then(({ data }) => setDataBase(data));
    // await setDataBase([editData]);
    console.log(editData);
  };

  const handleLike = async (id) => {
    // console.log(dataBase);
    await setCurrentId(id);

    // let addLike = (await dataBase[0].likeCount) + 1;
    // await console.log(currentId);
    // await setLike({
    //   likeCount: addLike,
    // });
    // await console.log(like);
    // await setDataBase([{ ...dataBase, likeCount: addLike }]);
    // await console.log(dataBase);
    // console.log(like);
    // await setLike({ ...like, likeCount: addLike });
    // await console.log(like);
    // await console.log(like);
    // // setDataBase({
    // //   likeCount:
    // // })
    // // await getLikes(id).then(({ data }) =>
    // //   setLike({
    // //     likeCount: data.likeCount + 1,
    // //   })
    // // );
    // // console.log(like);
    // // var addLike = like + 1;

    // // console.log(response.data.likeCount);
    // // console.log(addLike);
    // // await setLike({ likeCount: addLike });
    // // console.log(like);
    // await upDateData(id, dataBase);

    await likeCount(id);
    // await getData().then(({ data }) => setDataBase(data));
    // // await setDataBase([editData]);
    // console.log(dataBase);
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
      <div>
        {dataBase.map((item) => (
          <h5>
            {item.title} {item.message}LIKE COUNT---{item.likeCount}
            <button onClick={() => handleButton(item._id)}>Edit</button>{" "}
            <button onClick={() => handleLike(item._id)}>Like</button>{" "}
            <button onClick={() => handleDelete(item._id)}>Delete</button>{" "}
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
