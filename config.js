const configs = {
  development: {
    BASE_URL: "http://192.168.1.55:5555/api",
    IMG_URL: "http://192.168.1.55:5555/"
  },
  production: {
    BASE_URL: "https://api.shift-cafe.com/api",
    IMG_URL: "https://api.shift-cafe.com/"
  }
};

const nodeEnv = process.env.NODE_ENV;
module.exports = configs[nodeEnv];
