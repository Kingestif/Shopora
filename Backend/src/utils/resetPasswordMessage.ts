export const resetPasswordMessage = (url: string, token: string) => {
    const resetUrl = `${url}?token=${token}`;

    const message = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset - Shopora</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333333;">Reset Your Password</h2>
              </td>
            </tr>
            <tr>
              <td style="color: #555555; font-size: 16px; line-height: 1.5; text-align: center; padding-bottom: 30px;">
                We received a request to reset your password for your <strong>Shopora</strong> account. Click the button below to set a new password.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 30px;">
                <a href="${resetUrl}" 
                   style="background-color: #FF6B6B; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </td>
            </tr>
            <tr>
              <td style="color: #888888; font-size: 14px; line-height: 1.5; text-align: center;">
                If you did not request a password reset, you can safely ignore this email.<br>
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
