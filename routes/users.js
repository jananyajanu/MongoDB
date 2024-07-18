const express = require("express");
const {
  getAllUsers,
  getSingleUserByID,
  deleteUser,
  updateUserData,
  createNewUser,
  getsubscriptionDetailsById,
} = require("../controllers/user-controller");
const { users } = require("../data/users.json");
const router = express.Router();

/**
 * Route: /users
 * Method : Get
 * Description:Get all ursers
 * Access:Public
 * Parameters:None
 */
router.get("/", getAllUsers);
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });

/**
 * Route: /users/:id
 * Method : Get
 * Description:Get urser by id
 * Access:Public
 * Parameters:id
 */
router.get("/:id", getSingleUserByID);
// router.get("/:id", (req, res) => {
//   const { id } = req.params; //parameter:params
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user Does't exist !!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "user Found",
//     data: user,
//   });
// });

/**
 * Route: /users/
 * Method : POST
 * Description:Creating urser
 * Access:Public
 * Parameters:None
 */
router.post("/", createNewUser);
// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   const user = users.find((each) => each.id === id);
//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "User with the ID exist",
//     });
//   }
//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });
//   return res.status(201).json({
//     success: true,
//     message: "user added Suceesfully",
//     data: users,
//   });
// });

/**
 * Route: /users/:id
 * Method : PUT
 * Descriptiotion:Updating urser by id
 * Access:Public
 * Parameters:ID
 */
router.put("/:id", updateUserData);

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user Does't exist !!",
//     });
//   }
//   const updateUserData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData,
//   });
// });

/**
 * Route: /users/:id
 * Method : DELETE
 * Descriptiotion:Deleting urser by id
 * Access:Public
 * Parameters:ID
 */
router.delete("/:id", deleteUser);
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user Does't exist !!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);

//   return res
//     .status(200)
//     .json({ success: true, message: "Deleted User..", data: users });
// });

/**
 * Route: /users/subscription-details/:id
 * Method : GET
 * Description:Get all user subscription Details
 * Access:Public
 * Parameters:Id
 */
router.get("/subscription-details/:id", getsubscriptionDetailsById);
// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User with the ID didn't Exist",
//     });
//   }
//   const getDateInDays = (data = "") => {
//     // let date;
//     if (data === "") {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   };
//   const subscriptionType = (date) => {
//     if (user.subscriptionType == "Basic") {
//       date = date + 90;
//     } else if (user.subscriptionType == "Standard") {
//       date = date + 180;
//     } else if (user.subscriptionType == "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     isSubscriptionExpired: subscriptionExpiration <= currentDate,
//     daysLeftForExpiration:
//       subscriptionExpiration <= currentDate
//         ? 0
//         : subscriptionExpiration - currentDate,
//     fine:
//       returnDate < currentDate
//         ? subscriptionExpiration <= currentDate
//           ? 100
//           : 50
//         : 0,
//   };
//   return res.status(200).json({
//     success: true,
//     message: "Subscription detail for the user is: ",
//     data,
//   });
// });

module.exports = router;
