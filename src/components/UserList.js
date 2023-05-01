import { useEffect, useState } from "react";

export default () => {
  const [users, setUsers] = useState([]);

  window.submitForm = (name) => {
    alert("Submiting form for " + name);
    users[users.length - 1].name += " (*)"; // mark the previous employee
    if (users[users.length - 2].name.includes("(*)")) {
      let prevPrevNameArray = users[users.length - 2].name.split(" ");
      prevPrevNameArray.pop();
      users[users.length - 2].name = prevPrevNameArray.join(" ");
    }
    setUsers([...users, { id: users.length + 1, name: name }]);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((foo) => {
      foo.json().then((bar) => {
        setUsers(bar);
      });
    });
  }, []);

  if (users.length === 0) return <></>;

  return (
    <div style={{ background: "yellow", marginTop: 5 }}>
      <h4 style={{ margin: 0, marginBottom: 20, textDecoration: "underline" }}>
        List of users
      </h4>
      <div>
        {users.map((d) => (
          <Name data={d} />
        ))}
      </div>
    </div>
  );
};

export const Name = ({ data }) => {
  return <li key={data.id}>{data.name}</li>;
};

// export let userList;
