using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class AgentComparisonChartPopup
    {
        public Nullable<System.DateTime> dispvalue { get; set; }
        public string Month { get; set; }
        public Nullable<decimal> Goal { get; set; }
        public Nullable<decimal> Actual { get; set; }
    }
}
