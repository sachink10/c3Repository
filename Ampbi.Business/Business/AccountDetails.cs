using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Ampbi.Business.Interface;
using Ampbi.DataAccess.DTOModels;
using Ampbi.DataAccess;
using AutoMapper;
using System.IO;
using System.Drawing;
using System.Data.Entity.Core.Objects;

namespace Ampbi.Business.Business
{
    public class AccountDetails : IAccountDetails
    {
        public LoginModel ValidateUser(string _userName, string _password)
        {
            var userDto = new LoginModel();

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                
                var userDetails = entities.tbl_User.FirstOrDefault(u => u.Email == _userName
                     && u.Password == _password);
                Mapper.CreateMap<Ampbi.DataAccess.tbl_User, LoginModel>();
                userDto = Mapper.Map<Ampbi.DataAccess.tbl_User, LoginModel>(userDetails);
                return userDto;
            }
        }

        public UserTypeModel GetRole(string _userEmail)
        {
            var userTypeDto = new UserTypeModel();

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var tblUserDetail = entities.tbl_User.SingleOrDefault(u => u.Email == _userEmail);
                var roleID = tblUserDetail.UserType;
                var userTypeDetails = entities.ref_UserType.SingleOrDefault(u => u.UserTypeID == roleID);

                Mapper.CreateMap<Ampbi.DataAccess.ref_UserType, UserTypeModel>();
                userTypeDto = Mapper.Map<Ampbi.DataAccess.ref_UserType, UserTypeModel>(userTypeDetails);
                return userTypeDto;
            }
        }

        public List<SecretQuestionModel> getAllSecrectQuestions()
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            IEnumerable<SecretQuestionModel> questionsList =
                from p in entities.ref_SecretQuestion
                select new SecretQuestionModel { SecSeq = p.SecSeq, SecretQuestion = p.SecretQuestion };
            return questionsList.ToList();
        }

        public bool updateFirstTimeDetails(FirstTimeLoginModel userModel, string EmailId)
        {
            bool updateStatus = false;
            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                tbl_User objUser = entities.tbl_User.First(m => m.Email == EmailId);
                objUser.SecretQuestion1 = userModel.SecretQuestion1;
                objUser.SecretAnswer1 = userModel.SecretAnswer1;
                objUser.SecretQuestion2 = userModel.SecretQuestion2;
                objUser.SecretAnswer2 = userModel.SecretAnswer2;
                objUser.SecretQuestion3 = userModel.SecretQuestion3;
                objUser.SecretAnswer3 = userModel.SecretAnswer3;
                objUser.FstTimeLogin = true;
                entities.SaveChanges();
                updateStatus = true;
            }
            return updateStatus;
        }

        public bool insertUserRegistrationDetails(UserRegistrationModel usrRegModel)
        {
            bool insertStatus = false;
            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                tbl_User tblUserReg = new tbl_User
                {
                    Email = usrRegModel.Email,
                    FirstName = usrRegModel.FirstName,
                    LastName = usrRegModel.LastName,
                    Password = usrRegModel.Password,
                    UserType = 1,
                    FstTimeLogin = false
                    
                };
                entities.tbl_User.Add(tblUserReg);
                entities.SaveChanges();

                insertStatus = true;
            }
            return insertStatus;
        }

        public bool insertAdminRegistrationDetails(AdminRegistrationModel adminRegModel)
        {
            bool insertStatus = false;

            //Create GUID
            adminRegModel.CompanyGUID = Convert.ToString(Guid.NewGuid());

            //Convert image to ByteArray
            //imageToByteArray(adminRegModel.Logo);


            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                tbl_UserRegistration tblAdminReg = new tbl_UserRegistration
                {
                    FirstName = adminRegModel.FirstName,
                    LastName = adminRegModel.LastName,
                    Email = adminRegModel.Email,
                    Password = adminRegModel.Password,
                    CompanyName = adminRegModel.CompanyName,
                    CompanyGUID = adminRegModel.CompanyGUID,
                    Logo = null,
                    Address1 = adminRegModel.Address1,
                    Address2 = adminRegModel.Address2,
                    City = adminRegModel.City,
                    State = adminRegModel.State,
                    Zip = adminRegModel.Zip,
                    ContactPhone = adminRegModel.ContactPhone,
                    PrefferedContactMethod = adminRegModel.PrefferedContactMethod,
                    NoOfEmployee = adminRegModel.NoOfEmployee,
                    NoOfLicence = adminRegModel.NoOfLicence,
                    CreatedDate = DateTime.Today.Date,
                    RecordStatus = "2"
                    
                };
                entities.tbl_UserRegistration.Add(tblAdminReg);
                entities.SaveChanges();
                insertStatus = true;
            }
            return insertStatus;
        }

        public bool checkIfUserExists(string _userName)
        {
            bool existigntStatus = false;
            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var myUserStatus = entities.tbl_User.Any(user => user.Email == _userName);
                existigntStatus = myUserStatus;
            }
            return existigntStatus;
        }

        public bool checkIfAdminExists(string _userName)
        {
            bool existigntStatus = false;
            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var myUserStatus = entities.tbl_UserRegistration.Any(admin => admin.Email == _userName);
                existigntStatus = myUserStatus;
            }
            return existigntStatus;
        }

        public List<Statelist> GetAllStateNamesList()
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            IEnumerable<Statelist> stateList =
                from p in entities.statelists
                select new Statelist() { statecode = p.statecode, statename = p.statename };
            return stateList.ToList();
        }

        public FirstTimeLoginModel GetUserDetailsToBind(string Email)
        {
            var userDto = new FirstTimeLoginModel();

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var userDetails = entities.tbl_User.FirstOrDefault(u => u.Email == Email);
                Mapper.CreateMap<Ampbi.DataAccess.tbl_User, FirstTimeLoginModel>();
                userDto = Mapper.Map<Ampbi.DataAccess.tbl_User, FirstTimeLoginModel>(userDetails);
                return userDto;
            }
        }

        public List<string> GetAllPasswordDetails(string Email)
        {
            AmpbidevEntities dataAccess = new AmpbidevEntities();

            var quuery = (from usr in dataAccess.tbl_User
                where usr.Email == Email
                select usr).FirstOrDefault();
            List<string> lst = new List<string>();


            var SQ1 = (from sq in dataAccess.ref_SecretQuestion
                where sq.SecSeq == quuery.SecretQuestion1
                select sq.SecretQuestion).FirstOrDefault();
            var SQ2 = (from sq in dataAccess.ref_SecretQuestion
                where sq.SecSeq == quuery.SecretQuestion2
                select sq.SecretQuestion).FirstOrDefault();
            var SQ3 = (from sq in dataAccess.ref_SecretQuestion
                where sq.SecSeq == quuery.SecretQuestion3
                select sq.SecretQuestion).FirstOrDefault();
            
            
            lst.Add(SQ1);
            lst.Add(SQ2);
            lst.Add(SQ3);

            return lst;
        }


        public bool checkIfAnswerIsValid(string answerNumber, string answerValue)
        {
            bool isValid = false;
            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                if (answerNumber.Contains("SecretAnswer1"))
                {
                    var myUserStatus = entities.tbl_User.Any(user => user.SecretAnswer1 == answerValue);
                    isValid = myUserStatus;   
                }
                else if(answerNumber.Contains("SecretAnswer2"))
                {
                    var myUserStatus = entities.tbl_User.Any(user => user.SecretAnswer2 == answerValue);
                    isValid = myUserStatus;   
                }
                else if (answerNumber.Contains("SecretAnswer3"))
                {
                    var myUserStatus = entities.tbl_User.Any(user => user.SecretAnswer3 == answerValue);
                    isValid = myUserStatus;   
                }
            }
            return isValid;
        }


        public void updatedPassword(string userEmail, string userPassword)
        {
            using (AmpbidevEntities entities=new AmpbidevEntities())
            {
                tbl_User user = entities.tbl_User.First(i => i.Email == userEmail);
                user.Password = userPassword;
                entities.SaveChanges();
            }
        }

        public List<sp_getlistofvalues_Result> GetAllMiscToBind(string moduleName, string columName)
        {
            AmpbidevEntities dataAccess = new AmpbidevEntities();

            var prm = new ObjectParameter("lkpseqid", typeof(int));
            prm.Value = null;

            var prm1 = new ObjectParameter("description", typeof(string));
            prm1.Value = null;

            var prm2 = new ObjectParameter("finalAction", typeof(bool));
            prm2.Value = null;

            var prm3 = new ObjectParameter("writerecord", typeof(bool));
            prm3.Value = null;

            List<sp_getlistofvalues_Result> query = (from usr in dataAccess.sp_getlistofvalues(moduleName, columName, prm, prm1, prm2, prm3)
                                                     select usr).ToList();            
            return query.ToList();
        }
        public string getMainMenu(string email)
        {
            AmpbidevEntities dataAccess = new AmpbidevEntities();

            var result =String.Join(",", (from main in dataAccess.sp_getMainMenu(email)
                          select  main).ToList());

            return result;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="imageIn"></param>
        /// <returns></returns>
        public byte[] imageToByteArray(Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            return ms.ToArray();
        }

    }
}
