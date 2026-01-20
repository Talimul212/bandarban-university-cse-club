import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      batch,
      session,
      department,
      reason,
      transactionId,
    } = await req.json();

    // Transporter configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"BU CSE Club" <${process.env.SMTP_USER}>`, // Sender Email here
      to: `${email}`, // Reciever email is here
      subject: "New Membership Registration",
      html: `
        <h2>New Membership Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Batch:</strong> ${batch}</p>
        <p><strong>Session:</strong> ${session}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 },
    );
  }
}
