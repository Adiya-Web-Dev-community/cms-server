const express = require("express");
require("dotenv").config();
const Port = process.env.PORT || 8888;
const accountMiddleware = require("./socketHelper/socketmiddleware");
const {
  addDropdownMenu,
  Delet_DropDown_By_Id,
  Update_Nav_By_Id,
  Update_Comonent,
  Update_LayoutType,
  Update_Layout_data,
} = require("./socketHelper/index");
const app = express();
var cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["Get", "Post", "Put", "Delete"],
    credentials: true,
  },
});
// Account Router
app.use(require("./router/web/accountRouter"));
app.use(require("./router/web/productRouter"));
app.use(require("./router/web/templateRouter"));
app.use(require("./router/appDev/nativeProductRoute"));
//user
app.use(require("./router/app/user"));
//app
app.use(require("./router/app/template"));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

server.listen(Port, (port) => {
  console.log("Server is running on port:", Port);
});
io.on("connection", (socket) => {
  console.log("connection socket Established", socket.id);
  socket.on("PostNavItem", async (items) => {
    console.log("Token data socket>>>", items);
    try {
      const UserId = await accountMiddleware(items?.token);
      if (UserId) {
        const res = await addDropdownMenu(items?.data, items.productId);
        console.log("response", res);
        io.emit("NavData", res);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("DeleteNav", async (item) => {
    try {
      const UserId = await accountMiddleware(item?.token);
      console.log("Nav Delete Item", UserId);
      if (UserId) {
        const res = await Delet_DropDown_By_Id(item?.id, item.productId);
        io.emit("AfterDeleteNavData", res);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("UpdateNav", async (item) => {
    try {
      // console.log("Nav Updated Item??",item);

      const UserId = await accountMiddleware(item?.token);
      // console.log("Nav Updated Item>>>",item);
      if (UserId) {
        const res = await Update_Nav_By_Id(
          item?.data,
          item?.id,
          item.productId
        );
        console.log("Nav Updated Item>>>", res);

        io.emit("UpdatedNavData", res);
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("setLayout_type", async (item) => {
    try {
      const UserId = await accountMiddleware(item?.token);

      if (UserId) {
        const res = await Update_LayoutType(
          item?.data,
          item.productId,
          item?.navId,
          item?.path
        );
        console.log("items items>>", res);

        io.emit("updated_layout", res);
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("Update_Layout_By_id", async (item) => {
    try {
      const UserId = await accountMiddleware(item?.token);

      if (UserId) {
        const res = await Update_Layout_data(
          item?.data,
          item.productId,
          item?.navId,
          item?.layoutId
        );

        console.log("baba items>>", res);
        io.emit("Update_Layout_data", res);
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("updateComponent", async (item) => {
    try {
      const UserId = await accountMiddleware(item?.token);
      if (UserId) {
        const res = await Update_Comonent(item?.data, item?.id, item.productId);
        console.log("Component Updated Item>>>", res);

        // io.emit("UpdatedComponent",res);
      }
    } catch (er) {
      console.error(er);
    }
  });
});
