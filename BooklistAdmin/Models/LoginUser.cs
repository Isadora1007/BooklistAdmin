using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooklistAdmin.Models
{
    public class LoginUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public bool Authenticated { get; set; }
        public string Message { get; set; }
        public string AuthenticateToken { get; set; }
    }
}
