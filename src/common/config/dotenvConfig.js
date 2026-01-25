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
    HOST, URL, PORT, DB_URL, JWT_ACCESS, JWT_REFRESH, JWT_ACCESS_EXPIRES, JWT_REFRESH_EXPIRES, EMAIL_USER,
EMAIL_PASSWORD 
} = process.env;