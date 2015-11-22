var App;
(function (App) {
    var MainController = (function () {
        function MainController($scope, $dataRequester) {
            this.$scope = $scope;
            this.$dataRequester = $dataRequester;
            $scope.showPagination = false;
            this.$scope.currentPage = 0;
        }
        MainController.prototype.getData = function (search) {
            var _this = this;
            console.log(search);
            if (search == undefined || search.length === 0) {
                this.$dataRequester.getData(this.$scope.currentPage).then(function (resp) {
                    _this.$scope.data = resp;
                    _this.$scope.sortType = "address";
                    _this.$scope.sortReverse = true;
                });
                this.$dataRequester.getCount().then(function (resp) {
                    var pages = new Array();
                    _this.$scope.maxPages = resp / 10;
                    for (var i = 1; i <= _this.$scope.maxPages; i++) {
                        pages.push(i);
                    }
                    _this.$scope.pages = pages;
                    _this.$scope.showPagination = true;
                });
            }
            else {
                this.$scope.showPagination = false;
                this.$dataRequester.findData(search).then(function (resp) {
                    _this.$scope.data = resp;
                    _this.$scope.sortType = "address";
                    _this.$scope.sortReverse = true;
                });
            }
        };
        MainController.prototype.setPage = function (no) {
            if (this.$scope.currentPage === no)
                return;
            this.$scope.currentPage = no;
            this.getData();
        };
        MainController.prototype.incPage = function () {
            if (this.$scope.currentPage >= this.$scope.maxPages - 1)
                return;
            this.$scope.currentPage += 1;
            this.getData();
        };
        MainController.prototype.decPage = function () {
            if (this.$scope.currentPage <= 0)
                return;
            this.$scope.currentPage -= 1;
            this.getData();
        };
        return MainController;
    })();
    angular.module('App').controller('MainController', ['$scope', 'dataRequester', MainController]);
})(App || (App = {}));
//# sourceMappingURL=MainController.js.map