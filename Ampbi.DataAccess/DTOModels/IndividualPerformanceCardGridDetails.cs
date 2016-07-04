using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class IndividualPerformanceCardGridDetails
    {
        public string coachingassigneddate { get; set; }
        public string KPIMetricName { get; set; }
        public string Reason { get; set; }
        public Nullable<int> Goal { get; set; }
        public Nullable<int> commitment { get; set; }
        public Nullable<int> Actual { get; set; }
        public string Recording { get; set; }
    }
}
