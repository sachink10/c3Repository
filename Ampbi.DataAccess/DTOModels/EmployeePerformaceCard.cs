using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class EmployeePerformaceCard
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string KPIMetricName { get; set; }
        public int Goal { get; set; }
        public int Actual { get; set; }
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:P2}")]
        public decimal perctoGoal { get; set; }
        public int NoOfTasks { get; set; }
        public string email { get; set; }
        public string Programsassigned { set; get; }
    }

    public class EmployeePerformaceCardMonthly
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string KPIMetricName { get; set; }
        public int Goal { get; set; }
        public int Actual { get; set; }
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:P2}")]
        public string perctoGoal { get; set; }
        public int NoOfTasks { get; set; }
        public string email { get; set; }
    }

    
    

   
}
