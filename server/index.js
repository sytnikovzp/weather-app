/* eslint-disable no-unused-vars */
const { createServer } = require('http');
// ==============================================================
require('dotenv').config();
// ==============================================================
const app = require('./src/app');
const dbPostgres = require('./src/db/models');
const { syncModel, syncAllModels } = require('./src/utils/syncModels');

// ==================== POSTGRES DB CHECK =======================

const postgresConnect = async () => {
  try {
    await dbPostgres.sequelize.authenticate();
    console.log(`Connection to DB <<< ${process.env.DB_NAME} >>> is done!`);
  } catch (error) {
    console.log(`Can not connect to DB ${process.env.DB_NAME}!`, error.message);
  }
};

postgresConnect();

// =================== Sync`s db model(s) ========================

// syncModel(model_name);
// syncAllModels();

// ================ Create server with HTTP module ===============

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

const server = createServer(app);

// ============= Start server with HTTP & WS module ===============

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

console.log('===== Server is started successfully! =====');
