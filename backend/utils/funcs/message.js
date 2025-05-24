const sendMessage = async (phone, text) => {
  const response = await fetch(
    `${process.env.ASANAK_WEB_SERVICE_URL}/sendsms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.ASANAK_USERNAME,
        password: process.env.ASANAK_PASSWORD,
        Source: process.env.ASANAK_SOURSE_NUMBER,
        destination: phone,
        Message: text,
      }),
    }
  );


  
};

module.exports = { sendMessage };
