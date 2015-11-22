using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;
using Microsoft.Ajax.Utilities;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json;

namespace TestAssignmentApp.Controllers
{
    public class ImagesController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Get(string id)
        {
            var wc = new WebClient();
            var response = wc.DownloadString(
                $"http://api.flickr.com/services/feeds/photos_public.gne?tags={id}&format=json")
                .Replace("jsonFlickrFeed(", "")
                .Replace("'", "")
                .TrimEnd(')');

            return new HttpResponseMessage() { Content = new StringContent(response, Encoding.UTF8, "application/json") };
        }
    }
}
