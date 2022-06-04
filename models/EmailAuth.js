module.exports = (sequelize, DataTypes) => {

    const EmailAuth = sequelize.define("EmailAuth", {
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "아이디",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "토큰",
      },
      ttl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "비밀번호",
      },
    }, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "EmailAuth", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });

    return EmailAuth;
  }; 
  