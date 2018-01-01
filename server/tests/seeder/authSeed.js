import db from '../../models';

const User = db.User;

const seeder = {
  emptyUserTable(done) {
    User.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setData(fullname, username, email, phoneNo, password, confirmPassword) {
    return {
      fullname,
      username,
      email,
      phoneNo,
      password,
      password_confirmation: confirmPassword
    };
  },
  setLoginData(username, password) {
    return { username, password };
  },
  addUserToDb(done) {
    User.create({
      fullname: 'Eben Dawuda',
      username: 'ebenezer',
      email: 'eben@gmail.com',
      phoneNo: '08075568940',
      password: 'twinkle',
      level: 'silver' })
      .then(() => done())
      .catch(err => done(err));
  },
  addUserToDb2(done) {
    User.create({
      fullname: 'Eben Dawuda',
      username: 'ebenezeri',
      email: 'eborne@gmail.com',
      phoneNo: '08075568440',
      password: 'twinkle',
      level: 'gold' })
      .then(() => done())
      .catch(err => done(err));
  },
  addAdminToDb(done) {
    User.create({
      fullname: 'Ebene Dawuda',
      username: 'ebenez',
      email: 'ebenz@gmail.com',
      phoneNo: '08075568980',
      password: 'twinkle',
      isAdmin: true,
      level: 'platinum' })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default seeder;
