var APP_ID = "APP_ID";//replace with appropriate value
var APP_KEY = "APP_KEY";//replace with appropriate value
var kii;

var onLogin = function (){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    kii.KiiUser.authenticate(email, password, {
       success: function (theUser) {
          // hide login table
          document.getElementById("login_table").setAttribute('style','display:none;');
          document.getElementById("loggedin_table").setAttribute('style','display:initial;');
          pushRegister();
       },
       failure: function (theUser, errorString) {
         alert("Error authenticating: " + errorString);
       }
    });
};

var onSignup = function (){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = kii.KiiUser.userWithEmailAddress(email, password);
    user.register({
      success: function(theAuthenticatedUser) {
        // hide login table
        document.getElementById("login_table").setAttribute('style','display:none;');
        document.getElementById("loggedin_table").setAttribute('style','display:initial;');
        pushRegister();
      },
      failure: function(theUser, anErrorString) {
        alert("Error authenticating: " + anErrorString);
      }
    });

};

var pushRegister = function (){
    window.kiiPush.register(kii, {
       received: "pushReceived",
       success: function (token) {
           alert('token=' + token);
       },
       failure: function (msg) {
           alert('error ' + msg);
       }
    });
};

var onLogout = function (){
    kii.KiiUser.logOut();
    // hide login table
    document.getElementById("login_table").setAttribute('style','display:initial;');
    document.getElementById("loggedin_table").setAttribute('style','display:none;');
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if(id === 'deviceready') {
          document.getElementById("loginBtn").onclick = onLogin;
          document.getElementById("logoutBtn").onclick = onLogout;
          document.getElementById("signupBtn").onclick = onSignup;
          kii = window.kii.create();
          kii.Kii.initializeWithSite(APP_ID, APP_KEY, kii.KiiSite.JP);

          // replace sender_id with appropriate value
          window.kiiPush.initAndroid("sender_id", "pushReceived", {
              user: {
                  ledColor: "#FFFF00FF",
                  notificatonText: "user"
              },
              direct: {
                  showInNotificationArea: true,
                  ledColor: "#FFFFFFFF",
                  notificatonTitle: "$.title",
                  notificatonText: "$.msg"
              },
              success: function () {
                  console.log('init done');
              },
              failure: function (msg) {
                  console.log('error ' + msg);
              }
          });
        }
    }
};

function pushReceived(args) {
    alert('push received:'+JSON.stringify(args));
}

app.initialize();
