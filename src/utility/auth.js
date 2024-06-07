import { v4 as uuidv4 } from "uuid";

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user;
};

export const signupUser = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some(
    (user) => user.username === username || user.email === email
  );

  if (userExists) {
    return null;
  }

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};
