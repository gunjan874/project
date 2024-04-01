const nodemailer = require("nodemailer");

const mailSender = async(email,title,body)=>{
    try{

        // transporter is created using createTransport function
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS, // this is for password
            },
        });

        let info = await transporter.sendMail({
            from:"Studynotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        });

        console.log(info);
        return info;

    }catch(error){
        console.log(error.message);

    }
};

module.exports = mailSender;