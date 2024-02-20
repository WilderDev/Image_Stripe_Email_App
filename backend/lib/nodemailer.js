async function sendEmail({ subject, html, text, recipient }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'mandy.corkery97@ethereal.email',
      pass: '9VvDQfFMTR9PTGFBn1',
    },
  });

  const email = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: newSecretImageFromDB.recipient,
    subject: newSecretImageFromDB.subject,
    html: `
      <h1>I took a pic for you...</h1>

      <img src="${newSecretImageFromDB.image}" alt="" style="width: 250px; height: 250px" />

      <h2>Want more?</h2>

      <a href="https://google.com">CLICK HERE!</a>
     `,
  });

  return email;
}

module.exports = sendEmail;
