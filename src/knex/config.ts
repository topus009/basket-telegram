const commonConfig = {
  client: 'postgresql',
  connection: process.env.DB_URL,
};

export default {
  development: {
    ...commonConfig,
  },
  production: {
    ...commonConfig,
    pool: {
      min: 2,
      max: 10,
    },
  },
};
