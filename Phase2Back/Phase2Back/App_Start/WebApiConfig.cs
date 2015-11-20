using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Phase2Back
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // enable cors
            config.EnableCors();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
