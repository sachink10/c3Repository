using Ampbi.Business.Business;
using Ampbi.Business.Interface;
using Ampbi.DataAccess.DTOModels;
using Ampbi.DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Ampbi.UI.Utilities;
using SRVTextToImage;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;

namespace Ampbi.UI.Controllers
{
    public class AccountController : Controller
    {
        #region Private variables
        private IAccountDetails accDetails;
        private LoginModel _user;
        private UserSecrect secrecQuest;
        private Registration registrationDetails;
        #endregion
        
        #region Login
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public object Login(UserSecrect user)
        {
            accDetails = new AccountDetails();

            if (ModelState.IsValid)
            {
                _user = accDetails.ValidateUser(user.loginModel.Email, user.loginModel.Password);
                if (_user != null)
                {
                    FormsAuthentication.SetAuthCookie(_user.Email, true);
                    
                    Session["ComapnyGuid"] = _user.CompanyGuid;
                    Session["LoggedInUserEmail"] = _user.Email;
                    Session["UserName"] = _user.FirstName + " " + _user.LastName;
                    Session["UserType"] = _user.UserType;

                    if (_user.UserType == 4)
                        DashBoard.IsAgentLogin = true;
                    else
                        DashBoard.IsAgentLogin = false;
                    //Code to check if the user is a first time login
                    if (_user.FstTimeLogin == false)
                        return RedirectToAction("UserFirstTimeLogin", "Account");
                    else
                    {
                        DashBoard.mainMenuItem = accDetails.getMainMenu(_user.Email);
                        return RedirectToAction("ModelPopup", "Dashboard");
                    }
                }
                else
                {
                    ModelState.AddModelError("error_msg", "Kindly check your credentials");
                }

            }
            return View();
        } 
        #endregion

        #region UserFirstTimeLogin
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult UserFirstTimeLogin()
        {
            if (ModelState.IsValid)
            {
                secrecQuest = new UserSecrect();
                accDetails = new AccountDetails();
                secrecQuest.lstAllSecQuest = accDetails.getAllSecrectQuestions();
                secrecQuest.userModel = accDetails.GetUserDetailsToBind(HttpContext.User.Identity.Name);
                secrecQuest.userEmail = HttpContext.User.Identity.Name;
                return View(secrecQuest);
            }
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserFirstTimeLogin(UserSecrect user)
        {
            if (ModelState.IsValid)
            {
                string userEmail = HttpContext.User.Identity.Name;
                accDetails = new AccountDetails();
                bool updStatus = accDetails.updateFirstTimeDetails(user.userModel, userEmail);
                DashBoard.mainMenuItem = accDetails.getMainMenu(_user.Email);
                return RedirectToAction("ModelPopup", "Dashboard");
            }
            secrecQuest = new UserSecrect();
            accDetails = new AccountDetails();
            secrecQuest.lstAllSecQuest = accDetails.getAllSecrectQuestions();
            return View(secrecQuest);
        } 
        #endregion

        #region Register
        /// <summary>
        /// 
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public JsonResult IsUserAvailable(FormCollection form)
        {
            string Email = form["username"];

            string isValidEmail = Ampbi.UI.Utilities.Common.IsEmail(Email);
            if (isValidEmail == "Invalid")
                return Json(isValidEmail);

            if (Email != null)
            {
                accDetails = new AccountDetails();
                bool myUserExists = accDetails.checkIfUserExists(Email);
                if (myUserExists)
                {
                    return Json(myUserExists, JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(myUserExists, JsonRequestBehavior.AllowGet);
            }
            return new JsonResult();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public JsonResult IsAdminUserAvailable(FormCollection form)
        {
            string Email = form["username"];

            string isValidEmail = Ampbi.UI.Utilities.Common.IsEmail(Email);
            if (isValidEmail == "Invalid")
                return Json(isValidEmail);

            if (Email != null)
            {
                accDetails = new AccountDetails();
                bool myUserExists = accDetails.checkIfAdminExists(Email);
                if (myUserExists)
                {
                    return Json(myUserExists, JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(myUserExists, JsonRequestBehavior.AllowGet);
            }
            return new JsonResult();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Register()
        {
            if (ModelState.IsValid)
            {
                registrationDetails = new Registration();
                accDetails = new AccountDetails();
                registrationDetails.LstNoOfEmpList = accDetails.GetAllMiscToBind("Signup","NoofEmployees");
                registrationDetails.LstNoOfLicencesList = accDetails.GetAllMiscToBind("Signup","NoofLicences");
                registrationDetails.lstAllStateNames = accDetails.GetAllStateNamesList();
                registrationDetails.LstPreferedContactMethod = accDetails.GetAllMiscToBind("Signup", "PrefferedContactMethod");
                return View(registrationDetails);
            }
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="regisDetail"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Register(Registration regisDetail, string id, string CaptchaText)
        {
            if (ModelState.IsValid)
            {
                registrationDetails = new Registration();
                accDetails = new AccountDetails();
                registrationDetails.LstNoOfEmpList = accDetails.GetAllMiscToBind("Signup","NoofEmployees");
                registrationDetails.LstNoOfLicencesList = accDetails.GetAllMiscToBind("Signup","NoofLicences");
                registrationDetails.lstAllStateNames = accDetails.GetAllStateNamesList();
                registrationDetails.LstPreferedContactMethod = accDetails.GetAllMiscToBind("Signup", "PrefferedContactMethod");

                if (this.Session["CaptchaImageText"].ToString() != regisDetail.adminRegModel.captchValue)
                {
                    
                    ViewBag.Message = "Invalid captch you have entered!";
                    return View(registrationDetails);
                }
                if (id == "0")
                {
                    bool status = accDetails.insertUserRegistrationDetails(regisDetail.userRegModel);
                    
                    return RedirectToAction("Login", "Account");
                }
                else
                {
                    bool status = accDetails.insertAdminRegistrationDetails(regisDetail.adminRegModel);
                    
                    return RedirectToAction("Login", "Account");
                }
            }
            return View(regisDetail);
        }

        public FileResult GetCaptchaImage()
        {
            CaptchaRandomImage CI = new CaptchaRandomImage();
            this.Session["CaptchaImageText"] = CI.GetRandomString(5); // here 5 means I want to get 5 char long captcha
            //CI.GenerateImage(this.Session["CaptchaImageText"].ToString(), 300, 75);
            // Or We can use another one for get custom color Captcha Image 
            CI.GenerateImage(this.Session["CaptchaImageText"].ToString(), 300, 75, Color.DarkGray, Color.White);
            MemoryStream stream = new MemoryStream();
            CI.Image.Save(stream, ImageFormat.Png);
            stream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(stream, "image/png");
        }

        
        #endregion

        #region Forgot Password
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult ForgotPassowd()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secrect"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ForgotPassowd(UserSecrect secrect)
        {
            //if (ModelState.IsValid)
            //{
            registrationDetails = new Registration();
            accDetails = new AccountDetails();
            accDetails.updatedPassword(secrect.userModel.Email, secrect.userModel.Password);
            //}
            return RedirectToAction("Login", "Account");

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public JsonResult FetcAllPasswordQuestions(FormCollection form)
        {
            string Email = form["username"];

            string isValidEmail = Ampbi.UI.Utilities.Common.IsEmail(Email);
            if (isValidEmail == "Invalid")
                return Json(isValidEmail);

            if (Email != null)
            {
                accDetails = new AccountDetails();
                var getList = accDetails.GetAllPasswordDetails(HttpContext.User.Identity.Name);

                if (getList != null)
                {
                    return Json(getList, JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(getList, JsonRequestBehavior.AllowGet);
            }
            return new JsonResult();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public JsonResult CheckAnswersForPasswordQuestions(FormCollection form)
        {
            string answerNo = form["answer"];
            string answerValue = form["selectedValue"];
            if (answerNo != null || answerValue != null)
            {
                accDetails = new AccountDetails();
                var getList = accDetails.checkIfAnswerIsValid(answerNo, answerValue);
                if (getList != null)
                {
                    return Json(getList, JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(getList, JsonRequestBehavior.AllowGet);
            }
            return new JsonResult();
        } 
        #endregion


    }
}
