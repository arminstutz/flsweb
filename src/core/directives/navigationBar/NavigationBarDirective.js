export default class NavigationBarDirective {
    static factory() {
        return {
            restrict: 'E',
            template: require('./navigation-bar-directive.html'),
            controller: NavigationBarController
        };
    }
}

class NavigationBarController {

    constructor($rootScope, $scope, $location, AuthService, GLOBALS, $route) {
        $rootScope.$on("$routeChangeSuccess", () => {
            $scope.titleKey = $route.current && $route.current.locals["titleKey"];
        });

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });

        $rootScope.$on('$routeChangeError',
            function () {
                $location.path('/main');
            });
        $rootScope.$on('$routeChangeSuccess',
            function () {
                extractUsername();
            });

        $scope.getEnabledFeatures = AuthService.getEnabledFeatures;
        $scope.baseurl = GLOBALS.BASE_URL;
        $scope.user = {};

        function extractUsername() {
            let user = AuthService.getUser();
            $scope.user = {
                username: user && user.UserName
            };
        }

        $scope.$watch(AuthService.getUser(), () => {
            extractUsername();
        }, true);

        $scope.isPath = function (path) {
            return $location.path().indexOf(path) !== -1;
        };

        $scope.logout = function () {
            $scope.loginBusy = false;
            AuthService.logout();
            $location.path('/');
        };

        $scope.isLoggedin = function () {
            return !!AuthService.getUser();
        };

        $scope.showLoginForm = function () {
            AuthService.promptLogin();
        };
        $scope.isLoginFormVisible = function () {
            return AuthService.isLoginFormVisible();
        };

    }
}