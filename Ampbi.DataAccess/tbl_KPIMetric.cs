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
    
    public partial class tbl_KPIMetric
    {
        public int KPIMetricId { get; set; }
        public string companyguid { get; set; }
        public string KPIMetricName { get; set; }
        public string ShortName { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<int> displayorder { get; set; }
        public string InternalExternalAccess { get; set; }
        public string DefaultKPI { get; set; }
        public string modulename { get; set; }
        public string PercentagetoGoalCalculationType { get; set; }
    }
}