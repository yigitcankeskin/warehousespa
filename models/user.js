const fs = require("fs");

class User {
  constructor(name, surname, email, password) {
    this.id = User.getNextId();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

  save() {
    return new Promise((resolve, reject) => {
      try {
        const users = User.getAll();
        users.push(this);
        fs.writeFileSync(User.file, JSON.stringify(users, null, 2));
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }
  static getNextId() {
    const users = User.getAll();
    return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  }
  static getAll() {
    return JSON.parse(fs.readFileSync(User.file, "utf8"));
  }

  static findByEmail(email) {
    const users = User.getAll();
    const user = users.find((u) => u.email === email);
    if (user) {
      return user;
    }
  }
  static checkUserLogin(email,password) {
    const users = User.getAll();
    const user = users.find((u) => u.email === email&&u.password === password);
    if (user) {
      return user;
    }
  }
}

User.file = "pages/api/users.json";

module.exports = User;
