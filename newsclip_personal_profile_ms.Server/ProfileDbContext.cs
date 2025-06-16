using Microsoft.EntityFrameworkCore;

namespace newsclip_personal_profile_ms.Server
{
    public class ProfileDbContext : DbContext
    {
        public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options) { }

        public DbSet<ProfileData> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Education> Educations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProfileData>()
                .ToTable("Profile");

            modelBuilder.Entity<Skill>()
                .HasOne(s => s.Profile)
                .WithMany(p => p.Skills)
                .HasForeignKey(s => s.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Experience>()
                .HasOne(e => e.Profile)
                .WithMany(p => p.WorkExperiences)
                .HasForeignKey(e => e.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Education>()
                .HasOne(e => e.Profile)
                .WithMany(p => p.EducationHistory)
                .HasForeignKey(e => e.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}