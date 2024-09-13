import mongoose from 'mongoose';

export const connectDataBase = () => {
  mongoose
    .connect('mongodb://0.0.0.0:27017', {
      dbName: 'degtu',
    })
    .then(() => {
      console.log('database connected successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};
