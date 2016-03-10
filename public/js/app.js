var app = angular.module('myApp', []);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
});

app.constant('URL', 'data/');

app.factory('DataService', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'content.json');
    };

    return {
        getData: getData
    };
});

app.factory('TemplateService', function ($http, URL) {
    var getTemplates = function () {
        return $http.get(URL + 'templates.json');
    };

    return {
        getTemplates: getTemplates
    };
});

app.controller('ContentCtrl', function ($scope, DataService) {
    var ctrl = this;

    $scope.content = [];

    $scope.imagePath = 'images/abc4.jpg';

    $scope.fetchContent = function () {
        DataService.getData().then(function (result) {
            $scope.content = result.data;
        });
    };

    $scope.fetchContent();
});

app.directive('postItem', function ($compile, TemplateService) {
    var getTemplate = function (templates, contentType) {
        var template = '';

        switch (contentType) {
            case 'text':
                template = templates.textTemplate;
                break;
            case 'mix':
                template = templates.mixTemplate;
                break;
            case 'notes':
                template = templates.noteTemplate;
                break;
        }

        return template;
    };

    var linker = function (scope, element, attrs) {
        scope.rootDirectory = 'images/';

        TemplateService.getTemplates().then(function (response) {
            var templates = response.data;

            element.html(getTemplate(templates, scope.content.content_type));

            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: 'E',
        link: linker,
        scope: {
            content: '='
        }
    };
});

