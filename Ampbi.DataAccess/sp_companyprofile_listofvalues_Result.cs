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
    
    public partial class sp_companyprofile_listofvalues_Result
    {
        public int Licenceseq { get; set; }
        public string LicenceKey { get; set; }
        public string CompanyGUID { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> ValidFromDate { get; set; }
        public Nullable<System.DateTime> ValideToDate { get; set; }
        public string AssignedTo { get; set; }
        public Nullable<bool> Trial { get; set; }
        public Nullable<System.DateTime> TrialStartDate { get; set; }
        public Nullable<System.DateTime> TrialEndDate { get; set; }
    }
}
