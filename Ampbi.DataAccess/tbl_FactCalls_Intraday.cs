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
    
    public partial class tbl_FactCalls_Intraday
    {
        public int TblId { get; set; }
        public string CompanyGUID { get; set; }
        public Nullable<System.DateTime> ReportDate { get; set; }
        public string RecHour { get; set; }
        public Nullable<int> DispositionLevelID1 { get; set; }
        public string DispositionLevel1 { get; set; }
        public Nullable<int> DispositionLevelID2 { get; set; }
        public string DispositionLevel2 { get; set; }
        public Nullable<int> DispositionLevelID3 { get; set; }
        public string DispositionLevel3 { get; set; }
        public Nullable<int> DispositionLevelID4 { get; set; }
        public string DispositionLevel4 { get; set; }
        public Nullable<int> Dealershipdid { get; set; }
        public string DealerName { get; set; }
        public Nullable<int> Marketid { get; set; }
        public string MarketName { get; set; }
    }
}
