import dotenv from "dotenv";
dotenv.config({
    // Nếu có nhiều môi trường và muốn chọn env cụ thể
    // path: [],
    // utf 8 là mặc định, cho nodejs biết đọc file bằng bảng mã nào
    // encoding: "utf8", 
    // cho phép .env ghi đè biến môi trường có sẵn
    // override: true
});

export const {
    HOST, PORT, DB_URL, JWT_SECRET, JWT_EXPIRE_IN
} = process.env;