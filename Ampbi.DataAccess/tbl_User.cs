//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Ampbi.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_User
    {
        public int UserSeq { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string UserStatus { get; set; }
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
        public string searchfield { get; set; }
        public string InternalExternalAccess { get; set; }
        public byte[] userimage { get; set; }
    }
}