import express from "express";
import connectDB from "./src/common/config/connectDB.js";
import appRoute from "./src/router.js";
import { PORT, URL } from "./src/common/config/dotenvConfig.js";
//tạo ra 1 server express mang tên app
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // FE domain
    credentials: true, // Cho phép gửi cookie, header Authorization
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Các method cho phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các header cho phép
  }),
);
// cho phép nhận vào body dạng JSON, nếu không có thì body dạng JSON sẽ thành undefined
// app.use -> middleware dùng cho tất cả các request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/", appRoute);
app.listen(PORT, () => {
  console.log(`Server is running on ${URL}:${PORT}`);
});
