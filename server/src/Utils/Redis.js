const redis = require('redis');

// BEFORE THAT DOWNLOAD AND INSTALL REDIS INSTALLER
// EXPIRATION TIME
const DEFAULT_EXP = 3000;

// CREATE CLINT ON LOCAL HOST PORT 6379
const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// CONNECTION TO REDIS
client
  .connect()
  .then(() => {
    console.log('connection success on redis server!');
  })
  .catch((err) => {
    console.log(err);
  });

exports.setUser = (token, user) => {
  client.setEx(token.substring(0, 10), DEFAULT_EXP, JSON.stringify(user));
};

exports.getUser = async (token) => {
  const user = await client.get(token.substring(0, 10));
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};
