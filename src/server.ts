import { Server } from "http";

import app from "./app";
const http = require("http");

import { logger } from "./3infrastructure/config/Logger";

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

const server: Server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  console.error(`${bind} - ${error.code}`);
  process.exit(1);
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
}