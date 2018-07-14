const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN || 'localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;

export const SERVER_PATH = `http://${SERVER_DOMAIN}:${SERVER_PORT}`;
