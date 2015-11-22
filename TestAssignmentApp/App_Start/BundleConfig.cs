using System.Web;
using System.Web.Optimization;

namespace TestAssignmentApp
{
    public class BundleConfig
    {
        

        public static string AdminAppDir = "app";
        public const string Css = "~/Content/css";
        public const string ScriptsBundle = "~/Scipts/js";
        public const string ScriptsAppJs = "~/Scripts/app";
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle(ScriptsBundle).Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js",
                $"~/{AdminAppDir}/app.module.js",
                $"~/{AdminAppDir}/app.core.module.js")
                );

            bundles.Add(new ScriptBundle(ScriptsAppJs).Include("~/app/app.js", "~/app/DataRequester.js", "~/app/MainController.js"));

            bundles.Add(new StyleBundle(Css).Include(
                      "~/Content/bootstrap.css"));
        }
    }
}
