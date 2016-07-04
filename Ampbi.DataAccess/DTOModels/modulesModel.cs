using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class modulesModel
    {
        public int Moduleid { get; set; }
        public string ModuleName { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> DisplayOrder { get; set; }
    }
}
