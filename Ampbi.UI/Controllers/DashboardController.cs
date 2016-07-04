using Ampbi.Business.Business;
using Ampbi.Business.Interface;
using Ampbi.DataAccess.DTOModels;
using Ampbi.DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Ampbi.UI.Utilities;
using Microsoft.Ajax.Utilities;


namespace Ampbi.UI.Controllers
{
    public class DashboardController : Controller
    {
        #region Private Variables
        private IDashBoard dashDetails;
        private IAccountDetails accDetails;
        private DashBoard dashboard;
        private EmployeePerformanceObjects empPerformObj;
        private EmployeeIndividualPerformanceObjects empIndPerfObj;

        private string iconPath;
        #endregion

        #region defaultpage
        public ActionResult DefaultPage(string id)
        {
            //Checking the modiicon id
            if (Session["LoggedInUserEmail"] == null)
                return RedirectToAction("Login", "Account");
            dashDetails = new DashboardDetails();
            if (id != null)
                Session["modiicon"] = id;
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
                dashDetails.InsertMoodiTrans(Session["LoggedInUserEmail"].ToString(), iconPath);

            }
            DashBoard.modiIconPath = iconPath;
            // return View();
            if (Session["UserType"].ToString() == "4" || Session["UserType"].ToString() == "3")
                return RedirectToAction("MyMetrics", "Dashboard");
            else
                return View();
        }

        #endregion

        #region Model Popup

        [HttpGet]
        public ActionResult ModelPopup()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ModelPopup(FormCollection form)
        {
            return View();
        }

        #endregion

        #region UserProfile
        [HttpGet]
        public ActionResult UserProfile()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            dashDetails = new DashboardDetails();
            dashboard = new DashBoard();
            dashDetails.ModuleAudit("UserProfile", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());
            DashBoard.modiIconPath = iconPath;
            return View();
        }
        [HttpGet]
        public ActionResult GetUserProfile(string searchValue)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            return View("UserProfile", dashboard);
        }

        [HttpGet]
        public JsonResult GetUser()
        {
            dashDetails = new DashboardDetails();
            UserSecrect secret = new UserSecrect();
            List<string> lst = dashDetails.getusrProfileSearch();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetUserdetailFromSearch(string searchId)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashboard.usrSearchProfileUpdate = dashDetails.searchUsert(searchId);
            return Json(dashboard.usrSearchProfileUpdate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UserProfilePost(DataAccess.DTOModels.UserProfileUpdate model)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            bool result = dashDetails.UserProfileUpdated(model);
            return Json(result);
        }
        [HttpPost]
        public ActionResult UserProfile(DataAccess.DTOModels.UserProfileUpdate model)
        {

            return RedirectToAction("UserProfile");
        }

        #endregion

        #region company profile
        [HttpGet]
        public ActionResult CompanyProfile()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            DashBoard.modiIconPath = iconPath;
            dashboard.lstAllStateNames = dashDetails.GetAllStateNamesList();
            dashboard.LstNoOfEmpList = dashDetails.GetAllMiscToBind("Signup", "NoofEmployees");
            dashboard.LstNoOfLicencesList = dashDetails.GetAllMiscToBind("Signup", "NoofLicences");
            dashboard.LstNoOfRecStatusList = dashDetails.GetAllMiscToBind("Signup", "RecStatus");
            dashboard.LstNoOfPrefferedContact = dashDetails.GetAllMiscToBind("Signup", "PrefferedContactMethod");
            dashboard.companyRegModel = dashDetails.getRegisteredUserDetails(Session["ComapnyGuid"].ToString());

            return View("_PartialCompany", dashboard);
        }

        [HttpGet]
        public JsonResult GetCompany()
        {
            dashDetails = new DashboardDetails();
            UserSecrect secret = new UserSecrect();
            List<string> lst = dashDetails.getCompanyProfileSearch();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCompanySearchFromSearch(string companyname)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();

            dashboard.lstAllStateNames = dashDetails.GetAllStateNamesList();
            dashboard.LstNoOfEmpList = dashDetails.GetAllMiscToBind("Signup", "NoofEmployees");
            dashboard.LstNoOfLicencesList = dashDetails.GetAllMiscToBind("Signup", "NoofLicences");
            dashboard.LstNoOfPrefferedContact = dashDetails.GetAllMiscToBind("Signup", "PrefferedContactMethod");
            dashboard.companyRegModel = dashDetails.getCompanyProfileDetailOnSearch(companyname);
            return PartialView("_PartialCompanyProfile", dashboard);
        }

        #endregion




        #region Performance Dashboard

        public ActionResult UESSurvey()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            dashDetails = new DashboardDetails();
            dashboard = new DashBoard();
            dashDetails.ModuleAudit("UESSurvey", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());
            DashBoard.modiIconPath = iconPath;
            dashboard.parameters = dashDetails.getPerformanceParameter(Session["ComapnyGuid"].ToString());
            return View(dashboard);
        }

        [HttpPost]
        public JsonResult UesSurveyBindChartData(string location, string tradedate, string week,string month, string interval, string teammanger, string agent)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();

            dashboard.getUsesSurvey = dashDetails.getUesSurvey(Session["ComapnyGuid"].ToString(), "All", tradedate, week, "", interval, "All", "All");
            // dashboard.lstchartDetails = dashDetails.getDataToBindChart(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), 1, selectedDealerVal, selectedMarketVal, string.Empty, string.Empty, string.Empty, dt, type);
            return Json(dashboard.getUsesSurvey, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UESSurveybar()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            dashDetails = new DashboardDetails();
            dashboard = new DashBoard();
            dashDetails.ModuleAudit("UESSurvey", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());
            DashBoard.modiIconPath = iconPath;
            dashboard.parameters = dashDetails.getPerformanceParameter(Session["ComapnyGuid"].ToString());
            return View(dashboard);
        }

        [HttpPost]
        public JsonResult UesSurveybarBindChartData(string location, string tradedate, string week, string month, string interval, string teammanger, string agent,string lob)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();

            dashboard.getUsesSurveybar = dashDetails.getUesSurveybar(Session["ComapnyGuid"].ToString(),location,tradedate,week,month,interval,teammanger,agent,lob);
            // dashboard.lstchartDetails = dashDetails.getDataToBindChart(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), 1, selectedDealerVal, selectedMarketVal, string.Empty, string.Empty, string.Empty, dt, type);
            return Json(dashboard.getUsesSurveybar, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UesSurveybarBindChartData2(string charttype, string location, string tradedate, string week, string month, string interval, string teammanger, string agent,string lob)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();

            dashboard.getUsesSurveybar2 = dashDetails.getUesSurveybar2(Session["ComapnyGuid"].ToString(), charttype, location, tradedate, week, month, interval, teammanger, agent,lob);
            // dashboard.lstchartDetails = dashDetails.getDataToBindChart(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), 1, selectedDealerVal, selectedMarketVal, string.Empty, string.Empty, string.Empty, dt, type);
            return Json(dashboard.getUsesSurveybar2, JsonRequestBehavior.AllowGet);
        }



        [HttpGet]
        public ActionResult TrendChart()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            DashBoard.modiIconPath = iconPath;
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashDetails.ModuleAudit("TrendChart", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());

            dashboard.QAScoreChart1Name = dashDetails.getChartAxisName(Session["ComapnyGuid"].ToString(), "QA Dashboard", "QA – Trend", 1);
            //dashboard.lookupval = dashDetails.gettrendlookupvalue("site", string.Empty, string.Empty, string.Empty);
            return View("QATrend",dashboard);
        }

        [HttpPost]
        public JsonResult getTreeviewdata(string selection, string lob, string site, string teammanager)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();

            dashboard.getTreeviewdata = new List<string>();
            dashboard.selectedItems = new Dictionary<string, string>();

            //  List<string> str = new List<string>();

           

            string str = string.Empty;
            // dashboard.lookupval = dashDetails.gettrendlookupvalue("site", string.Empty, string.Empty, string.Empty);
            dashboard.getTreeviewdata.Add(dashDetails.gettrendlookupvalue(Session["ComapnyGuid"].ToString(),"LOB", string.Empty, string.Empty, string.Empty));
            if (string.IsNullOrEmpty(lob))
                lob = "All";
            dashboard.getTreeviewdata.Add(dashDetails.gettrendlookupvalue(Session["ComapnyGuid"].ToString(),"Sites", lob, site, teammanager));
            if (string.IsNullOrEmpty(site))
                site = "All";
            dashboard.getTreeviewdata.Add(dashDetails.gettrendlookupvalue(Session["ComapnyGuid"].ToString(),"Team Manager", lob, site, teammanager));
            if (string.IsNullOrEmpty(teammanager))
                teammanager = "All";
            dashboard.getTreeviewdata.Add(dashDetails.gettrendlookupvalue(Session["ComapnyGuid"].ToString(),"Agent", lob, site, teammanager));
           
            dashboard.selectedItems.Add("lob", lob);
            dashboard.selectedItems.Add("site", site);
            dashboard.selectedItems.Add("TeamManager", teammanager);
            dashboard.getTreeviewdata.Add(dashDetails.gettrendlookupvalue(Session["ComapnyGuid"].ToString(), "Metric", "All", "All", "All"));
            string str1 = RenderPartialView("_PartialTreeview", dashboard);
            return Json(new { Data = str1 }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult QATrendBindChartData(string metric,string lob, string site, string teammanager, string agent, string slidervalue, string type)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashboard.getc3TrendChart = dashDetails.getC3TrendChart1(Session["ComapnyGuid"].ToString(), metric, lob, site, teammanager, agent, slidervalue, type);
            // dashboard.lstchartDetails = dashDetails.getDataToBindChart(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), 1, selectedDealerVal, selectedMarketVal, string.Empty, string.Empty, string.Empty, dt, type);
            return Json(dashboard.getc3TrendChart, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult QATrendBindChartDataDrillDown(string metric, string lob, string site, string teammanager, string agent, string slidervalue, string type,string selecteddisp)
        {
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashboard.getc3trendchardrilldown = dashDetails.getC3TrendChart1DrillDown(Session["ComapnyGuid"].ToString(), metric, lob, site, teammanager, agent, slidervalue, type, selecteddisp);
            // dashboard.lstchartDetails = dashDetails.getDataToBindChart(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), 1, selectedDealerVal, selectedMarketVal, string.Empty, string.Empty, string.Empty, dt, type);
            return Json(dashboard.getc3trendchardrilldown, JsonRequestBehavior.AllowGet);
        }




        #endregion


        #region KPI

        //public ActionResult KPI()
        //{
        //    if (Session["modiicon"] != null)
        //    {
        //        iconPath = GetModiIconPath(Session["modiicon"].ToString());
        //    }
        //    dashboard = new DashBoard();
        //    dashDetails = new DashboardDetails();
        //    dashboard.CompanyModel = dashDetails.getCompanyInformation(Session["ComapnyGuid"].ToString());
        //    ViewBag.CompanyName = dashboard.CompanyModel.CompanyName;
        //    dashDetails.ModuleAudit("KPI", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());
        //    DashBoard.modiIconPath = iconPath;
        //    return View();
        //}


        ////public JsonResult KPIInsert(Ampbi.DataAccess.DTOModels.KPIMetricModel model)
        ////{
        ////    dashDetails = new DashboardDetails();
        ////    model.companGUID = Session["ComapnyGuid"].ToString();
        //    bool result = dashDetails.insertKPI(model);
        //    return Json(true, JsonRequestBehavior.AllowGet);
        //}


        //pranjal start update
        [HttpGet]
        public ActionResult GetAllCompanyName()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            DashBoard dashBoard = new DashBoard();
            DashboardDetails dashDetails = new DashboardDetails();
            dashBoard.lstAllCompanyNames = dashDetails.GetAllCompanyNameList();
            dashBoard.lstAllModuleName = dashDetails.GetModuleNameList();
            dashBoard.lstAllColor = dashDetails.GetAllColorList();
            // dashBoard.lstAllGoalcolor = dashDetails.GetAllGoalColorList(Session["ComapnyGuid"].ToString());

            return View("KPI", dashBoard);
        }

        [HttpGet]
        public JsonResult GetKpiSearch()
        {
            DashboardDetails dashDetails = new DashboardDetails();
            KPIMetricModel kpimodel = new KPIMetricModel();
            List<string> lst = dashDetails.GetKpi(Session["ComapnyGuid"].ToString());
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetKpiDetailsFromSearch(string kpiName)
        {
            DashBoard dashBoard = new DashBoard();
            DashboardDetails dashDetails = new DashboardDetails();
            dashBoard.kpiMetricModel = dashDetails.GetKpiProfileFromSearch(kpiName, Session["ComapnyGuid"].ToString());
            //dashboard.CompanyModel = dashDetails.getCompanyInformation(Session["ComapnyGuid"].ToString());
            // ViewBag.CompanyName = dashboard.CompanyModel.CompanyName.ToList();
            return Json(dashBoard.kpiMetricModel, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult CheckExistKpi(string kpiName)
        {
            DashboardDetails dashDetails = new DashboardDetails();
            bool status = dashDetails.CheckKPI(kpiName, Session["ComapnyGuid"].ToString());
            return Json(status, JsonRequestBehavior.AllowGet);
        }
        public JsonResult KpiInsertUpdate(Ampbi.DataAccess.DTOModels.KPIMetricModel kpiModel)
        {
            bool status;
            DashBoard dashBoard = new DashBoard();
            DashboardDetails dashDetails = new DashboardDetails();
            status = dashDetails.InsertKpi(kpiModel, Session["ComapnyGuid"].ToString());
            return Json(status, JsonRequestBehavior.AllowGet);
        }
        //End

        [HttpGet]
        public ActionResult KPI()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashboard.CompanyModel = dashDetails.getCompanyInformation(Session["ComapnyGuid"].ToString());
            ViewBag.CompanyName = dashboard.CompanyModel.CompanyName.ToList();
            dashDetails.ModuleAudit("KPI", Session["ComapnyGuid"].ToString(), Session["LoggedInUserEmail"].ToString());
            DashBoard.modiIconPath = iconPath;
            return View();
        }


        #endregion

        #region AccessLOG
        [HttpGet]
        public ActionResult GetAccessLogData(int? no)
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            DashBoard.modiIconPath = iconPath;
            dashboard = new DashBoard();
            dashDetails = new DashboardDetails();
            dashboard.lstAlllogdata = dashDetails.GetAccess(Session["LoggedInUserEmail"].ToString(), Session["ComapnyGuid"].ToString(), no);
            return View(dashboard);
            // return View("AccessLog");



        }
        #endregion

        #region User Settings

        public ActionResult UserSettings()
        {
            if (Session["modiicon"] != null)
            {
                iconPath = GetModiIconPath(Session["modiicon"].ToString());
            }
            DashBoard.modiIconPath = iconPath;
            dashDetails = new DashboardDetails();
            dashboard = new DashBoard();
            return View();
        }

        [HttpGet]
        public JsonResult GetUserData()
        {
            dashDetails = new DashboardDetails();
            //    DateTime dt = DateTime.Parse(Sliderval);
            var usermodel = dashDetails.getUserSettingData(Session["LoggedInUserEmail"].ToString());
            // bool result = dashDetails.InsertLog(model);
            return Json(usermodel, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateUserData()
        {
            dashDetails = new DashboardDetails();
            bool retval = false;
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var picture = System.Web.HttpContext.Current.Request.Files["pic"];
                var binaryReader = new BinaryReader(picture.InputStream);
                var binary = binaryReader.ReadBytes(picture.ContentLength);
                retval = dashDetails.UploadImage(binary, Session["LoggedInUserEmail"].ToString());
            }


            //    DateTime dt = DateTime.Parse(Sliderval);
            //  var usermodel = dashDetails.getUserSettingData(Session["LoggedInUserEmail"].ToString());
            // bool result = dashDetails.InsertLog(model);
            return Json(retval, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //public ActionResult UserSettings(HttpPostedFileBase model)
        //{
        //    if (Request.Files.Count == 1)
        //    { }

        //    if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        var picture = System.Web.HttpContext.Current.Request.Files["pic"];
        //    }

        //    //foreach (var file in files)
        //    //{
        //    //    if (file.ContentLength > 0)
        //    //    {
        //    //        var fileName = Path.GetFileName(file.FileName);
        //    //        var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
        //    //        file.SaveAs(path);
        //    //    }
        //    //}
        //    return View();
        //}


        #endregion

        #region LogOut

        [HttpGet]
        public ActionResult LogOut()
        {
            Session.Clear();
            Session.Abandon();
            Session.RemoveAll();

            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }

        #endregion

        #region private

        private string RenderPartialView(string viewName, object model)
        {
            ViewData.Model = model;
            using (System.IO.StringWriter writer = new System.IO.StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                ViewContext viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);
                viewResult.View.Render(viewContext, writer);

                return writer.GetStringBuilder().ToString();
            }
        }


        private string ExportToCSVFile(DataTable dtTable)
        {
            StringBuilder sbldr = new StringBuilder();
            if (dtTable.Columns.Count != 0)
            {
                foreach (DataColumn col in dtTable.Columns)
                {
                    sbldr.Append(col.ColumnName + ',');
                }
                sbldr.Append("\r\n");
                foreach (DataRow row in dtTable.Rows)
                {
                    foreach (DataColumn column in dtTable.Columns)
                    {
                        sbldr.Append(row[column].ToString() + ',');
                    }
                    sbldr.Append("\r\n");
                }
            }
            return sbldr.ToString();
        }


        private string GetModiIconPath(string id)
        {
            string path = string.Empty;
            if (!string.IsNullOrEmpty(id))
            {
                if (id == "1")
                    path = "active-green";
                else if (id == "2")
                    path = "active-yellow";
                else if (id == "3")
                    path = "active-red";
                //path = @"~/Content/assets/images/smile" + id + ".png";
            }
            return path;
        }
        //public string RemoveWhitespace(string input)
        //{
        //    return new string(input.ToCharArray()
        //        .Where(c => !Char.IsWhiteSpace(c))
        //        .ToArray());
        //}

        //string AddSpacesToSentence(string text, bool preserveAcronyms)
        //{
        //    if (string.IsNullOrWhiteSpace(text))
        //        return string.Empty;
        //    StringBuilder newText = new StringBuilder(text.Length * 2);
        //    newText.Append(text[0]);
        //    for (int i = 1; i < text.Length; i++)
        //    {
        //        if (char.IsUpper(text[i]))
        //            if ((text[i - 1] != ' ' && !char.IsUpper(text[i - 1])) ||
        //                (preserveAcronyms && char.IsUpper(text[i - 1]) &&
        //                 i < text.Length - 1 && !char.IsUpper(text[i + 1])))
        //                newText.Append(' ');
        //        newText.Append(text[i]);
        //    }
        //    return newText.ToString();
        //}


        [HttpPost]
        public JsonResult InsertLog(AppLogModel model)
        {
            dashDetails = new DashboardDetails();
            //    DateTime dt = DateTime.Parse(Sliderval);
            model.CompanyGUID = Session["ComapnyGuid"].ToString();
            model.UserEmailID = Session["LoggedInUserEmail"].ToString();
            bool result = dashDetails.InsertLog(model);

            return Json(true, JsonRequestBehavior.AllowGet);
        }





        #endregion
    }
}
