using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BooklistAdmin.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace BooklistAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public AuthenticationController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        [HttpGet("{userpass}")]
        public ActionResult<LoginUser> Get(string userpass)
        {
            string userName = string.Empty;
            string password = string.Empty;
            UserModel uModel = new UserModel();
            try
            {
                if (!string.IsNullOrEmpty(userpass))
                {
                    string[] upassToken = userpass.Split(":");
                    userName = upassToken[0];
                    password = upassToken[1];
                    uModel.Authenticate(userName, password);
                }
            }
            catch
            {
            }

            LoginUser login = new LoginUser
            {
                UserName = userName,
                DisplayName = uModel.DisplayName,
                Authenticated = uModel.IsAuthenticated
            };

            if (login.Authenticated)
            {
                login.AuthenticateToken = CreateAuthenticateToken(uModel);
            }

            return login;
        }

        [HttpPost]
        public ActionResult<LoginUser> Authenticate([FromBody]LoginUser user)
        {
            
            UserModel uModel = new UserModel();
            try
            {
                if (user!=null)
                {
                   uModel.Authenticate(user.UserName, user.Password);
                }
            }
            catch
            {
            }

            LoginUser login = new LoginUser
            {
                UserName = user.UserName,
                DisplayName = uModel.DisplayName,
                Authenticated = uModel.IsAuthenticated
            };

            if (login.Authenticated)
            {
                login.AuthenticateToken = CreateAuthenticateToken(uModel);
            }

            return login;
        }


        private string CreateAuthenticateToken(UserModel user)
        {
            string authToken = string.Empty;

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
            authToken = jwtSecurityTokenHandler.WriteToken(token);

            return authToken;
        }
    }
}