import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendVerifyEmail = async({email, emailType, userId}: any) =>{

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 36000000}
            });
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 36000000}
        });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.GMAIL_FROM,
              pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Need to be change as per product  owner.
        const fromData = {name: 'Ujwal Yangalwar', address: 'ujwalyangalwar11@gmail.com'}

        const mailOptions = {
            from: fromData,
            to: email,
            subject: emailType==='VERIFY' 
                ? "Verify your email" 
                : "Reset your password",
            html: `<p>
                    Click
                    <a href="${process.env.NEXTAUTH_URL}/verifyemail?token=${hashedToken}">here</a> to
                    ${emailType === 'VERIFY' 
                        ? "verify your email" 
                        : "reset your password"}
                    or copy and paste the link below in your browser
                    <br>${process.env.NEXTAUTH_URL}/verifyemail?token=${hashedToken}
                </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(mailResponse);
        return mailResponse;
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}