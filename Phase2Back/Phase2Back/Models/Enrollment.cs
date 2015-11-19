using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phase2Back.Models
{

    public enum Grade
    {
        A, B, C, D, F
    }
    public class Enrollment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int EnrollmentID {
            get; set;
        }
        public string CourseID
        {
            get; set;
        }
        public int StudentID
        {
            get; set;
        }
        public Grade? Grade
        {
            get; set;
        }

        [JsonIgnore]
        public virtual Course Course
        {
            get; set;
        }
        [JsonIgnore]
        public virtual Student Student
        {
            get; set;
        }
    }
}
