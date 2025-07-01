
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
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@sim.xaxa.win',
      to: email,
      subject: 'SIM.XAXA.WIN - Kod weryfikacyjny',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff41;">SIM.XAXA.WIN</h2>
          <p>Twój kod weryfikacyjny: <strong style="font-size: 24px; color: #00ff41;">${code}</strong></p>
          <p>Wprowadź ten kod na stronie, aby zweryfikować swoje konto.</p>
          <p style="color: #666; font-size: 12px;">Jeśli nie zakładałeś konta, zignoruj tę wiadomość.</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};
