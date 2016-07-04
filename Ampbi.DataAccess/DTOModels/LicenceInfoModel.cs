using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class LicenceInfoModel
    {
        public int Licenceseq { get; set; }
        public string licencekey { get; set; }
        public string CompanyGUID { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> ValidFromDate { get; set; }
        public Nullable<System.DateTime> ValideToDate { get; set; }
        public string AssignedTo { get; set; }
        public Nullable<bool> Trial { get; set; }
        public string ModuleName { get; set; }
        public string DefaultModule { get; set; }
    }
}
