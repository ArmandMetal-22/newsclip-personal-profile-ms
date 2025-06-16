using Microsoft.AspNetCore.Mvc;
using newsclip_personal_profile_ms.Server;

namespace newsclip_personal_profile_ms.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileDataController : ControllerBase
    {
        private readonly ILogger<ProfileDataController> _logger;

        public ProfileDataController(ILogger<ProfileDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetProfileData")]
        public IEnumerable<ProfileData> Get()
        {
            return new List<ProfileData>
            {
                new ProfileData
                {
                    Id = 1,
                    Name = "Jane Doe",
                    Email = "jane.doe@example.com",
                    PhoneNumber = "+1 555-123-4567",
                    Address = "123 Main St, Springfield, USA",
                    DateOfBirth = new DateTime(1990, 5, 15),
                    ProfilePictureUrl = "https://randomuser.me/api/portraits/men/44.jpg",
                    Bio = "Experienced software engineer with a passion for building scalable web applications and working with modern technologies.",
                    Interests = "Web Development, Cloud Computing, AI, Open Source",
                    LinkedInUrl = "https://www.linkedin.com/in/janedoe",
                    GitHubUrl = "https://github.com/janedoe",
                    WebsiteUrl = "https://janedoe.dev",
                    Skills = new List<Skill>
                    {
                        new Skill { Id = 1, Name = "C#", Proficiency = "Advanced" },
                        new Skill { Id = 2, Name = "React", Proficiency = "Advanced" },
                        new Skill { Id = 3, Name = "Azure", Proficiency = "Intermediate" }
                    },
                    WorkExperiences = new List<Experience>
                    {
                        new Experience
                        {
                            Id = 1,
                            JobTitle = "Senior Software Engineer",
                            CompanyName = "Tech Solutions Inc.",
                            StartDate = new DateTime(2020, 1, 1),
                            EndDate = DateTime.Now,
                            Description = "Lead developer on several enterprise projects using .NET and React."
                        },
                        new Experience
                        {
                            Id = 2,
                            JobTitle = "Software Engineer",
                            CompanyName = "Web Innovators",
                            StartDate = new DateTime(2017, 6, 1),
                            EndDate = new DateTime(2019, 12, 31),
                            Description = "Worked on full-stack web applications and cloud deployments."
                        }
                    },
                    EducationHistory = new List<Education>
                    {
                        new Education
                        {
                            Id = 1,
                            Degree = "B.Sc. Computer Science",
                            InstitutionName = "Springfield University",
                            StartDate = new DateTime(2012, 9, 1),
                            EndDate = new DateTime(2016, 6, 30),
                            Description = "Graduated with honors."
                        }
                    }
                }
            };
        }
    }
}