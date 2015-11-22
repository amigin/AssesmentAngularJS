var App;
(function (App) {
    var DataRequester = (function () {
        function DataRequester($http) {
            this.$http = $http;
            this.recordsOnPage = 10;
        }
        DataRequester.prototype.deserializeModel = function (data) {
            return {
                address: data.Address,
                city: data.City,
                company: data.Company,
                email: data.EmailAddress,
                firstName: data.FirstName,
                lastName: data.LastName,
                phone: data.PhoneNumber,
                state: data.State,
                zip: data.ZipCode
            };
        };
        DataRequester.prototype.deserializeResponse = function (resp) {
            var result = new Array();
            var len = (resp.data.length);
            for (var i = 0; i < len; i++) {
                result.push(this.deserializeModel(resp.data[i]));
            }
            return result;
        };
        DataRequester.prototype.getData = function (page) {
            var _this = this;
            var q = page === 0 || page === undefined
                ? "$top=" + this.recordsOnPage
                : "$top=" + this.recordsOnPage + "&$skip=" + page * this.recordsOnPage;
            return this.$http.get("Api/Customers?" + q).then(function (resp) {
                return _this.deserializeResponse(resp);
            });
        };
        DataRequester.prototype.findData = function (phrase) {
            var _this = this;
            return this.$http.get(("Api/Customers?$filter=substringof(FirstName,'" + phrase + "')") +
                (" or substringof(LastName,'" + phrase + "')") +
                (" or substringof(Address,'" + phrase + "')") +
                (" or substringof(City,'" + phrase + "')") +
                (" or substringof(Company,'" + phrase + "')") +
                (" or substringof(EmailAddress,'" + phrase + "')") +
                (" or substringof(PhoneNumber,'" + phrase + "')") +
                (" or substringof(State,'" + phrase + "')") +
                (" or substringof(ZipCode,'" + phrase + "')")).then(function (resp) {
                return _this.deserializeResponse(resp);
            });
        };
        DataRequester.prototype.getCount = function () {
            return this.$http.get("Api/CustomersCount").then(function (resp) {
                return (resp.data).count;
            });
        };
        return DataRequester;
    })();
    App.DataRequester = DataRequester;
    app.service('dataRequester', ["$http", DataRequester]);
})(App || (App = {}));
//# sourceMappingURL=DataRequester.js.map