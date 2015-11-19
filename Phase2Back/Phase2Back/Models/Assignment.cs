﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phase2Back.Models
{
    /**
     * Assignment Entity represents an assignment for a specific course.
     * This assignment only belongs to a course and 
     * each student in that course cannot have two assignments with the same AssignmentID.
     */
    public class Assignment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AssignmentID
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