using Ampbi.DataAccess.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.ViewModel
{
    public class UserSecrect
    {
        public LoginModel loginModel { get; set; }
        public FirstTimeLoginModel userModel { get; set; }
        public SecretQuestionModel secQuestion { get; set; }
        public List<SecretQuestionModel> lstAllSecQuest { get; set; }
        public string userEmail { get; set; }
    }
}
