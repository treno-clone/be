const sendResetCodeTemplate = (token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Yêu cầu đặt lại mật khẩu</h2>
      <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
      <p>Vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu:</p>
      <a href="${resetLink}" 
         style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
         Đặt lại mật khẩu
      </a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
      <p>Liên kết sẽ hết hạn sau 15 phút.</p>
    </div>
  `;
};

export default sendResetCodeTemplate;
