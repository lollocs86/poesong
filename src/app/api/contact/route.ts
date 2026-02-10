import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, cognome, email, messaggio } = body;

    // Validazione
    if (!nome || !cognome || !email || !messaggio) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Indirizzo email non valido' },
        { status: 400 }
      );
    }

    // Configura il trasporto email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Contenuto email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'pinosassano@hotmail.com',
      replyTo: email,
      subject: `Nuovo messaggio da ${nome} ${cognome} - PoeSong`,
      text: `
Nome: ${nome}
Cognome: ${cognome}
Email: ${email}

Messaggio:
${messaggio}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1e3a8a; }
    .message { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 10px; }
    .footer { margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Nuovo messaggio da PoeSong</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nome:</span> ${nome}
      </div>
      <div class="field">
        <span class="label">Cognome:</span> ${cognome}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Messaggio:</span>
        <div class="message">${messaggio.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Questo messaggio è stato inviato dal form di contatto di poesong.it
    </div>
  </div>
</body>
</html>
      `,
    };

    // Invia email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Errore invio email:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'invio del messaggio. Riprova più tardi.' },
      { status: 500 }
    );
  }
}
