const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendFailureEmail = async (log) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `Monitor Alert <${process.env.EMAIL_FROM}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `❗ Failure Alert: ${log.interfaceName}`,
      text: `
Failure detected in interface:
- Interface: ${log.interfaceName}
- Integration Key: ${log.integrationKey}
- Status: ${log.status}
- Message: ${log.message}
- Time: ${new Date(log.createdAt).toLocaleString()}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Failure alert sent');
  } catch (err) {
    console.error('❌ Email sending failed', err);
  }
};

module.exports = sendFailureEmail;
