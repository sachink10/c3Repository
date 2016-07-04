using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class ChimesAgentmymetrics
    {
        public string Employeename { get; set; }
        public string Title { get; set; }
        public string Programsassigned { get; set; }
        public string Companyname { get; set; }
        public string KpiMetricName { get; set; }
        public Nullable<int> Goal { get; set; }
        public Nullable<int> Actual { get; set; }
        public Nullable<decimal> Percenttogoal { get; set; }
        public byte[] PictureImage { get; set; }
        public Nullable<int> OpenTasks { get; set; }
        public Nullable<int> Completedcoachings { get; set; }
        public string CardColor { get; set; }
        public int teamrank { get; set; }
        
    }
}
