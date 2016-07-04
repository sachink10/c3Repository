using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class IndividualPerformanceCard
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string KPIMetricName { get; set; }
        public int goal { get; set; }
        public int actual { get; set; }
        public int coachings { get; set; }
    }
}
