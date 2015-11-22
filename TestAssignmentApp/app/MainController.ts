
module App {



    interface IMainControllerModel {
        data: any;
        sortType: string;
        sortReverse: boolean;
        showPagination: boolean;
        pages: number[];
        currentPage: number;
        maxPages:number;
        getData(): void;
   
    }

    class MainController {
        constructor(private $scope: IMainControllerModel, private $dataRequester: IDataRequester) {
            $scope.showPagination = false;
            this.$scope.currentPage = 0;
        }

        getData(search?: string): void {
            console.log(search);


            if (search == undefined || search.length ===0) {

                this.$dataRequester.getData(this.$scope.currentPage).then(resp => {
                    this.$scope.data = resp;
                    this.$scope.sortType = "address";
                    this.$scope.sortReverse = true;
                });

                this.$dataRequester.getCount().then(resp => {
                    var pages = new Array<number>();
                    this.$scope.maxPages = resp / 10;
                    for (var i = 1; i <= this.$scope.maxPages; i++) {
                        pages.push(i);
                    }
                    this.$scope.pages = pages;
                    this.$scope.showPagination = true;
                });

            } else {
                this.$scope.showPagination = false;
                this.$dataRequester.findData(search).then(resp => {
                    this.$scope.data = resp;
                    this.$scope.sortType = "address";
                    this.$scope.sortReverse = true;
                });
            }
        }

        setPage(no: number) {
            if (this.$scope.currentPage === no)
                return;
            this.$scope.currentPage = no;
            this.getData();
        }

        incPage() {
            if (this.$scope.currentPage >= this.$scope.maxPages-1) return;
            this.$scope.currentPage += 1;
            this.getData();
        }

        decPage() {
            if (this.$scope.currentPage <=0) return;
            this.$scope.currentPage -= 1;
            this.getData();
        }


    }

    angular.module('App').controller('MainController', ['$scope', 'dataRequester', MainController]);
       
}


