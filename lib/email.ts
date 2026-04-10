/**
 * Email Service Utility
 * 
 * This file provides functions to send emails for contact form submissions.
 * You can integrate with any email service provider:
 * - SendGrid (https://sendgrid.com)
 * - Resend (https://resend.com)
 * - AWS SES
 * - Nodemailer with SMTP
 * 
 * For now, this is a placeholder that logs to console.
 * To enable email notifications, choose a provider and implement the sendEmail function.
 */

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send confirmation email to user after contact form submission
 */
export async function sendConfirmationEmail(userData: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const { name, email, message } = userData;

  const emailContent: EmailData = {
    to: email,
    subject: 'Thank you for contacting Pixen India Digital!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for contacting <strong>Pixen India Digital</strong>. We've received your message and our team will review it shortly.</p>
              
              <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3>Your Message:</h3>
                <p style="color: #666; font-style: italic;">"${message}"</p>
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your inquiry within <strong>24 hours</strong></li>
                <li>We'll respond to this email address (${email}) with next steps</li>
                <li>If urgent, we may also try to reach you by phone</li>
              </ul>
              
              <p style="margin-top: 30px;">Need immediate assistance? Feel free to reach out directly:</p>
              <p>
                📧 <a href="mailto:Pixenindiadigital@gmail.com" style="color: #667eea;">Pixenindiadigital@gmail.com</a><br/>
                📞 <strong>+91 78277 17445</strong>
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://pixenindia.com/pricing" class="button">View Our Plans & Get Started</a>
              </div>
              
              <p style="margin-top: 30px;">Looking forward to helping your business grow!</p>
              
              <p>Best regards,<br/>
              <strong>The Pixen India Digital Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Pixen India Digital. All rights reserved.</p>
              <p>India (Remote-First Agency)</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${name},

      Thank you for contacting Pixen India Digital!

      We've received your message and our team will review it shortly.

      Your Message:
      "${message}"

      What happens next?
      - Our team will review your inquiry within 24 hours
      - We'll respond to this email address (${email}) with next steps
      - If urgent, we may also try to reach you by phone

      Need immediate assistance?
      Email: Pixenindiadigital@gmail.com
      Phone: +91 78277 17445

      View our plans & get started: https://pixenindia.com/pricing

      Looking forward to helping your business grow!

      Best regards,
      The Pixen India Digital Team
    `
  };

  try {
    // TODO: Implement actual email sending logic here
    // Choose one of the following options:

    // OPTION 1: Using Resend (Recommended - easiest setup)
    // npm install resend
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY || '');
    // await resend.emails.send(emailContent);

    // OPTION 2: Using SendGrid
    // npm install @sendgrid/mail
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    // await sgMail.send(emailContent);

    // OPTION 3: Using Nodemailer with SMTP
    // npm install nodemailer
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({ /* SMTP config */ });
    // await transporter.sendMail(emailContent);

    // For now, log to console (remove this in production)
    console.log('📧 Confirmation email would be sent to:', email);
    console.log('Subject:', emailContent.subject);
    console.log('--- Email content logged above ---');

    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}

/**
 * Send notification email to admin when new lead comes in
 */
export async function sendAdminNotification(userData: {
  name: string;
  email: string;
  phone?: string;
  businessType: string;
  budget: string;
  message: string;
}): Promise<boolean> {
  const { name, email, phone, businessType, budget, message } = userData;

  const adminEmail: EmailData = {
    to: 'Pixenindiadigital@gmail.com', // Change to your admin email
    subject: `🔥 New Lead: ${name} - ${businessType}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .button { display: inline-block; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Lead Received!</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Phone:</span> ${phone || 'Not provided'}
              </div>
              <div class="field">
                <span class="label">Business Type:</span> ${businessType}
              </div>
              <div class="field">
                <span class="label">Budget:</span> ${budget}
              </div>
              <div class="field">
                <span class="label">Message:</span><br/>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: Your inquiry to Pixen India" class="button">Reply to Lead</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      🔥 NEW LEAD RECEIVED!

      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Business Type: ${businessType}
      Budget: ${budget}

      Message:
      ${message}

      Reply to: ${email}
    `
  };

  try {
    // TODO: Implement actual email sending logic here (same as above)
    
    // For now, log to console
    console.log('📧 Admin notification would be sent to: Pixenindiadigital@gmail.com');
    console.log('New lead from:', name, '(', email, ')');
    console.log('--- Lead details logged above ---');

    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}
