const EMAIL = 'sii9059@naver.com';
const PASSWORD = 'wjdansrb135';

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === EMAIL && password === PASSWORD) {
        resolve(email);
      } else {
        reject('The email or password is wrong.');
      }
    }, 1000);
  });
};
