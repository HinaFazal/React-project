const getUsers = async () => {
    console.log("11111");
    // const [users, posts] = await Promise.all([
    //   axios.get("https://dummyjson.com/users"),
    //   axios.get("https://dummyjson.com/posts"),
    // ]);
    const users = await axios.get("https://dummyjson.com/users");
    // const userId = users?.data?.users[1].id;
    // const posts = await axios.get(
    //   `https://dummyjson.com/users/${userId}/posts`
    // );
    console.log("res: ", users);
  };