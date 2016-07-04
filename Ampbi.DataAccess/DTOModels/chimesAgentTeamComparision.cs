using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class chimesAgentTeamComparision
    {

        public string Metricname { get; set; }
        public Nullable<decimal> Me { get; set; }
        public Nullable<decimal> TeamAverage { get; set; }
        public Nullable<decimal> TeamBest { get; set; }
        public string cardcolor { get; set; }
        public Nullable<decimal> Youraveragevalue { get; set; }
        public Nullable<decimal> Teamaveragevalue { get; set; }
        public Nullable<decimal> Bestinteamaveragevalue { get; set; }
    }

   public class chimesAgentOrgComparision
   {

       public string Metricname { get; set; }
       public Nullable<decimal> Me { get; set; }
       public Nullable<decimal> TeamAverage { get; set; }
       public Nullable<decimal> TeamBest { get; set; }
       public string cardcolor { get; set; }
       public Nullable<decimal> Youraveragevalue { get; set; }
       public Nullable<decimal> Teamaveragevalue { get; set; }
       public Nullable<decimal> Bestinteamaveragevalue { get; set; }
   }
}
