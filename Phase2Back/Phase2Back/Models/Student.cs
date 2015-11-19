using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phase2Back.Models
{
    public class Student
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int StudentID
        {
            get; set;
        }
        public string LastName
        {
            get; set;
        }
        public string FirstName
        {
            get; set;
        }
        public DateTime EnrollmentDate
        {
            get; set;
        }

        [JsonIgnore]
        public virtual ICollection<Enrollment> Enrollments
        {
            get; set;
        }
    }
}
