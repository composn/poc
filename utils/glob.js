import glob from 'glob';

export default (...args) =>
  new Promise((resolve, reject) => {
    glob(...args, (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });
