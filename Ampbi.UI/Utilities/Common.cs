using Ampbi.DataAccess;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Ampbi.UI.Utilities
{
    public class Common
    {
        /// <summary>
        /// Variable to store Guid token 
        /// </summary>
        private Guid randomToken;

        /// <summary>
        /// Creates a short GUID token
        /// </summary>
        public void CreateShortGUID()
        {
            randomToken = Guid.NewGuid();
            //AmpbiConstants.shortRandomToken = randomToken;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="byteArrayIn"></param>
        /// <returns></returns>
        public Image byteArrayToImage(byte[] byteArrayIn)
        {
            MemoryStream ms = new MemoryStream(byteArrayIn);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }


        public static string IsEmail(string Email)
        {
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            if (re.IsMatch(Email))
                return "Valid";
            else
                return "Invalid";
        }

        public string getDate(int id)
        {

            var result = DateTime.Now;

            return string.Empty;
        }


        #region Code to be used for Entityframework conversion
        //var image = new ImageEntity(){
        //Content  = imageToByteArray(image)
        //}
        //_Context.Images.Add(image);
        //_Context.SaveChanges(); 
        #endregion




        /// <summary>
        /// Program to convert data set into excel sheets using Microsoft.Interop.Excel
        /// </summary>
        /// <param name="ds">Data set which is to be converted to excel</param>
        public static void ConvertToExcel(DataTable table)
        {
            DataSet ds = new DataSet();
            ds.Tables.Add(table);

            //Instance reference for Excel Application
            Microsoft.Office.Interop.Excel.Application objXL = null;
            //Workbook refrence
            Microsoft.Office.Interop.Excel.Workbook objWB = null;
            try
            {
                //Instancing Excel using COM services
                objXL = new Microsoft.Office.Interop.Excel.Application();
                //Adding WorkBook
                objWB = objXL.Workbooks.Add(ds.Tables.Count);
                //Variable to keep sheet count
                int sheetcount = 1;
                //Do I need to explain this ??? If yes please close my website and learn abc of .net .
                foreach (DataTable dt in ds.Tables)
                {
                    //Adding sheet to workbook for each datatable
                    Microsoft.Office.Interop.Excel.Worksheet objSHT = (Microsoft.Office.Interop.Excel.Worksheet)objWB.Sheets.Add();
                    //Naming sheet as SheetData1.SheetData2 etc....
                    objSHT.Name = "SheetData" + sheetcount.ToString();
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            //Condition to put column names in 1st row
                            //Excel work book indexes start from 1,1 and not 0,0
                            if (j == 0)
                            {
                                objSHT.Cells[1, i + 1] = dt.Columns[i].ColumnName.ToString();
                            }
                            //Writing down data
                            objSHT.Cells[j + 2, i + 1] = dt.Rows[j][i].ToString();
                        }
                    }
                    //Incrementing sheet count
                    sheetcount++;
                }
                //Saving the work book
                objWB.Saved = true;
                using (MemoryStream MyMemoryStream = new MemoryStream())
                {
                    objWB.SaveAs(MyMemoryStream);
                    //MyMemoryStream.WriteTo(Response.OutputStream);
                    //Response.Flush();
                    //Response.End();
                }  
              
              //  objWB.SaveCopyAs(S);
                objWB.Save();
                //Closing work book
                objWB.Close();
                //Closing excel application
                objXL.Quit();

            }
            catch (Exception ex)
            {
                objWB.Saved = true;
                //Closing work book
                objWB.Close();
                //Closing excel application
                objXL.Quit();
               // Response.Write("Illegal permission");
            }
        }
 
    }
    
    public static class Generi
    {


        public static MvcHtmlString MenuLinkBootstrap(
  this HtmlHelper helper,
  string text, string action, string controller)
        {
            var routeData = helper.ViewContext.RouteData.Values;
            var currentController = routeData["controller"];
            var currentAction = routeData["action"];

            if (String.Equals(action, currentAction as string,
            StringComparison.OrdinalIgnoreCase)
            &&
            String.Equals(controller, currentController as string,
            StringComparison.OrdinalIgnoreCase))
            {
                
                return new MvcHtmlString("<li class=\"active\">" + helper.ActionLink(text, action, controller) + "</li>");
            }
            return new MvcHtmlString("<li>" + helper.ActionLink(text, action, controller) + "</li>");
        }

        public static MvcHtmlString GetPageTitle(this HtmlHelper helper)
        {
            var actionName = helper.GetRouteDataValue("action");
            var controllerName = helper.GetRouteDataValue("controller");

            return new MvcHtmlString(controllerName + " - " + actionName);
        }

        private static string GetRouteDataValue(this HtmlHelper helper, string value)
        {
            return helper.ViewContext.RouteData.Values[value].ToString();
        }
        public static MvcHtmlString MenuLink(this HtmlHelper htmlHelper, string itemText, string actionName, string controllerName, MvcHtmlString[] childElements = null)
        {
            var currentAction = htmlHelper.ViewContext.RouteData.GetRequiredString("action");
            var currentController = htmlHelper.ViewContext.RouteData.GetRequiredString("controller");
            string finalHtml;
            var linkBuilder = new TagBuilder("a");
            var liBuilder = new TagBuilder("li");

            if (childElements != null && childElements.Length > 0)
            {
                linkBuilder.MergeAttribute("href", "#");
                linkBuilder.AddCssClass("dropdown-toggle");
                linkBuilder.InnerHtml = itemText + " <b class=\"caret\"></b>";
                linkBuilder.MergeAttribute("data-toggle", "dropdown");
                var ulBuilder = new TagBuilder("ul");
                ulBuilder.AddCssClass("dropdown-menu");
                ulBuilder.MergeAttribute("role", "menu");
                foreach (var item in childElements)
                {
                    ulBuilder.InnerHtml += item + "\n";
                }

                liBuilder.InnerHtml = linkBuilder + "\n" + ulBuilder;
                liBuilder.AddCssClass("dropdown");
                if (controllerName == currentController)
                {
                    liBuilder.AddCssClass("active");
                }

                finalHtml = liBuilder.ToString() + ulBuilder;
            }
            else
            {
                var urlHelper = new UrlHelper(htmlHelper.ViewContext.RequestContext, htmlHelper.RouteCollection);
                linkBuilder.MergeAttribute("href", urlHelper.Action(actionName, controllerName));
                linkBuilder.SetInnerText(itemText);
                liBuilder.InnerHtml = linkBuilder.ToString();
                if (controllerName == currentController && actionName == currentAction)
                {
                    liBuilder.AddCssClass("active");
                }

                finalHtml = liBuilder.ToString();
            }

            return new MvcHtmlString(finalHtml);
        }
    }

}