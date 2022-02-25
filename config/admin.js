module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9a83e9aea541f2c8d93f169dcc663e0e'),
  },
});
