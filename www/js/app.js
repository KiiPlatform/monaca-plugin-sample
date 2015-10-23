// This is a JavaScript file

//var APP_ID = "8348dc41";
//var APP_KEY = "426c925566eb8571d90bea4e3a5ad0eb";

//var APP_ID = "ff533786";
//var APP_KEY = "e8634be7fbcd25b6a8093fad0348a2cb";
var APP_ID = "3c9f1460";
var APP_KEY = "4f928656a6ed37903644eb133245343e";
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        /*
        this.kii = {
            Kii : Kii,
            KiiSite : KiiSite,
            KiiUser : KiiUser,
            KiiQuery : KiiQuery,
        };
        */
        this.kii = window.kii.create();
        this.kii.Kii.initializeWithSite(APP_ID, APP_KEY, this.kii.KiiSite.JP);
        window.kiiPush.initAndroid("539283181603", "pushReceived", {
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
    };
    Application.prototype.install = function () {
        // nop
        window.kiiPush.register(this.kii, {
            received: "pushReceived",
            success: function (token) {
                console.log('token=' + token);
            },
            failure: function (msg) {
                console.log('error ' + msg);
            }
        });
    };
    return Application;
})();
function pushReceived(args) {
    alert('push received');
}
var TopPage = (function () {
    function TopPage(app) {
        this.app = app;
    }
    TopPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
            data: {
                inProgress: false
            }
        });
        this.ractive.on({
            login: function () {
                _this.login();
            },
            signup: function () {
                _this.app.router.navigate('signup', { trigger: true });
            }
        });
    };
    TopPage.prototype.login = function () {
        var _this = this;
        var email = this.ractive.get('email');
        var password = this.ractive.get('password');
        this.ractive.set('inProgress', true);
        this.app.kii.KiiUser.authenticate(email, password, {
            success: function (theUser) {
                _this.ractive.set('inProgress', false);
                console.log("User authenticated!");
                _this.app.install();
                _this.app.router.navigate('list', { trigger: true });
            },
            failure: function (theUser, errorString) {
                _this.ractive.set('inProgress', false);
                console.log("Error authenticating: " + errorString);
            }
        });
    };
    return TopPage;
})();
var SignupPage = (function () {
    function SignupPage(app) {
        this.app = app;
    }
    SignupPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#signupTemplate',
            data: {
                inProgress: false
            }
        });
        this.ractive.on({
            signup: function () {
                _this.signup();
            }
        });
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var email = this.ractive.get('email');
        var password = this.ractive.get('password');
        this.ractive.set('inProgress', true);
        var user = this.app.kii.KiiUser.userWithEmailAddress(email, password);
        user.register({
            success: function (theUser) {
                _this.ractive.set('inProgress', false);
                console.log("User created");
                _this.createTopic(theUser);
            },
            failure: function (theUser, errorString) {
                _this.ractive.set('inProgress', false);
                console.log("Error user creation: " + errorString);
            }
        });
    };
    SignupPage.prototype.createTopic = function (user) {
        var _this = this;
        var topic = user.topicWithName('update');
        topic.save({
            success: function (theTopic) {
                console.log('topic created');
                _this.app.router.navigate('list', { trigger: true });
            },
            failure: function (theTopic, error) {
                _this.ractive.set('inProgress', false);
                console.log('Error topic creation:' + error);
            }
        });
    };
    return SignupPage;
})();
var ListPage = (function () {
    function ListPage(app) {
        this.app = app;
    }
    ListPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#listTemplate',
            data: {
                inProgress: false,
                subscribed: false,
                list: []
            }
        });
        this.ractive.on({
            changeSubscribe: function () {
                var boxState = _this.ractive.get('subscribed');
                if (boxState == _this.subscribed) {
                    return;
                }
                _this.updateSubscribe(boxState);
            },
            add: function () {
                _this.add();
            }
        });
        this.fetchData();
        this.checkSubscribeState();
    };
    ListPage.prototype.fetchData = function () {
        var _this = this;
        var user = this.app.kii.KiiUser.getCurrentUser();
        var bucket = user.bucketWithName('memo');
        var query = this.app.kii.KiiQuery.queryWithClause();
        var queryCallbacks = {
            success: function (queryPerformed, resultSet, nextQuery) {
                for (var i = 0; i < resultSet.length; i++) {
                    _this.ractive.push('list', resultSet[i]);
                }
                if (nextQuery != null) {
                    bucket.executeQuery(nextQuery, queryCallbacks);
                }
            },
            failure: function (queryPerformed, errorString) {
                console.log('Query Error : ' + errorString);
            }
        };
        bucket.executeQuery(query, queryCallbacks);
    };
    ListPage.prototype.add = function () {
        var _this = this;
        var memo = this.ractive.get('memo');
        if (memo == null || memo.length == 0) {
            return;
        }
        var user = this.app.kii.KiiUser.getCurrentUser();
        var bucket = user.bucketWithName('memo');
        var obj = bucket.createObject();
        obj.set('memo', memo);
        obj.save({
            success: function (theObject) {
                _this.ractive.set('memo', '');
                _this.ractive.push('list', theObject);
            },
            failure: function (theObject, errorString) {
                console.log("Error saving object: " + errorString);
            }
        });
    };
    ListPage.prototype.checkSubscribeState = function () {
        var _this = this;
        var user = this.app.kii.KiiUser.getCurrentUser();
        var topic = user.topicWithName('update');
        user.pushSubscription().isSubscribed(topic, {
            success: function (subscription, topic, isSubscribed) {
                _this.subscribed = isSubscribed;
                _this.ractive.set('subscribed', isSubscribed);
            },
            failure: function (topic, error) {
                console.log("Error subscription status : " + error);
            }
        });
    };
    ListPage.prototype.updateSubscribe = function (boxState) {
        if (boxState) {
            this.subscribe();
        }
        else {
            this.unsubscribe();
        }
    };
    ListPage.prototype.subscribe = function () {
        var _this = this;
        var user = this.app.kii.KiiUser.getCurrentUser();
        var topic = user.topicWithName('update');
        user.pushSubscription().subscribe(topic, {
            success: function (subscription) {
                _this.subscribed = true;
                _this.ractive.set('subscribed', true);
            },
            failure: function (topic, error) {
                console.log("Error subscription status : " + error);
            }
        });
    };
    ListPage.prototype.unsubscribe = function () {
        var _this = this;
        var user = this.app.kii.KiiUser.getCurrentUser();
        var topic = user.topicWithName('update');
        user.pushSubscription().unsubscribe(topic, {
            success: function (subscription) {
                _this.subscribed = false;
                _this.ractive.set('subscribed', false);
            },
            failure: function (topic, error) {
                console.log("Error subscription status : " + error);
            }
        });
    };
    return ListPage;
})();
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./SignupPage.ts"/>
/// <reference path="./ListPage.ts"/>
var app = new Application();
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "top",
        "signup": "signup",
        "list": "list"
    },
    top: function () {
        app.page = new TopPage(app);
        app.page.onCreate();
    },
    signup: function () {
        app.page = new SignupPage(app);
        app.page.onCreate();
    },
    list: function () {
        app.page = new ListPage(app);
        app.page.onCreate();
    }
});
document.addEventListener('deviceready', function () {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
