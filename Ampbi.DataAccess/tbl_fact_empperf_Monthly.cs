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
    
    public partial class tbl_fact_empperf_Monthly
    {
        public int Tblid { get; set; }
        public string CompanyGUID { get; set; }
        public int KPIMetricId { get; set; }
        public Nullable<decimal> RecMonth { get; set; }
        public string RecYear { get; set; }
        public string Email { get; set; }
        public Nullable<int> EmployeeNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Title { get; set; }
        public Nullable<int> Goal { get; set; }
        public Nullable<int> Actual { get; set; }
        public string PerctoGoal { get; set; }
        public Nullable<int> NoofTasks { get; set; }
        public string assignedprimaryprogram { get; set; }
    }
}
