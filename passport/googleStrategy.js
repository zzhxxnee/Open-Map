const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const db = require("../models/index");
const models = require('./../models');
 
module.exports = () => {
    passport.use(
            new GoogleStrategy(
                {
                    clientID: process.env.GOOGLE_AUTH_ID, // 구글 로그인에서 발급받은 REST API 키
                    clientSecret: process.env.GOOGLE_AUTH_PW,
                    callbackURL: '/users/google/callback', // 구글 로그인 Redirect URI 경로
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const exUser = await models.Users.findOne({
                                // 구글 플랫폼에서 로그인 했고 & id필드에 구글 아이디가 일치할경우
                                where: { id: profile.displayName, provider: 'google' },
                        });
                        // 이미 가입된 구글 프로필이면 성공
                        if (exUser) {
                                done(null, exUser); // 로그인 인증 완료
                        } else {
                            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                            let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                            let hashPassword = crypto.createHash("sha512").update(profile.id + salt).digest("hex");

                            const newUser = await models.Users.create({
                                email: profile.emails[0].value,
                                name: profile.displayName,
                                id: profile.displayName,
                                password: hashPassword,
                                salt: salt,
                                provider: 'google',
                            });
                            done(null, newUser); // 회원가입하고 로그인 인증 완료
                        }
                    } catch (error) {
                    console.error(error);
                    done(error);
                    }
                },
            ),
    );
};