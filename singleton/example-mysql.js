// ...
class Db {
  // 单例解决多次实例化,实例不共享的问题
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor() {
    this.dbConnect = "";
    this.pool = "";
    this.connect(); /*实例化的时候就连接数据库*/
  }
  connect() {
    /*连接数据库*/
    return new Promise((resolve, reject) => {
      if (!this.pool) { // 复用连接池
        this.pool = mysql.createPool({
          //创建mysql的连接
          host: config.database.HOST,
          user: config.database.USERNAME,
          password: config.database.PASSWORD,
          database: config.database.DATABASE,
        });
      }
      if (!this.dbConnect) {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          } else {
            this.dbConnect = connection;
            resolve(connection);
          }
        });
      } else {
        resolve(this.dbConnect);
      }
    });
  }
  query(sql, values) {
    /*查询数据*/
    return new Promise((resolve, reject) => {
      this.connect().then((connect) => {
        connect.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          this.release();
        });
      });
    });
  }

  release() {
    if (this.dbConnect) {
      this.dbConnect.release();
      this.dbConnect = "";
    }
  }
}

module.exports = Db.getInstance();
