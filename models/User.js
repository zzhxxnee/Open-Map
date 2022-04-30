module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: "아이디",
      },
      email: {
        type: DataTypes.STRING(100), // 자료형
        validate: {
          isEmail: true,
        },
        allowNull: false,
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
        defaultValue: "TRUE",
        allowNull: false,
        comment: "업주 여부",
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: "TRUE",
        allowNull: false,
        comment: "활성화여부",
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