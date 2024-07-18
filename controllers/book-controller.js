const bookModel = require("../models/book-model");
const { UserModel, BookModel } = require("../models");
const IssuedBook = require("../dtos/book-dto");

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
  // Data transfer Object(DTO)

  const issuedBooks = users.map((each) => new IssuedBook(each));
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

// router.post("/", (req, res) => {
//   const { data } = req.body;

//   if (!data) {
//     return res.status(400).json({
//       success: false,
//       message: "No Data To Add a Book",
//     });
//   }
//   const book = books.find((each) => each.id === data.id);
//   if (book) {
//     return res.status(400).json({
//       success: false,
//       message: "Book Already Exists",
//     });
//   }
//   const allBooks = { ...books, data };
//   return res.status(201).json({
//     success: true,
//     message: "Adde Book Successfully",
//     data: allBooks,
//   });
// });
exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data To Add a Book",
    });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();
  return res.status(201).json({
    success: true,
    message: "Adde Book Successfully",
    data: allBooks,
  });
};

// router.put("/updateBook/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const book = books.find((each) => each.id === id);

//   if (!book) {
//     return res.status(400).json({
//       success: false,
//       message: "Book Not Found For This ID",
//     });
//   }
//   const updateData = books.map((each) => {
//     if (each.id === id) {
//       return { ...each, ...data };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "Updated Book By Id",
//     data: updateData,
//   });
// });
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updateBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated Book By Id",
    data: updateBook,
  });
};
// module.exports = { getAllBooks, getSingleBookById };
