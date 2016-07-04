using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
   public class UserProfileUpdate
    {
       public string Email { get; set; }
       public string FirstName { get; set; }
       public string LastName { get; set; }
       public string CompanyName { get; set; }
       public string UserTypeName { get; set; }
       public string LicenceAssigned { get; set; }
       public string ValidFrom { get; set; }
       public string ValidTo { get; set; }
       public int UserTypeID { get; set; }

       public int CallDash { get; set; }
       public int EmpDash { get; set; }
       public int TicketDash { get; set; }
       public int ApptDash { get; set; }
       public int KnowbaseDash { get; set; }
       public int VirtualDash { get; set; }
       public int QADash { get; set; }

    }
}
