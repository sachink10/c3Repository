using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class FirstTimeLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int UserSeq { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<bool> UserStatus { get; set; }
        public Nullable<int> UserType { get; set; }
        public string CompanyGuid { get; set; }
        public Nullable<int> SecretQuestion1 { get; set; }
        public string SecretAnswer1 { get; set; }
        public Nullable<int> SecretQuestion2 { get; set; }
        public string SecretAnswer2 { get; set; }
        public Nullable<int> SecretQuestion3 { get; set; }
        public string SecretAnswer3 { get; set; }
        public Nullable<System.DateTime> PasswordUpdatedDate { get; set; }
        public Nullable<bool> SecurityQuestionSet { get; set; }
        public Nullable<bool> FstTimeLogin { get; set; }
    }
}
