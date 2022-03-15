module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'mail.privateemail.com'),
                port: env('SMTP_PORT', 465),
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
            },
            settings: {
                defaultFrom: env('EMAIL_USER', 'info@performancepackuf.com'),
                defaultReplyTo: env('EMAIL_USER', 'info@performancepackuf.com'),
            },
        },
    },
    upload: {
        config: {
            breakpoints: {
                xlarge: 2560,
                large: 1000,
                medium: 750,
                small: 500
            },
        },
    },
});