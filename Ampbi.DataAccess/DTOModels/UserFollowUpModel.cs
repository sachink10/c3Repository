using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class UserFollowUpModel
    {
        public int USRFLWPSeq { get; set; }
        public  int USRSeq { get; set; }
        public string CompanyGUID { get; set; }
        public Nullable<System.DateTime> ContactDate { get; set; }
        public string Notes { get; set; }
        public string ContactedBy { get; set; }
        public Nullable<System.DateTime> Contactedon { get; set; }
        public string OutCome { get; set; }
    }
}
