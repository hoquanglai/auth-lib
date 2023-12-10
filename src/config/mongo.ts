export const getMongoUrl = () => {
  console.log('start conect db');
  let mongoUrl = '';
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    console.log(mongoUrl);
    return mongoUrl;
  }
  mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  console.log('mongoUrlp: ', mongoUrl);
  return mongoUrl;
};
