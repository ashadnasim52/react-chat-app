const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config//secret");
const chatRoute = require("./routes/api/chat");
const userRoute = require("./routes/api/user");

//Importing User Model
const User = require("./model/User");
//Importing Chat Model
const Chat = require("./model/Chat");

const app = express();
const PORT = process.env.PORT || 8000;

//initializing socketio
const server = require("http").Server(app);
const io = require("socket.io")(server);

let onlineUser = [];

//connecting mongodb
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("server", `connected db...`);
  })
  .catch(err => console.error(err));

//initalizing bodyparser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//using route
// app.use(chatRoute);
app.use(userRoute);

// ! maybe fixed :-----  TODO when server started then new socketid is not assigned......ie when this devlopemnt server starting

//Starting socket.io part
//as soonas the connection occurs ,ie, the login completed in react part then connection established
io.of("/chat").on("connection", socket => {
  console.log(`connected.... ${socket.id}`);

  //Emiting socket Id to the client
  socket.emit("socketid", socket.id);

  //Telling every body that new User joined but not workinf fully
  //TODO it tells only to new uSer
  socket.broadcast.emit("newuser", "data");

  //When  cleint side sent User ID of mongodb object

  socket.on("userId", data => {
    // console.log('they emitted', data);

    //Finding data and inserting its socket.id
    //Which is new every time
    User.updateOne(
      {
        _id: data
      },
      {
        $set: {
          socket: socket.id
        }
      },
      (err, response) => {
        if (err) throw err;
        console.log("io/cha", response);
        if (response) {
          //this block is not working
          User.findOne({
            _id: data
          }).then(found => {
            if (found) {
              console.log(found.socket);

              socket.to(found.socket).emit("soc", {
                data: "to chack"
              });
            }
          });
        }
      }
    );
  });

  socket.on("newUserConnected", newUserData => {
    User.findOne({
      _id: newUserData._id
    }).then(user => {
      onlineUser.push(user);
      console.log("onlineuser", onlineUser);
      //to send every body understand.......
      socket.broadcast.emit("onlineUser", onlineUser);
    });
  });

  // Client is sending UserID (of mongoDb of reciever) and message to the client
  socket.on("startChat", data => {
    console.log("io/chat", data);

    //finding user from mongodb database and afterthat finding the socket id of the sender and after that sending to that user only
    User.findOne({
      _id: data.userId
    })
      .then(findedUser => {
        console.log("io/chat", findedUser);
        // socket.broadcast()
        //Sending to finded user socket id
        socket.to(findedUser.socket).emit("message", {
          message: data.message,
          userId: data.userId,
          senderId: data.senderId
        });
        //Saving the message

        Chat.findOne({
          chatId: data.senderId + "__" + data.userId
        }).then(isFound => {
          if (!isFound) {
            const newChat = new Chat({
              chatId: data.senderId + "__" + data.userId,
              senderId: data.senderId,
              recieverId: data.userId,
              lastConnection: data.time
            });
            newChat
              .save()
              .then(() => {
                console.log(
                  `new chat started by ${data.senderId} and ${data.userId}`
                );
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            const message = {
              message: data.message,
              by: data.senderId,
              date: Date()
            };
            console.log("message", message);
            // console.log('old message', isFound.messages);
            // let newMessages = [{}];
            // newMessages = newMessages.push(message);
            // console.log(`new messages ${newMessages}`);

            Chat.update(
              {
                chatId: data.senderId + "__" + data.userId
              },
              {
                $push: {
                  messages: message
                }
              }
            )
              .then(() => {
                console.log(`message iserted....`);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      })
      .catch(err => {
        console.log("io/chat/err", err);
      });
  });
  socket.on("disconnect", () => {
    //Disconnected
    // Client has been disconnected now

    User.findOne({
      socket: socket.id
    })
      .then(left => {
        console.log("lefted", left);
        //TODO do filter in write way
        onlineUser = onlineUser.filter(oneUser => {
          console.log("one user", oneUser.socket);
          console.log("left user", left.socket);
          // ? need to filter the one who left but unable to do that

          if (oneUser.socket !== left.socket) {
            console.log("====================================");
            console.log("returned true");
            console.log("====================================");
            return true;
          } else {
            console.log("====================================");
            console.log("returned false");
            console.log("====================================");
            return false;
          }
        });

        console.log("after dissconnection...", onlineUser);
      })
      .catch(err => console.log(err));
    // onlineUser.pop(newUserData);

    // socket.emit('onlineUser', onlineUser);
    socket.emit("onlineUser", onlineUser);
    socket.emit("dis", "hu");
    console.log("io/chat", `disconnected....... ${socket.id}`);
  });
});

//lIstening to the port
server.listen(PORT, () => {
  console.log(`server is connected on ${PORT}`);
});
