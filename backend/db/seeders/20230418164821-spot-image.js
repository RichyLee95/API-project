'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'https://mmasucka.com/wp-content/uploads/2014/09/AKA.jpg',
       preview: true
      },
      {
        spotId: 1,
        url: 'https://mmasucka.com/wp-content/uploads/2014/09/AKA.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://mmasucka.com/wp-content/uploads/2014/09/AKA.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://mmasucka.com/wp-content/uploads/2014/09/AKA.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0074/8063/9541/files/190719_Cesar_Lima_BGAX8514_Cut_2048x2048.jpg?v=1564749472',
        preview: true
       },
       {
         spotId: 2,
         url: 'https://cdn.shopify.com/s/files/1/0074/8063/9541/files/190719_Cesar_Lima_BGAX8514_Cut_2048x2048.jpg?v=1564749472',
         preview: false
       },
       {
         spotId: 2,
         url: 'https://cdn.shopify.com/s/files/1/0074/8063/9541/files/190719_Cesar_Lima_BGAX8514_Cut_2048x2048.jpg?v=1564749472',
         preview: false
       },
       {
         spotId: 2,
         url: 'https://cdn.shopify.com/s/files/1/0074/8063/9541/files/190719_Cesar_Lima_BGAX8514_Cut_2048x2048.jpg?v=1564749472',
         preview: false
       },
       {
        spotId: 3,
        url: 'https://static.wixstatic.com/media/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg/v1/fit/w_2500,h_1330,al_c/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg',
        preview: true
       },
       {
         spotId: 3,
         url: 'https://static.wixstatic.com/media/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg/v1/fit/w_2500,h_1330,al_c/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg',
         preview: false
       },
       {
         spotId: 3,
         url: 'https://static.wixstatic.com/media/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg/v1/fit/w_2500,h_1330,al_c/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg',
         preview: false
       },
       {
         spotId: 3,
         url: 'https://static.wixstatic.com/media/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg/v1/fit/w_2500,h_1330,al_c/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg',
         preview: false
       },
       {
        spotId: 4,
        url: 'https://cdn.vox-cdn.com/thumbor/_A6QgBtQf_8qDqWn8ElaIyJP82g=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9144771/upper_arena.jpg',
        preview: true
       },
       {
         spotId: 4,
         url: 'https://cdn.vox-cdn.com/thumbor/_A6QgBtQf_8qDqWn8ElaIyJP82g=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9144771/upper_arena.jpg',
         preview: false
       },
       {
         spotId: 4,
         url: 'https://cdn.vox-cdn.com/thumbor/_A6QgBtQf_8qDqWn8ElaIyJP82g=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9144771/upper_arena.jpg',
         preview: false
       },
       {
         spotId: 4,
         url: 'https://cdn.vox-cdn.com/thumbor/_A6QgBtQf_8qDqWn8ElaIyJP82g=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9144771/upper_arena.jpg',
         preview: false
       },
       {
        spotId: 5,
        url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
        preview: true
       },
       {
         spotId: 5,
         url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
         preview: false
       },
       {
         spotId: 5,
         url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
         preview: false
       },
       {
         spotId: 5,
         url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
         preview: false
       },
       {
        spotId: 5,
        url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
        preview: true
       },
       {
         spotId: 6,
         url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
         preview: false
       },
       {
         spotId: 6,
         url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
         preview: false
       },
       {
         spotId: 6,
         url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
         preview: false
       },
       {
        spotId: 6,
        url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
        preview: true
       },
       {
         spotId: 7,
         url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
         preview: false
       },
       {
         spotId: 7,
         url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
         preview: false
       },
       {
         spotId: 7,
         url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
         preview: false
       },
       {
        spotId: 7,
        url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
        preview: false
      }
      

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['testurl1.com', 'testurl2.com', 'testurl3.com'] }
    }, {});
  }
};