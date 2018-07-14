class Logger {
  static serverTime() {
    return (new Date).toLocaleTimeString();
  }

  static log(msg) {
    const time = Logger.serverTime();
    console.log(`${time}: ${msg}`);
  }
}

module.exports = { Logger };
