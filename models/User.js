module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique : true,
        comment: "아이디",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "이름",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "비밀번호",
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique : true,
        allowNull: false,
        comment: "이메일",
      },
      salt:{
        type: DataTypes.STRING,
      },
      provider:{
        type: DataTypes.STRING,
        defaultValue: 'local',
        comment: "로그인 제공 업체",
      },
      isOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "업주 여부",
      },
    }, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "Users", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });

    return Users;
  }; 
  