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
    
    public partial class tbl_KPIMetricGoal
    {
        public string CompanyGuid { get; set; }
        public Nullable<int> KPIMetricId { get; set; }
        public Nullable<int> Goal { get; set; }
        public string CoachingColorbelowGoal { get; set; }
        public string CoachingColormeetGoal { get; set; }
        public string CoachingColorAboveGoal { get; set; }
        public string programname { get; set; }
        public Nullable<int> valuebelowgoal { get; set; }
        public Nullable<int> valueabovegoal { get; set; }
        public Nullable<int> valuemeetgoal { get; set; }
    }
}
