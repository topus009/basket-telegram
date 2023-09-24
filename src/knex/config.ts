export default {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:postgres@localhost:5432/yrumnmsgspvqvmsdheyj',
  },
  production: {
    client: 'postgresql',
    connection: 'postgres://games_jw8v_user:2ZyUbWWTDVosLLYxGqVkIMGRQ2ZSyED9@dpg-ck0d2jb6fquc73cuopd0-a.frankfurt-postgres.render.com/games_jw8v?ssl=true',
    pool: {
      min: 2,
      max: 10,
    },
  },
};
