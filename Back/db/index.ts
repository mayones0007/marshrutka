import knex from 'knex';
import { knexConfig } from './knexfile';

export const knexService = knex(knexConfig.development)