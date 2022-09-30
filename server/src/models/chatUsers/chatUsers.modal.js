const chatUsers = require("./chatUsers.mongo");

const USERS_DATA = [
  {
    userId: "18t8778678687613",
    userName: "Priyank ",
    userAvatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    userId: "23986749694723",
    userName: "Manvainder",
    userAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    userId: "73459587589738",
    userName: "Mohit",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const loadChatUsers = async () => {
  USERS_DATA.map(async (user) => {
    await chatUsers.updateOne(
      {
        userId: user.userId,
      },
      user,
      {
        upsert: true,
      }
    );
  });
};

module.exports = {
  loadChatUsers,
};
