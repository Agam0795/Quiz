const nodemailer = require('nodemailer');

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - QuizMaster',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>You requested a password reset for your QuizMaster account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

// Send quiz invitation email
const sendQuizInvitation = async (emails, quiz, inviterName, message = '') => {
  const transporter = createTransporter();
  
  const quizUrl = `${process.env.CLIENT_URL}/quiz/${quiz._id}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(','),
    subject: `Quiz Invitation: ${quiz.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">You're Invited to Take a Quiz!</h2>
        <p><strong>${inviterName}</strong> has invited you to take the quiz: <strong>${quiz.title}</strong></p>
        
        ${quiz.description ? `<p style="color: #666; font-style: italic;">${quiz.description}</p>` : ''}
        
        ${message ? `
          <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin: 16px 0;">
            <p style="margin: 0; color: #374151;"><strong>Personal message:</strong></p>
            <p style="margin: 8px 0 0 0; color: #374151;">"${message}"</p>
          </div>
        ` : ''}
        
        <div style="background-color: #eff6ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; color: #1e40af;"><strong>Quiz Details:</strong></p>
          <p style="margin: 4px 0; color: #1e40af;">Category: ${quiz.category || 'General'}</p>
          <p style="margin: 4px 0; color: #1e40af;">Questions: ${quiz.questions?.length || 0}</p>
          ${quiz.timeLimit ? `<p style="margin: 4px 0; color: #1e40af;">Time Limit: ${quiz.timeLimit} minutes</p>` : ''}
        </div>
        
        <a href="${quizUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Take Quiz Now
        </a>
        
        <p style="color: #666; font-size: 14px;">Or copy and paste this link: ${quizUrl}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

// Send email verification
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification - QuizMaster',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to QuizMaster!</h2>
        <p>Thank you for registering. Please verify your email address to complete your account setup.</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Verify Email
        </a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendQuizInvitation,
  sendVerificationEmail
};
