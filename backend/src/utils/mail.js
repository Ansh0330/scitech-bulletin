import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "SciTech Bulletins",
      link: "https://mailgen.js/",
    },
  });
  // Generate an HTML email with the provided contents
  var emailHtml = mailGenerator.generate(options.mailGenContent);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Scitech Bulletin",
    to: options.email,
    subject: options.subject,
    html: emailHtml,
    text: emailText,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error in sending mail: ", error);
  }
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to SciTech Bulletins! We\'re very excited to have you on board.",
      action: {
        instructions: "To get started with SciTech Bulletins, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro:
        "You have requested to reset your password. Click the button below to reset your password.",
      action: {
        instructions: "To reset your password, click here:",
        button: {
          color: "#6C757D", // Optional action button color
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  sendMail,
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
};

// sendMail({
//   email:user.email,
//   subject:"Verify your email",
//   mailGenContent:emailVerificationMailGenContent(user.username,verificationUrl)
// })
