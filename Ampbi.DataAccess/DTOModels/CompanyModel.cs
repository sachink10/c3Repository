using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class CompanyModel
    {
        public int CompanySeq { get; set; }
        public string CompanyGUID { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zip { get; set; }
        public Nullable<int> NoofEmployee { get; set; }
        public Nullable<int> NoofLicence { get; set; }
        public Nullable<System.DateTime> TrialStartDate { get; set; }
        public Nullable<System.DateTime> TrialEndDate { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string outcome { get; set; }
        public string NoofAttempts { get; set; }
       
    }
}
