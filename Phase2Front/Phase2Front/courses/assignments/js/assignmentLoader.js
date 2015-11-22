document.addEventListener("DOMContentLoaded", function () {
    var row = document.body.getAttribute("assignments");
    loadAssignmentTable(row);
});
function loadAssignmentTable(row) {
    assignmentModule.getAssignments(function (assignmentLists) {
        var assignmentTable = document.getElementById("assignmentTable");
        var assignmentContent = document.getElementById("assignmentContent");
        var courseID = document.getElementById("CourseID").innerHTML;
        var controller = assignmentTable.setAttribute("data-ng-controller", "assignments");
        // Function gets called here to set up
        setupAssignmentTable(assignmentLists);
        // Function here to setup the table
        function setupAssignmentTable(assignments) {
            for (i = 0; i < assignments.length; i++) {
                // filter the assignments
                if (assignments[i].CourseID != courseID) continue;
                var row = document.createElement("tr");
                row.setAttribute("data-id", assignments[i].AssignmentID);
                row.setAttribute("data-courseid", assignments[i].CourseID);

                var col_id = document.createElement("td");
                var col_title = document.createElement("td");
                var col_releaseDate = document.createElement("td");
                var col_endDate = document.createElement("td");
                var col_percentage = document.createElement("td");

                var col_edit = document.createElement("td");
                var editButton = document.createElement("a");
                editButton.innerHTML = "Edit";
                editButton.setAttribute("data-id", assignments[i].AssignmentID);
                editButton.setAttribute("data-courseid", assignments[i].CourseID);
                editButton.setAttribute("data-btntype", "edit");
                col_edit.appendChild(editButton);

                var col_details = document.createElement("td");
                var detailsButton = document.createElement("a");
                detailsButton.innerHTML = "Details";
                detailsButton.setAttribute("data-id", assignments[i].AssignmentID);
                detailsButton.setAttribute("data-courseid", assignments[i].CourseID);
                detailsButton.setAttribute("data-btntype", "details");
                col_details.appendChild(detailsButton);

                var col_delete = document.createElement("td");
                var deleteButton = document.createElement("a");
                deleteButton.innerHTML = "Delete";
                deleteButton.setAttribute("data-id", assignments[i].AssignmentID);
                deleteButton.setAttribute("data-courseid", assignments[i].CourseID);
                deleteButton.setAttribute("data-btntype", "delete");
                col_delete.appendChild(deleteButton);

                col_id.innerHTML = assignments[i].AssignmentID;
                col_title.innerHTML = assignments[i].Title;
                col_releaseDate.innerHTML = assignments[i].ReleaseDate;
                col_endDate.innerHTML = assignments[i].EndDate;
                col_percentage.innerHTML = assignments[i].Percentage;

                row.appendChild(col_id);
                row.appendChild(col_title);
                row.appendChild(col_releaseDate);
                row.appendChild(col_endDate);
                row.appendChild(col_percentage);
                row.appendChild(col_edit);
                row.appendChild(col_details);
                row.appendChild(col_delete);

                assignmentContent.appendChild(row);
            }

            // hide loading messsage
            document.getElementById("loadingassignmentsmsg").classList.add("hide");
            // show the table
            assignmentTable.classList.remove("hidden");

            // Event delegation
            assignmentTable.addEventListener('click', function (e) {
                var target = e.target;
                var controller = assignmentTable.getAttribute("data-ng-controller");

                // Bubble up to tbody - need to bubble the event up because the click occurs in 
                // the td cells but the data-id attribute is in the row (for going to more detail page)
                while (target.nodeName.toLowerCase() !== "tbody") {
                    // For all these cases we use the data-id stored in either the cell or the row to keep context
                    // between seperate pages

                    // Edit
                    if (target.getAttribute("data-btntype") === "edit") {
                        window.location.href = 'assignments/edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id") + '&courseID=' + target.getAttribute("data-courseid");
                        return;


                    }
                        // Delete
                    else if (target.getAttribute("data-btntype") === "delete") {
                        // sweetalert delete confirmation
                        swal({
                            title: "Are you sure?",
                            text: "The assignment will be deleted permanently!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, delete it!",
                            closeOnConfirm: false
                        }, function () {
                            assignmentModule.deleteAssignment(target.getAttribute("data-id"), target.getAttribute("data-courseid"), function () {
                                window.location.reload(true);
                            });
                            swal("Deleted!", "The assignment has been deleted.", "success");
                        });
                        return;

                        // Details - this is true if clicked anywhere within the row
                    }
                    else if (target.nodeName.toLowerCase() === "tr") {
                        window.location.href = 'assignments/details.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id") + '&courseID=' + target.getAttribute("data-courseid");
                        return;
                    }

                    // Keep bubbling the event up through the DOM
                    target = target.parentNode;
                }
            });
        }
    });
}