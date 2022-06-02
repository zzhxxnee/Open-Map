'use strict';

const viewName = 'CompanyRestaurantView'
const query = `select compId, image, compName, address, tel, restOpen, restClosed, breakStart, breakEnd, todayClosed, earlyClosed, vacation, latitude, longitude, type, mon, tue, wed, thu, fri, sat, sun 
from company join restaurant using(compId)`

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`create view ${viewName} as ${query}`);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`drop view ${viewName}`);
  }
};
