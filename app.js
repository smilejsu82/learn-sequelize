const initModels = require('./models/init-models');
const { Op, Sequelize} = require('sequelize');
const sequelize = new Sequelize('game_db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });
const models = initModels(sequelize);


// async function getFriends (id){

//     // select nickname, accept from users
//     // inner join friends
//     // on users.id = friends.friend_id;

//     const results = await models.users.findAll({
//         attributes: ['id', 'nickname'],
//         include: [
//             {
//                 model: models.friends,
//                 required: true,
//                 as: 'friends',
//             }
//         ],
//     });
//     let friends = [];
    
//     results.map(x=> friends.push(
//         { 
//             id: x.id,
//             nickname: x.nickname
//         })
//     );
    
//     console.log(friends);
// }

// getFriends('dcb05a1e-fd04-4aa1-b5e0-c7501fa0482e');










// async function deleteUser(id){
//     const t = await sequelize.transaction();
//     try{
//         await models.friends.destroy({
//             where: {
//                 user_id: id
//             }
//         });
//         await models.scores.destroy({
//             where: {
//                 user_id: id
//             }
//         });
//         await models.users.destroy({
//             where: {
//                 id: id
//             }
//         });
//         t.commit();
//         console.log(`${id} + " 탈퇴"`);
//     }catch(err){
//         console.log(err);
//         t.rollback();
//     }
// }

// deleteUser('dcb05a1e-fd04-4aa1-b5e0-c7501fa0482e');













//로그인
async function createUser(user){
    const t = await sequelize.transaction();
    try{
        try{
            const createdUser = await models.users.create(user);
            console.log("auto-generated ID:", createdUser);
        }catch(err){
            switch(err.parent.errno){
                case 1062:
                    //기본키 중복 
                    console.log('기본키 중복'); //기존 유저
                    break;
            }
        }
        console.log('친구목록을 가져옴');
        //select nickname, accept from users inner join friends on users.id = friends.friend_id;
        try{
            const results = await models.users.findAll({
                attributes: ['id', 'nickname', 'friends.accept'],
                include: [
                    {
                        model: models.friends,
                        required: true,
                        as: 'friends',
                        raw:true
                    }
                ],
            });
    
            t.commit();

            let friends = [];
            // results.map(x=> console.log(x.dataValues.friends[0].dataValues.accept));
            results.map(x=> friends.push(
                { 
                    id: x.id,
                    nickname: x.nickname,
                    accept : x.dataValues.friends[0].dataValues.accept
                }
            ));
            console.log(friends);
        }catch(err){
            throw err;
        }
    }catch(err){
        console.log(err);
        await t.rollback();
    }
}
const json = `{
	"id":"defe10546-1e92-4591-883b-e9e65305485b",
	"nickname":"김길동"
}`;
user = JSON.parse(json);
createUser(user);












// async function findOne(user_id){
//     //models.table명.findOne({where:{id:202}})
//     const user = await models.users.findOne({
//         where: {id : user_id},
//         attributes:['nickname']
//     });
//     const json = JSON.stringify(user);
//     console.log(json);
// }
// findOne('dcb05a1e-fd04-4aa1-b5e0-c7501fa0482e');




// models.users.findAll().then((results)=>{
//     console.log(results);
// });

// async function findAllFromUsers(user_id){
//     const users = await models.users.findAll({
//        where: {
//            id:{
//             [Op.ne]: user_id
//            }  
//        },
//        attributes:['nickname']
//     });
    
//     const json = JSON.stringify(users);
//     console.log(json);
// }