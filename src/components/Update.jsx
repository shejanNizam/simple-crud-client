import React from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUsers = useLoaderData();
  // console.log(loadedUsers);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);
    const updatedUser = { name, email };

    fetch(`http://localhost:7000/users/${loadedUsers?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("User Updated Successfully");
        }
      });
  };

  return (
    <div>
      <h3>Update is coming </h3>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={loadedUsers?.name} />
        <br />
        <input type="email" name="email" defaultValue={loadedUsers?.email} />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default Update;
