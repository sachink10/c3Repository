using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class AdminRegistrationModel
    {
        public string SelectedOption { get; set; }
        public int USRSeq { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string CompanyName { get; set; }
        public string CompanyGUID { get; set; }
        public byte[] Logo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zip { get; set; }
        public string ContactPhone { get; set; }
        public string PrefferedContactMethod { get; set; }
        public Nullable<int> NoOfEmployee { get; set; }
        public Nullable<int> NoOfLicence { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string RecordStatus { get; set; }
        public string captchValue { get; set; }
    }
}
