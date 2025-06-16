namespace newsclip_personal_profile_ms.Server
{
    public class ProfileData
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? Bio { get; set; }
        public string? Interests { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? GitHubUrl { get; set; }
        public string? WebsiteUrl { get; set; }

        public List<Skill> Skills { get; set; } = new List<Skill>();
        public List<Experience> WorkExperiences { get; set; } = new List<Experience>(); 
        public List<Education> EducationHistory { get; set; } = new List<Education>();
    }

    public class Experience
    {
        public int Id { get; set; }
        public string? JobTitle { get; set; }
        public string? CompanyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Description { get; set; }
    }

    public class Education
    {
        public int Id { get; set; }
        public string? Degree { get; set; }
        public string? InstitutionName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Description { get; set; }
    }

    public class Skill
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Proficiency { get; set; } // e.g., Beginner, Intermediate, Advanced
    }
}
