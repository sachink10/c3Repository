using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ampbi.DataAccess.DTOModels
{
    public class Statelist
    {
        public string statecode { get; set; }
        public string statename { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string Updatedby { get; set; }
        public Nullable<System.DateTime> Updatedon { get; set; }
        public Nullable<bool> active { get; set; }
    }
}
