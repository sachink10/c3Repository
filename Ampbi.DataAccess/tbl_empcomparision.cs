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
    
    public partial class tbl_empcomparision
    {
        public int EmpCompid { get; set; }
        public string CompanyGUID { get; set; }
        public string email { get; set; }
        public Nullable<int> kpimetricid { get; set; }
        public Nullable<System.DateTime> RecDate { get; set; }
        public string ComparisionType { get; set; }
        public Nullable<int> Best { get; set; }
        public Nullable<int> Average { get; set; }
        public Nullable<int> Me { get; set; }
    }
}