using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.DirectoryServices;


namespace BooklistAdmin.Models
{
    [Serializable]
    public class UserModel
    {
        public string Username { get; set; } //sAMAccountName
        public int EmployeeID { get; set; } //employeeID
        public bool IsAuthenticated { get; set; }
        public string FirstName { get; set; }  //givenName
        public string MiddleInitial { get; set; }  //initials
        public string LastName { get; set; }  //sn
        public string DisplayName { get; set; }  //Name
        public string UserPrincipalName { get; set; }   //userPrincipalName (e.g. user@domain.local)
        public string PostalAddress { get; set; }
        public string MailingAddress { get; set; }  //StreetAddress
        public string ResidentialAddress { get; set; }  //HomePostalAddress
        public string Title { get; set; }
        public string HomePhone { get; set; }
        public string OfficePhone { get; set; }  //TelephoneNumber
        public string Mobile { get; set; }
        public string Fax { get; set; }  //FacsimileTelephoneNumber
        public string Email { get; set; } //mail
        public string Url { get; set; }
        public string Password { get; set; }
        public string DistinguishedName { get; set; }
        public List<string> Groups { get; set; }
        public string Company { get; set; }
        public string Department { get; set; }
        public string OU { get; set; }

        //public Exception Exception { get; set; }

        private DirectoryEntry DE = new DirectoryEntry();

        public UserModel()
        {
            Clear();
        }


        public UserModel(string Username, string Password)
        {
            Clear();
            Authenticate(Username, Password);
        }

        /// <summary>
        /// Clears all fields for this class.
        /// </summary>
        public void Clear()
        {
            Username = string.Empty;
            EmployeeID = -1;
            IsAuthenticated = false;
            FirstName = string.Empty;
            MiddleInitial = string.Empty;
            LastName = string.Empty;
            DisplayName = string.Empty;
            UserPrincipalName = string.Empty;
            PostalAddress = string.Empty;
            MailingAddress = string.Empty;
            ResidentialAddress = string.Empty;
            Title = string.Empty;
            HomePhone = string.Empty;
            OfficePhone = string.Empty;
            Mobile = string.Empty;
            Fax = string.Empty;
            Email = string.Empty;
            Url = string.Empty;
            Password = string.Empty;
            DistinguishedName = string.Empty;
            Groups = new List<string>();
            Company = string.Empty;
            Department = string.Empty;
            OU = string.Empty;
        }

        public void Authenticate(string Username, string Password)
        {
            try
            {
                this.DE = new DirectoryEntry(null, Username, Password, AuthenticationTypes.Secure);
                var sss = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                DirectorySearcher deSearch = new DirectorySearcher(DE);
                deSearch.Filter = "(&(objectClass=user)(sAMAccountName=" + Username + "))";
                SearchResult result = deSearch.FindOne();
                if (result != null)
                {
                    this.DE = new DirectoryEntry(result.Path, Username, Password, AuthenticationTypes.Secure);
                    IsAuthenticated = true;
                    FirstName = GetProperty("givenName");
                    MiddleInitial = GetProperty("initials");
                    LastName = GetProperty("sn");
                    UserPrincipalName = GetProperty("UserPrincipalName");
                    EmployeeID = int.Parse(GetProperty("employeeID"));
                    //PostalAddress = GetProperty("PostalAddress");
                    //MailingAddress = GetProperty("StreetAddress");
                    //ResidentialAddress = GetProperty("HomePostalAddress");
                    Title = GetProperty("Title");
                    //HomePhone = GetProperty("HomePhone");
                    //OfficePhone = GetProperty("TelephoneNumber");
                    //Mobile = GetProperty("Mobile");
                    //Fax = GetProperty("FacsimileTelephoneNumber");
                    Email = GetProperty("mail");
                    Url = GetProperty("Url");
                    this.Username = GetProperty("sAMAccountName");
                    DistinguishedName = GetProperty("DistinguishedName");
                    //Company = GetProperty("Company");
                    Department = GetProperty("Department");
                    DisplayName = FirstName + ((MiddleInitial.Trim() != string.Empty) ? " " + MiddleInitial.Trim() + "." : string.Empty) + " " + LastName;
                    Groups.Clear();
                    for (int i = 0; i <= DE.Properties["memberOf"].Count - 1; i++)
                    {
                        string s = GetProperty("memberOf", i);
                        if (s.IndexOf("OU=CPL Systems") != 0)
                        {
                            string[] x = s.Split(',')[0].Split('=');
                            Groups.Add(x[1]);
                        }
                    }
                    OU = DistinguishedName.Split(',')[1].Replace("OU=", "");
                }
            }
            catch
            {
                //Exception = ex;
                Clear();
            }
        }

        private string GetProperty(string PropertyName, int Index = 0)
        {
            try
            {
                return DE.Properties[PropertyName][Index].ToString();
            }
            catch
            {
                return string.Empty;
            }
        }

        private string GetAllAttributes()
        {
            string s = string.Empty;
            foreach (string x in DE.Properties.PropertyNames)
            {
                for (int i = 0; i <= DE.Properties[x].Count - 1; i++)
                {
                    s += x + " = " + GetProperty(x, i) + Environment.NewLine;
                }
            }
            return s;
        }
    }
}
