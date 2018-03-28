module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/admin', isLoggedIn, function(req, res) {
        db.collection('casino-money').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('admin.ejs', {
            user : req.user,
            casino-money: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// casino routes ===============================================================

    app.post('/casino-money', (req, res) => {
      db.collection('casino-money').save({
        total: req.body.casinoTotal}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/admin')
      })
    })

    app.put('/casino-money', (req, res) => {
      db.collection('casino-money')
      .findOneAndUpdate({casinoTotal: req.body.casinoTotal}, {
        $set: {
          spin:req.body.casinoTotal + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/casino-money', (req, res) => {
      db.collection('casino-money').findOneAndDelete({total: req.body.casinoTotal}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

//player money

 app.post('/player-money', (req, res) => {
      db.collection('player-money').save({
        total: req.body.total}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/admin')
      })
    })

    app.put('/player-money', (req, res) => {
      db.collection('player-money')
      .findOneAndUpdate({playerTotal: req.body.playerTotal}, {
        $set: {
          spin:req.body.playerTotal + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/player-money', (req, res) => {
      db.collection('player-money').findOneAndDelete({playerTotal: req.body.playerTotal}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
// wins losses
app.post('/win-losses', (req, res) => {
     db.collection('wins-losses').save({
       wins: req.body.wins, losses: req.body.losses}, (err, result) => {
       if (err) return console.log(err)
       console.log('saved to database')
       res.redirect('/admin')
     })
   })

   app.put('/wins-losses', (req, res) => {
     db.collection('wins-losses')
     .findOneAndUpdate({wins: req.body.wins, losses:req.body.losses }, {
       $set: {
         spin:req.body.wins + 1
       }
     }, {
       sort: {_id: -1},
       upsert: true
     }, (err, result) => {
       if (err) return res.send(err)
       res.send(result)
     })
   })

   app.put('/wins-losses', (req, res) => {
     db.collection('wins-losess')
     .findOneAndUpdate({wins: req.body.wins, losses:req.body.losses }, {
       $set: {
         spin:req.body.losses + 1
       }
     }, {
       sort: {_id: -1},
       upsert: true
     }, (err, result) => {
       if (err) return res.send(err)
       res.send(result)
     })
   })

   app.delete('/wins-losses', (req, res) => {
     db.collection('wins-losses').findOneAndDelete({wins: req.body.losses, losses: req.body.losses}, (err, result) => {
       if (err) return res.send(500, err)
       res.send('Message deleted!')
     })
   })


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash casino-money
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash casino-money
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/admin');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}