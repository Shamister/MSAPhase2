﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Phase2Back.Models;
using System.Web.Http.Cors;

namespace Phase2Back.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AssignmentsController : ApiController
    {
        private Phase2BackContext db = new Phase2BackContext();

        // GET: api/Assignments
        public IQueryable<Assignment> GetAssignments()
        {
            return db.Assignments;
        }

        // GET: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult GetAssignment(int id, string courseID)
        {
            Assignment assignment = db.Assignments.Find(id, courseID);
            if (assignment == null)
            {
                return NotFound();
            }

            return Ok(assignment);
        }

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssignment(int id, Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assignment.AssignmentID)
            {
                return BadRequest();
            }

            db.Entry(assignment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Assignments
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult PostAssignment(Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assignments.Add(assignment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AssignmentExists(assignment.AssignmentID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = assignment.AssignmentID }, assignment);
        }

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult DeleteAssignment(int id)
        {
            Assignment assignment = db.Assignments.Find(id);
            if (assignment == null)
            {
                return NotFound();
            }

            db.Assignments.Remove(assignment);
            db.SaveChanges();

            return Ok(assignment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentExists(int id)
        {
            return db.Assignments.Count(e => e.AssignmentID == id) > 0;
        }
    }
}