using Ampbi.DataAccess.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.ViewModel
{
    public class Registration
    {
        public UserRegistrationModel userRegModel { get; set; }
        public AdminRegistrationModel adminRegModel { get; set; }
        public List<Statelist> lstAllStateNames { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfEmpList { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfLicencesList { get; set; }
        public List<sp_getlistofvalues_Result> LstPreferedContactMethod { get; set; }
    }
}
