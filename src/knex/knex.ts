import knex, { Knex } from 'knex';
import knexConfig from './config';

const env = process.env.NODE_ENV || 'development' as 'development' | 'production';
const config = (knexConfig as Record<string, Knex.Config>)[env];

export default knex(config);
