const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const { createProviderUser, checkPassword, getUserByProviderId } = require('./src/usersRepository')

const GOOGLE_CLIENT_ID = "1028460363730-g7l7m2567j69iicet3gncdqhs30ni3p1.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const GITHUB_CLIENT_ID = "e5687e0bd5d388a05373"
const GITHUB_CLIENT_SECRET = "c6905ff4d8488f5acd7f4aa882b20217be360593"

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
  // création user / connexion
  let idUser = await createProviderUser(profile.displayName, profile.id, 'google')
  if (idUser) {
    done(null, {
      _id: idUser,
      username: profile.displayName,
      a2f: false
    })
  }
  // L'utilisateur existait déjà
  else {
    user = await getUserByProviderId('google', profile.id)
    done(null, {
      _id: user._id,
      username: user.username,
      a2f: user.a2f.active
    })
  }
}
));

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    // création user / connexion
    let idUser = await createProviderUser(profile.displayName, profile.id, 'github')
    if (idUser) {
      done(null, {
        _id: idUser,
        username: profile.displayName,
        a2f: false
      })
    }
    // L'utilisateur existait déjà
    else {
      user = await getUserByProviderId('github', profile.id)
      done(null, {
        _id: user._id,
        username: user.username,
        a2f: user.a2f.active
      })
    }
  }
));

passport.use('local', new LocalStrategy({
  usernameField: 'mail'
},
  async function(mail, password, done) {
    const user = await checkPassword(mail, password);
    if (!user) return done('Les identifiants de connexions ne sont pas correctes.', null)
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})