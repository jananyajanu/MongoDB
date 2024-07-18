const bookModel = require("../models/book-model");
const { UserModel, BookModel } = require("../models/index");
exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find();
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found ",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book Not Found",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Found The Book by thier ID",
//     data: book,
//   });
// });
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found The Book by thier ID",
    data: book,
  });
};

// router.get("/issued/by-user", (req, res) => {
//   const usersWithIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });
//   const issuedBooks = [];
//   usersWithIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);
//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;
//     issuedBooks.push(book);
//   });
//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Book Have Been Issued Yet..",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "users with issued Books...",
//     data: issuedBooks,
//   });
// });
exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBooks: { $exists: true },
  }).populate("issuedBook");

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "users with issued Books...",
    data: issuedBooks,
  });
};

// module.exports = { getAllBooks, getSingleBookById };
