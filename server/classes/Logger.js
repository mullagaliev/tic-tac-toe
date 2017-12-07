class Logger {
  static serverTime() {
    return (new Date).toLocaleTimeString();
  }

  static log(msg) {
    let time = Logger.serverTime();
    console.log(`${time}: ${msg}`);
  }
}

module.exports = { Logger };
