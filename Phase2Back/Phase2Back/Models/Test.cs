using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phase2Back.Models
{
    public class Test
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TestID
        {
            get; set;
        }
        public string CourseID
        {
            get; set;
        }
        public string Title
        {
            get; set;
        }
        public DateTime ReleaseDate
        {
            get; set;
        }
        public DateTime EndDate
        {
            get; set;
        }
        public double Percentage
        {
            get; set;
        }

        [JsonIgnore]
        public virtual Course Course
        {
            get; set;
        }
    }
}
