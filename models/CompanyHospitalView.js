module.exports = (sequelize, DataTypes) => {

    const CompanyHospitalView = sequelize.define("CompanyHospitalView", {}, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "CompanyHospitalView", // 테이블 이름
      timestamps: false, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });
  
    return CompanyHospitalView;
  }; 