require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { get_Current_User, user_Disconnect,broadcastToRoomUsers,join_User } = require("./socket/dummyuser");

const Routes = require('./routes/index');
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


const { PORT } = require("./constants");
const { BASECLIENTURL } = require("./constants");
mongo.connect();

app.use('/api', Routes);

app.use(cors());

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
   console.log(`✅ Server is listening on port: ${PORT}`);
});



const server = require("socket.io")(http, {
  cors: {
    origin:   "http://localhost:3000",
  },
});

//initializing the socket io connection
server.on("connection", (socket) => {
  console.log("connected");
  //for a new user joining the room
  socket.on("joinRoom", ({ username, room }) => {
    //* create user
    const p_user = join_User(socket.id, username, room);
    // console.log(p_user)
    console.log(socket.id, "=id");
    console.log(socket.join(p_user.room));
    socket.join(p_user.room);

    // socket.emit("message", {
    //   user: p_user,
    //   text: "you created room"
    // });
    let allUsers = broadcastToRoomUsers(p_user.room);
    console.log(allUsers, "Filled Room");
    server.sockets.in(p_user.room).emit("message", {users: allUsers});
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);

    socket.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    // const p_user = user_Disconnect(socket.id);

    // if (p_user) {
    //   io.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has left the room`,
    //   });
    // }
  });
  socket.on("start", ({username, room})=>{
    const p_user = join_User(socket.id, username, room);
    server.sockets.in(p_user.room).emit("start");
  })
});
//  }

// bootstrap();
