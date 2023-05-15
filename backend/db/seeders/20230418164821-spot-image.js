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
       url: 'https://www.lowkickmma.com/wp-content/uploads/2021/05/american-kickboxing-academy.jpg.webp',
       preview: true
      },
      {
        spotId: 1,
        url: 'https://mmasucka.com/wp-content/uploads/2014/09/AKA.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2013/07/american-kickboxing-academy.jpg?w=640',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.evolve-vacation.com/wp-content/uploads/2016/06/aka-2.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0074/8063/9541/files/190719_Cesar_Lima_BGAX8514_Cut_2048x2048.jpg?v=1564749472',
        preview: true
       },
       {
         spotId: 2,
         url: 'https://fastly.4sqi.net/img/general/600x600/10982263_9soFoOcTp1shaXGQbzdUC41WiA6WI1S3oyZmQXPcZsk.jpg',
         preview: false
       },
       {
         spotId: 2,
         url: 'https://static.wixstatic.com/media/fb25c7_b50c80167bbc4083b8be1e2e7ef55a38~mv2.jpg/v1/fill/w_533,h_433,fp_0.50_0.50,q_80,enc_auto/fb25c7_b50c80167bbc4083b8be1e2e7ef55a38~mv2.jpg',
         preview: false
       },
       {
         spotId: 2,
         url: 'https://cdn.sportsmanor.com/wp-content/uploads/2021/04/15194527/062_team_cesar_gracie_original_crop_650x440.0.jpg',
         preview: false
       },
       {
        spotId: 3,
        url: 'https://static.wixstatic.com/media/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg/v1/fit/w_2500,h_1330,al_c/c5716e_613a2cf724e64e56a22b3c2433d9b041~mv2.jpg',
        preview: true
       },
       {
         spotId: 3,
         url: 'https://www.skillsetmag.com/wp-content/uploads/sites/14/2019/10/1Greg-Jackson-MMA3.jpg',
         preview: false
       },
       {
         spotId: 3,
         url: 'https://d21yqjvcoayho7.cloudfront.net/wp-content/uploads/2014/10/d01_jd_01oct_gym-640x429.jpg',
         preview: false
       },
       {
         spotId: 3,
         url: 'https://www.denverpost.com/wp-content/uploads/2019/12/f34b1e7060eb4ed289b97041940ae2d1.jpg?w=1024',
         preview: false
       },
       {
        spotId: 4,
        url: 'https://cdn.vox-cdn.com/thumbor/_A6QgBtQf_8qDqWn8ElaIyJP82g=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9144771/upper_arena.jpg',
        preview: true
       },
       {
         spotId: 4,
         url: 'https://ddjkm7nmu27lx.cloudfront.net/155205533769156/cover/5c8285e1bfde00.34745403.jpg',
         preview: false
       },
       {
         spotId: 4,
         url: 'https://www.graciemag.com/wp-content/uploads/2012/10/428527_396943913678340_1574211900_n.jpeg',
         preview: false
       },
       {
         spotId: 4,
         url: 'https://i1.wp.com/www.connectionrio.com/wp-content/uploads/2013/03/3-2-2013-Nova-Uniao-BJJ.jpg?fit=960%2C640&ssl=1',
         preview: false
       },
       {
        spotId: 5,
        url: 'https://tristargym.com/wp-content/uploads/2022/01/tristar-gym-gsp-training.jpeg',
        preview: true
       },
       {
         spotId: 5,
         url: 'https://cdns3.fitfit.fitness/ca/media/items/540x280/12370-Tristar-Gym-zVMSr.jpg',
         preview: false
       },
       {
         spotId: 5,
         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9vDc5nZ3b3gb10rQCCHQRcSwQTvyBTLbMg&usqp=CAU',
         preview: false
       },
       {
         spotId: 5,
         url: 'https://fastly.4sqi.net/img/general/600x600/3484330_5xPbPZKJnMxXce30hkawGOjMR4eBS96aI3qHUSmntYY.jpg',
         preview: false
       },
       {
        spotId: 5,
        url: 'https://i.imgur.com/2ka1aG9.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://themaclife.com/wp-content/uploads/2019/09/Screenshot-2019-09-20-at-19.09.57.png',
        preview: true
       },
       {
         spotId: 6,
         url: 'https://i.insider.com/5d8bf6db2e22af4ab9435bc8?width=600&format=jpeg&auto=webp',
         preview: false
       },
       {
         spotId: 6,
         url: 'https://lh3.googleusercontent.com/p/AF1QipNs1VHsB4gcWuIr4Gb2McP6mxPRR_yYCplsSofy',
         preview: false
       },
       {
         spotId: 6,
         url: 'https://static.wixstatic.com/media/7f5696_4fa1e97e3a76424ebd9e0e9a93e921de~mv2.png/v1/fill/w_966,h_719,al_c,q_90/file.jpg',
         preview: false
       },
       {
        spotId: 6,
        url: 'https://cdn.shophumm.com/humm/uploads/sites/4/sbg_tile.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
        preview: true
       },
       {
         spotId: 7,
         url: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mrwvg7xluo3yoras0i2s/MuayThai(ThaiBoxing)TrainingbyTigerMuayThaiChiangMai.webp',
         preview: false
       },
       {
         spotId: 7,
         url: 'https://www.tigermuaythai.com/wp-core/wp-content/uploads/2022/04/tmt-mua-thai-class-04-12-22-01.jpg',
         preview: false
       },
       {
         spotId: 7,
         url: 'https://www.tigermuaythai.com/wp-core/wp-content/uploads/2016/03/top-img-class-muay-thai-inter-01-360x203.jpg',
         preview: false
       },
       {
        spotId: 7,
        url: 'https://www.fullmetaldojo.com/wp-content/uploads/2021/01/Places-To-Bang-Tiger-Muay-Thai-Ft.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://www.tigermuaythaibeachside.com/wp-core/wp-content/uploads/2019/08/tmt-beachside-front-green-min.jpg',
        preview: true
       },
       {
         spotId: 8,
         url: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mrwvg7xluo3yoras0i2s/MuayThai(ThaiBoxing)TrainingbyTigerMuayThaiChiangMai.webp',
         preview: false
       },
       {
         spotId: 8,
         url: 'https://www.tigermuaythai.com/wp-core/wp-content/uploads/2022/04/tmt-mua-thai-class-04-12-22-01.jpg',
         preview: false
       },
       {
         spotId: 8,
         url: 'https://www.tigermuaythai.com/wp-core/wp-content/uploads/2016/03/top-img-class-muay-thai-inter-01-360x203.jpg',
         preview: false
       },
       {
        spotId: 8,
        url: 'https://www.fullmetaldojo.com/wp-content/uploads/2021/01/Places-To-Bang-Tiger-Muay-Thai-Ft.png',
        preview: false
      },
      
       
      

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