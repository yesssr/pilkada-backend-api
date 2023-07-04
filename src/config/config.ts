import Knex from "knex";
import config from "../knexfile";

let knex =
  process.env.NODE_ENV === "production"
    ? Knex(config.production)
    : Knex(config.development);

export default knex;
