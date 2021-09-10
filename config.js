const configs = {
  development: {
    BASE_URL: "http://192.168.1.55:5555/api",
    IMG_URL: "http://192.168.1.55:5555/",
    type: process.env.NODE_ENV
  },
  production: {
    BASE_URL: "https://api.shift-cafe.com/api",
    IMG_URL: "https://api.shift-cafe.com/"
  }
};

const nodeEnv = process.env.NODE_ENV;

export default nodeEnv === "development"
  ? configs.development
  : configs.production;
