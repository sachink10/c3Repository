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
    
    public partial class DynamicParameterList
    {
        public int Listid { get; set; }
        public string CompanyGuid { get; set; }
        public string ModuleName { get; set; }
        public string DashboardName { get; set; }
        public string ParameterName { get; set; }
        public string ParamValue { get; set; }
        public Nullable<int> displayorder { get; set; }
        public Nullable<bool> isactive { get; set; }
        public Nullable<System.DateTime> startdate { get; set; }
        public Nullable<System.DateTime> enddate { get; set; }
    }
}