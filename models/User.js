module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        unique: true,
        allowNull: false,
        comment: "회원 아이디",
      },
      email: {
        type: DataTypes.STRING(100),
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
        comment: "이메일",
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        comment: "비밀번호",
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "이름",
      },
      isOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "업주여부",
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "활성화여부",
      }
    }, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "Users", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });

    // Users.associate = function(models) {
    //     models.Users.hasMany(models.Company, {
    //         foreignKey: 'userId',
    //         onDelete: 'cascade'
    //     });
    // };
    
    return Users;
  };