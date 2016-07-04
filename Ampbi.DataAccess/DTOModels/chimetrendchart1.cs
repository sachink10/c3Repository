using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class c3trendchart1
    {
        public Nullable<System.DateTime> dispdate { get; set; }
        public string showvalue { get; set; }
        public Nullable<int> sno { get; set; }
        public Nullable<decimal> score { get; set; }
    }
    public class c3trendchartdrilldown
    {
        public Nullable<int> interval { get; set; }
        public string showvalue { get; set; }
        public Nullable<long> serial_number { get; set; }
        public Nullable<decimal> Actual { get; set; }
    }
}
