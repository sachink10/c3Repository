using Ampbi.DataAccess;
using Ampbi.DataAccess.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.Business.Interface
{
    public interface IAccountDetails
    {
        LoginModel ValidateUser(string _userName, string _password);
        //List<Ampbi.DataAccess.ref_SecretQuestion> GetAllQuestions();
        UserTypeModel GetRole(string _userEmail);
        List<SecretQuestionModel> getAllSecrectQuestions();
        bool updateFirstTimeDetails(FirstTimeLoginModel userModel, string EmailId);
        bool insertUserRegistrationDetails(UserRegistrationModel usrRegModel);
        bool insertAdminRegistrationDetails(AdminRegistrationModel adminRegModel);
        bool checkIfUserExists(string _userName);
        bool checkIfAdminExists(string _userName);
        List<Statelist> GetAllStateNamesList();
        FirstTimeLoginModel GetUserDetailsToBind(string Email);
        List<string> GetAllPasswordDetails(string Email);
        bool checkIfAnswerIsValid(string answerNumber, string answerValue);
        void updatedPassword(string userEmail, string userPassword);
        List<sp_getlistofvalues_Result> GetAllMiscToBind(string moduleName, string columName);
        string getMainMenu(string email);
      

    }
}
