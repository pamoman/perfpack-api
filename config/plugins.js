module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.gmail.com'),
                port: env('SMTP_PORT', 465),
                auth: {
                    type: "OAuth2",
                    user: env('SMTP_USERNAME'),
                    serviceClient: env('SMTP_CLIENT_ID'),
                    privateKey: env('SMTP_PRIVATE_KEY')
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