using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class EmployeeIndividualPerformanceObjects
    {
        public List<IndividualPerformanceCardGridDetails> empIndGridList { get; set; }
        public List<IndividualPerformanceCardOtherDetails> empIndOthrDetailsList { get; set; }
        public List<IndividualPerformanceCard> empIndPerfCard { get; set; }
       
        
    }
}
