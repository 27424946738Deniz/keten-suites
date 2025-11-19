import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface BookingEmailData {
  bookingReference: string;
  guestName: string;
  guestEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  propertyName: string;
}

export const sendBookingConfirmationEmail = async (
  data: BookingEmailData
) => {
  if (!resend) {
    console.warn("Resend API key not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@keten.com",
      to: data.guestEmail,
      subject: `Booking Confirmation - ${data.bookingReference}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Dear ${data.guestName},</p>
              
              <p>Thank you for your booking request. We have received your reservation and will confirm it shortly.</p>
              
              <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea;">Booking Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Booking Reference:</td>
                    <td style="padding: 8px 0;">${data.bookingReference}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Property:</td>
                    <td style="padding: 8px 0;">${data.propertyName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Check-in:</td>
                    <td style="padding: 8px 0;">${new Date(data.startDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Check-out:</td>
                    <td style="padding: 8px 0;">${new Date(data.endDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Total Price:</td>
                    <td style="padding: 8px 0;">₺${data.totalPrice.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
              
              <p>We will contact you shortly to confirm your booking and provide further details.</p>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Keten Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              <p>This is an automated email. Please do not reply directly to this message.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    throw error;
  }
};

