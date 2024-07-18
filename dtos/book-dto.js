//Data transfer Object - Book
class IssuedBook {
  _id;
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  //whenever we create obj, the constructor gets invoked
  constructor(user) {
    this._id = user.IssuedBook._id;
    this.name = user.IssuedBook.name;
    this.genre = user.IssuedBook.genre;
    this.price = user.IssuedBook.price;
    this.publisher = user.IssuedBook.publisher;
    this.issuedBy = user.IssuedBook.issuedBy;
    this.issuedDate = user.IssuedBook.issuedDate;
    this.returnDate = user.IssuedBook.returnDate;
  }
}

module.exports = IssuedBook;
