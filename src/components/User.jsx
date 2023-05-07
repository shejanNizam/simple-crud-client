import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "./Header";

const User = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) => {
    console.log(_id);

    fetch(`http://localhost:7000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount > 0) {
          alert("deleted successfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      });
  };

  return (
    <>
      <Header />
      <h3> All Users: {users?.length} </h3>
      {users?.map((user) => (
        <p key={user?._id}>
          {user?.name} : {user?.email} : {user?._id}
          <Link to={`/update/${user?._id}`}>
            <button> Update </button>
          </Link>
          <button onClick={() => handleDelete(user?._id)}>x</button>
        </p>
      ))}
    </>
  );
};

export default User;
