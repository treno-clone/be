const welcomeTemplate = (email, username) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Xin chào ${username}!</h2>
      <p>Cảm ơn bạn đã đăng ký tài khoản với email <strong>${email}</strong>.</p>
      <p>Chào mừng bạn đến với <strong>Treno</strong> 🎉</p>
      <p>Chúng tôi rất vui khi bạn trở thành một phần của cộng đồng. 
         Hãy bắt đầu khám phá và trải nghiệm dịch vụ ngay hôm nay!</p>
      <hr/>
      <p style="font-size: 12px; color: #555;">
        Đây là email tự động, vui lòng không trả lời trực tiếp.
      </p>
    </div>
  `;
};

export default welcomeTemplate;
