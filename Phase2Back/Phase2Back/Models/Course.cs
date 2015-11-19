using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Phase2Back.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string CourseID
        {
            get; set;
        }
        public string Title
        {
            get; set;
        }
        public int Credits
        {
            get; set;
        }

        [JsonIgnore]
        public virtual ICollection<Assignment> Assignments
        {
            get; set;
        }

        [JsonIgnore]
        public virtual ICollection<Test> Tests
        {
            get; set;
        }
    }
}