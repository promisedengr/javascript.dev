const sql = require("./db.js");

const News = function (news) {
    this.title = news.title
    this.description = news.description
    this.link = news.link
    this.type = news.type // 0: nothing 1: important 2: event
    this.date = news.created_at
    this.updated = news.updated // 1: true 0: false
}
News.create = (newHistory, result) => {
    sql.query("INSERT INTO item_mall_histories SET ?", newHistory, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newHistory})
    })
}

News.getNews = (data, result) => {
    console.log(data)
    // var offset = (data.currentPage - 1) * data.perPage
    let query = `SELECT * FROM news `
    let searchType = sql.escape(data.searchType)
    if (searchType == 1 || searchType == 2) {
      query = query + `WHERE type = ${searchType} `
    } else if (searchType == 3){
      query = query + `WHERE updated = 1 `
    }
    sql.query(query + `ORDER BY date ASC`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      return;
      }
  
      if (res.length) {
  
        result(null, res);
        return;
      }
      result(null, []);
    });
  }

module.exports = News;