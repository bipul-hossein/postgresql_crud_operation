const {Pool} = require("pg")
 
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "bipul#",
  port: 5432,
  database:"tasklydb"
});

module.exports = pool;