// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
// // //     /*
// // //       Add altering commands here.
// // //       Return a promise to correctly handle asynchronicity.

// // //       Example:
// // //       return queryInterface.bulkInsert('People', [{
// // //         name: 'John Doe',
// // //         isBetaMember: false
// // //       }], {});
// // //     */
//    return queryInterface.bulkInsert('Users', [{
//     username: 'hema1',
//     password_digest: "5f4dcc3b5aa765d61d8327deb882cf99",
//     email: "hema@gmail.com"
//   }], {});
//   },

//   down: (queryInterface, Sequelize) => {
// // //     /*
// // //       Add reverting commands here.
// // //       Return a promise to correctly handle asynchronicity.

// // //       Example:
// // //       return queryInterface.bulkDelete('People', null, {});
// // //     */
//    return queryInterface.bulkDelete('Users', null, {});
//   }
// };
