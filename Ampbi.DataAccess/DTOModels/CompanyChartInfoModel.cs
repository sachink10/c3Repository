using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class CompanyChartInfoModel
    {

        public int cciseq { get; set; }
        public string CompanyGUID { get; set; }
        public int ModuleID { get; set; }
        public Nullable<bool> Chart1 { get; set; }
        public string Chart1Name { get; set; }
        public Nullable<bool> Chart2 { get; set; }
        public string Chart2Name { get; set; }
        public Nullable<bool> Chart3 { get; set; }
        public string Chart3Name { get; set; }
        public Nullable<bool> Chart4 { get; set; }
        public string Chart4Name { get; set; }
    }
}
