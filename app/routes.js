
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    // app.get('/', function(req, res) {
    //   db.collection('messages').find().toArray((err, result) => {
    //     if (err) return console.log(err)
    //     res.render('index.ejs')
    //   })
    //
    // });




    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user: req.user,
            messages: result
          })
        })
    });


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

app.get('/', function(req, res) {
db.collection('messages').find().toArray((err, result) => {
 if (err) return console.log(err)
 res.render('index.ejs', {
   user : req.user,
   messages: result
 })
})
});

app.get('/messages', function(req, res) {
db.collection('messages').find().toArray((err, result) => {
 if (err) return console.log(err)
 res.render('index.ejs', {
   user : req.user,
   messages: result
 })
})
});

app.post('/messages', (req, res) => {
  db.collection('messages').save({snack: req.body.snack }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/profile')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({snack: req.body.snack}, {
    $set: {
      thumbUp:req.body.thumbUp +1,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/messages-decrease', (req, res) => {
  console.log(req.body)
  db.collection('messages')
  .findOneAndUpdate({snack: req.body.snack}, {

    $set: {
      thumbUp: req.body.thumbUp ,
      // revenue: +1

    }
  }, {
    sort: {_id: -1},
    upsert: true,
    // returnNewDocument: true
  }, (err, result) => {
    if (err) throw err
    // res.redirect('/')
    res.send(result)
  })
})

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.ejs');
});
app.get('/clicks', (req, res) => {

  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);
  console.log(db);

  db.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.sendStatus(201);
  });
});


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({snacks: req.body.snacks}  , (err, result) => {
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
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        app.post('/admin/login', passport.authenticate('admin', {
            successRedirect : '/adminProfile', // redirect to the secure profile section
            failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
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
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
