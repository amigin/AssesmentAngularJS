using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace TestAssignmentApp.Controllers
{
    public class CustomersCountController : ApiController
    {
        public const int CustomerCount = 100;
        
        public IHttpActionResult Get()
        {
            return Json(new { count = CustomerCount }) ;
        }
    }
}
