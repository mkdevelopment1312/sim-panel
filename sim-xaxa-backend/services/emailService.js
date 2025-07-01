
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email, code) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@sim.xaxa.win',
      to: email,
      subject: 'SIM.XAXA.WIN - Weryfikacja konta',
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #050505; color: #ffffff; padding: 20px;">
          <h1 style="color: #00ff41; text-align: center;">SIM.XAXA.WIN</h1>
          <p>Twój kod weryfikacyjny:</p>
          <h2 style="color: #00ff41; text-align: center; font-size: 32px; letter-spacing: 4px;">${code}</h2>
          <p>Wprowadź ten kod na stronie, aby zweryfikować swoje konto.</p>
          <p style="color: #666;">Kod jest ważny przez 24 godziny.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Błąd wysyłania e-mail');
  }
};
