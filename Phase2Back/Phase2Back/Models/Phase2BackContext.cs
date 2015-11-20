using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace Phase2Back.Models
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class Phase2BackContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public class MyConfiguration : DbMigrationsConfiguration<Phase2BackContext>
        {
            public MyConfiguration()
            {
                this.AutomaticMigrationsEnabled = true;
            }

            protected override void Seed(Phase2BackContext context)
            {
                // CREATE DUMMY COURSES
                // COURSE ID = 3 LETTERS + 3 NUMBERS
                var courses = new List<Course>
                {
                    new Course {CourseID = "XXX101", Title="Dummy Course", Credits=15},
                    new Course {CourseID = "XXX102", Title="Dummy Course 2", Credits=15},
                    new Course {CourseID = "XXX103", Title="Dummy Course 3", Credits=15},
                };
                courses.ForEach(s => context.Courses.AddOrUpdate(p => p.CourseID, s));
                context.SaveChanges();

                // CREATE DUMMY ASSIGNMENTS
                var assignments = new List<Assignment>
                {
                    new Assignment {AssignmentID = 1,  CourseID = "XXX101", Title="Assignment 1", ReleaseDate=DateTime.Parse("2015-08-11"), EndDate=DateTime.Parse("2015-09-1"), Percentage=10},
                    new Assignment {AssignmentID = 1,  CourseID = "XXX102", Title="Assignment 1", ReleaseDate=DateTime.Parse("2015-08-12"), EndDate=DateTime.Parse("2015-09-1"), Percentage=15},
                    new Assignment {AssignmentID = 2,  CourseID = "XXX101", Title="Assignment 2", ReleaseDate=DateTime.Parse("2015-09-8"), EndDate=DateTime.Parse("2015-10-1"), Percentage=10}
                };

                assignments.ForEach(s => context.Assignments.AddOrUpdate(p => new { p.AssignmentID, p.CourseID }, s));
                context.SaveChanges();

                // CREATE DUMMY TESTS
                var tests = new List<Test>
                {
                    new Test {TestID = 1, CourseID = "XXX101", Title = "Mid Term Test", ReleaseDate=DateTime.Parse("2015-08-11"), EndDate=DateTime.Parse("2015-08-11"), Percentage=20 },
                    new Test {TestID = 2, CourseID = "XXX101", Title = "Final Exam", ReleaseDate=DateTime.Parse("2015-12-11"), EndDate=DateTime.Parse("2015-12-11"), Percentage=60 },
                };
                tests.ForEach(s => context.Tests.AddOrUpdate(p => new { p.TestID, p.CourseID }, s));
                context.SaveChanges();
            }
        }

        public Phase2BackContext() : base("name=Phase2BackContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<Phase2BackContext, MyConfiguration>());
        }

        public System.Data.Entity.DbSet<Phase2Back.Models.Assignment> Assignments { get; set; }

        public System.Data.Entity.DbSet<Phase2Back.Models.Course> Courses { get; set; }

        public System.Data.Entity.DbSet<Phase2Back.Models.Enrollment> Enrollments { get; set; }

        public System.Data.Entity.DbSet<Phase2Back.Models.Student> Students { get; set; }

        public System.Data.Entity.DbSet<Phase2Back.Models.Test> Tests { get; set; }
    }
}
