using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OthelloServer.Helpers;
using OthelloServer.Models;
using OthelloServer.ViewModels;

namespace OthelloServer.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        public LoginController(ApplicationDbContext context, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
        }
        // POST api/auth/login
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            AppUser user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }
            Claim[] claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName)
            };
            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JwtAuthentication:SecretKey"]));
            int minutesUntilExpiry = Convert.ToInt32(_configuration["JwtAuthentication:minutesUntilExpiry"]);
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtAuthentication:Issuer"],
                audience: _configuration["JwtAuthentication:Audience"],
                expires: DateTime.UtcNow.AddMinutes(minutesUntilExpiry),
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                claims: claims
            );
            return new OkObjectResult(
                new {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
        }
    }
}