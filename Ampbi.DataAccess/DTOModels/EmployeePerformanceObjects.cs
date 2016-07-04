using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class EmployeePerformanceObjects
    {
        public List<KPIMetricModel> metricList { get; set; }
        public List<EmployeePerformanceCount> employeeListCount { get; set; }
        public List<EmployeePerformaceCard> employeePerformanceCardList { get; set; }
        public List<EmployeePerformaceCardMonthly> employeePerformanceCardListMonthly { get; set; }
        public Dictionary<string,byte[]> empAgentPicture { get; set; }
    }
}
