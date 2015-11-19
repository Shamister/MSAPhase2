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
