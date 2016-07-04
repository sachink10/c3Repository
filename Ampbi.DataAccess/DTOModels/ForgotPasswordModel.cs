using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class ForgotPasswordModel
    {
        public string SecQ1 { get; set; }
        public string SecretAnswer1 { get; set; }
        public string SecQ2 { get; set; }
        public string SecretAnswer2 { get; set; }
        public string SecQ3 { get; set; }
        public string SecretAnswer3 { get; set; }
    }
}
