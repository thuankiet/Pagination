const shortId = require("shortid");

const db = require("../db.js");

// display transactions
module.exports.index = (request, response) => {
  var page = parseInt(request.query.page) || 1;
  var perPage = 3;
  var totalBooks = db.get("users").value().length;
  var pages = Math.ceil(totalBooks / perPage);

  var start = (page - 1) * perPage;
  var end = (page - 1) * perPage + perPage;
  response.render("./transactions/transactions.pug", {
    transactions: db.get("transactions").value(),
    users: db
      .get("users")
      .drop(start)
      .take(perPage)
      .value(),
    pages: pages,
    current: page
  });
};

// show info
module.exports.info = (request, response) => {
  var userId = request.params.userId;
  response.render("./transactions/info.pug", {
    books: db
      .get("users")
      .find({ id: userId })
      .get("books")
      .value()
  });
};

// delete user
module.exports.delete = (request, response) => {
  var userId = request.params.userId;
  db.get("users")
    .remove({ id: userId })
    .write();
  response.redirect("/transactions");
};
