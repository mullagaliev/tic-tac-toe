function currentTime() {
  return (new Date()).toLocaleTimeString();
}

export default function logger(msg) {
  let time = currentTime();
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${time}: ${msg}`);
  }
}
