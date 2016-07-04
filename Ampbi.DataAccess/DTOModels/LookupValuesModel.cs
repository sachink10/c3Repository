using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class LookupValuesModel
    {
        public int Lkpseqid { get; set; }
        public string Modulename { get; set; }
        public string Columnname { get; set; }
        public string ActualValue { get; set; }
        public Nullable<bool> active { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Createdby { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string Updatedby { get; set; }
        public Nullable<System.DateTime> Updatedon { get; set; }
        public string Genericvarchar1 { get; set; }
        public string Genericvarchar2 { get; set; }
        public string Genericvarchar3 { get; set; }
        public Nullable<System.DateTime> GenericDate1 { get; set; }
        public Nullable<System.DateTime> GenericDate2 { get; set; }
        public Nullable<System.DateTime> GenericDate3 { get; set; }
        public Nullable<bool> Genericbit1 { get; set; }
        public Nullable<bool> Genericbit2 { get; set; }
        public Nullable<bool> Genericbit3 { get; set; }
        public Nullable<decimal> GenericNumeric1 { get; set; }
        public Nullable<decimal> GenericNumeric2 { get; set; }
        public Nullable<decimal> GenericNumeric3 { get; set; }
        public Nullable<int> displayorder { get; set; }
        public Nullable<bool> finalaction { get; set; }
        public Nullable<bool> WriteRecord { get; set; }
   
    }
}
