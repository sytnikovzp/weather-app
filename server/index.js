const { createServer } = require('http');

const app = require('./src/app');
const {
  SERVER_CONFIG: { HOST, PORT },
  DATABASE: { DB_NAME },
} = require('./src/constants');
const dbPostgres = require('./src/db/models');

// =================== POSTGRES DB CONNECT =======================

const postgresConnect = async () => {
  try {
    await dbPostgres.sequelize.authenticate();
    console.log(`Connection to DB <<< ${DB_NAME} >>> is done!`);
  } catch (error) {
    console.log(`Can not connect to DB ${DB_NAME}!`, error.message);
  }
};

postgresConnect();

// ================ Create server with HTTP module ===============

const server = createServer(app);

// ================ Start server with HTTP module ================

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

console.log('===== Server is started successfully! =====');
