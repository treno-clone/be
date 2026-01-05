import express from "express"
import connectDB from "./src/config/connectDB"
import appRoute from "./src/routes"
//tạo ra 1 server express mang tên app
const app = express()
// cho phép nhận vào body dạng JSON, nếu không có thì body dạng JSON sẽ thành undefined
// app.use -> middleware dùng cho tất cả các request
app.use(express.json())
connectDB()

app.use("/", appRoute)
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})

