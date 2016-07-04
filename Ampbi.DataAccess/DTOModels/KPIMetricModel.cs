using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class KPIMetricModel
    {
        public string companGUID { get; set; }
        public string companyName { get; set; }
        public string KPIName { get; set; }
        public string ModuleName { get; set; }
        public int UserTypes { get; set; }
        public string ShortName { get; set; }
        //  public bool Active { get; set; }
        //pranjal start update
        // public int Goal { get; set; }
        public int? DisplayOrder { get; set; }
        public bool? Active { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        //meticgoal
        public Nullable<int> Goal { get; set; }
        public string programname { get; set; }
        public string CoachingColorbelowGoal { get; set; }
        public string CoachingColormeetGoal { get; set; }
        public string CoachingColorAboveGoal { get; set; }
        public Nullable<int> valuebelowgoal { get; set; }
        public Nullable<int> valueabovegoal { get; set; }
        public Nullable<int> valuemeetgoal { get; set; }



        //end
        //For the second result set of Employee Performance
        public int KPIMetricId { get; set; }
        
    }
}
