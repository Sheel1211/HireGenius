function createData(id, name, email) {
  return { id, name, email };
}

export const dummyCSVData = [
  createData(1, "name1", "username1@gmail.com"),
  createData(2, "name2", "username2@gmail.com"),
  createData(3, "name3", "username3@gmail.com"),
  createData(4, "name4", "username4@gmail.com"),
];
