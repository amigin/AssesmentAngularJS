module App {
    export interface IDataModel {
        address: string;
        city: string;
        company: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        state: string;
        zip:string;
    }


    export interface IDataRequester {
        getData(page: number): ng.IPromise<IDataModel[]>;

        findData(phrase: string): ng.IPromise<IDataModel[]>;

        getCount(): ng.IPromise<number>;
    }

    export class DataRequester implements IDataRequester {

        constructor(private $http: ng.IHttpService) {
            
        }


        private deserializeModel(data): IDataModel {
            return  {
                address: data.Address,
                city: data.City,
                company: data.Company,
                email: data.EmailAddress,
                firstName: data.FirstName,
                lastName: data.LastName,
                phone: data.PhoneNumber,
                state: data.State,
                zip: data.ZipCode
            }
        }

        private deserializeResponse(resp):IDataModel[] {
            var result = new Array<IDataModel>();
            var len = <number>(resp.data.length);
            for (var i = 0; i < len; i++) {
                result.push(this.deserializeModel(resp.data[i]));
            }

            return result;
        }
        private recordsOnPage = 10;

        getData(page: number): ng.IPromise<IDataModel[]> {

            var q = page === 0 || page=== undefined
                ? `$top=${this.recordsOnPage}`
                : `$top=${this.recordsOnPage}&$skip=${page * this.recordsOnPage}`;

            return this.$http.get(`Api/Customers?${q}`).then(resp => {
                return this.deserializeResponse(resp);
            });
        }

        findData(phrase: string): ng.IPromise<IDataModel[]> {
            return this.$http.get(`Api/Customers?$filter=substringof(FirstName,'${phrase}')` +
                ` or substringof(LastName,'${phrase}')`+
                ` or substringof(Address,'${phrase}')`+
                ` or substringof(City,'${phrase}')` +
                ` or substringof(Company,'${phrase}')` +
                ` or substringof(EmailAddress,'${phrase}')` +
                ` or substringof(PhoneNumber,'${phrase}')` +
                ` or substringof(State,'${phrase}')` +
                ` or substringof(ZipCode,'${phrase}')`


            ).then(resp => {
                return this.deserializeResponse(resp);
            });
        }

        getCount(): ng.IPromise<number> {
            return this.$http.get("Api/CustomersCount").then(resp => {
                return (<any>(resp.data)).count;
            });
        }

    }

    app.service('dataRequester', ["$http", DataRequester]);
}