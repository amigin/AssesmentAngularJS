using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData;
using Faker;
using Microsoft.Ajax.Utilities;

namespace TestAssignmentApp.Controllers
{
    public class Customer
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
    }

    public class CustomersController : ApiController
    {
        private static readonly Lazy<List<Customer>> Customers = new Lazy<List<Customer>>(() =>
        {
            var result = new List<Customer>();
            for (int counter = 0; counter <= CustomersCountController.CustomerCount; counter++)
            {
                var c = new Customer
                {
                    Address = Address.StreetAddress(),
                    FirstName = Name.First(),
                    LastName = Name.Last(),
                    Company = Company.Name(),
                    City = Address.City(),
                    State = Address.UsState(),
                    ZipCode = Address.ZipCode(),
                    PhoneNumber = Phone.Number(),
                    EmailAddress = Internet.Email()
                };
                result.Add(c);
            }
            return result;
        }); 

        // ReSharper disable once ReturnTypeCanBeEnumerable.Global
 
        [EnableQuery]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IQueryable<Customer> Get()
        {
            return Customers.Value.AsQueryable();
        } 

    }
}
