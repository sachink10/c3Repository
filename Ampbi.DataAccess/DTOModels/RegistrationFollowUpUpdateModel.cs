using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
     public  class RegistrationFollowUpUpdateModel
    {
         public int UserSeq { get; set; }
         public string email { get; set; }
         public string CompanyGUID { get; set; }
         public string CompanyName { get; set; }
         public string ContactName { get; set; }
         public string ContactPhone { get; set; }
         public string Address1 { get; set; }
         public string Address2 { get; set; }
         public string City { get; set; }

         public string StateCode { get; set; }
         public int Zip { get; set; }
         public int Employee { get; set; }
         public int Licence { get; set; }
         public string PrefferedContact { get; set; }
         public string trialRequest { get; set; }
         public DateTime StartDt { get; set; }
         public DateTime EndDt { get; set; }
         public string LastOutCome { get; set; }
         public string NotesTxt { get; set; }
         public int CallDash { get; set; }
         public int EmpDash { get; set; }
         public int TicketDash { get; set; }
         public int ApptDash { get; set; }
         public int TrialDate { get; set; }
         public int KnowbaseDash { get; set; }
         public int VirtualDash { get; set; }
         public int QADash { get; set; }
    }
}
