export const emailMessage = (name: string, url: string, token: string) => {
    const verificationUrl = `${url}?token=${token}`;

    const message = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verification - Shopora</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333333;">Verify Your Email Address</h2>
              </td>
            </tr>
            <tr>
              <td style="color: #555555; font-size: 16px; line-height: 1.5; text-align: center; padding-bottom: 30px;">
                Hello ${name},<br><br>
                Thank you for signing up on <strong>Shopora</strong>! Please verify your email address by clicking the button below.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 30px;">
                <a href="${verificationUrl}" 
                   style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Verify Email
                </a>
              </td>
            </tr>
            <tr>
              <td style="color: #888888; font-size: 14px; line-height: 1.5; text-align: center;">
                If you did not create an account on Shopora, you can safely ignore this email.<br>
                This link will expire in 15 minutes.
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #555555; font-size: 14px; padding-top: 30px;">
                Best regards,<br>
                <strong>Shopora</strong> Support Team
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

    return message;
};
