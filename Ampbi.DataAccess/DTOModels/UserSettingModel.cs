using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;


namespace Ampbi.DataAccess.DTOModels
{
    public class UserSettingModel
    {
        public string Company { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ENumber { get; set; }
        public string Title { get; set; }
        public string Supervisor { get; set; }
        public string Location { get; set; }
        public byte[] Image { get; set; }
        public string imagepath { get; set; }


    }
}
