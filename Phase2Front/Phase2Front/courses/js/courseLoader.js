document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-ng-controller");
    if (controller == "courses") {
        //Function gets called here to execute the command
        loadCourseTable(controller);
    }
});

function loadCourseTable(controller) {
    var courseTable = document.getElementById("courseTable");
    var courseContent = document.getElementById("courseContent");
    courseModule.getCourses(function (courseLists) {
        // Function gets called here to set up
        setupCourseTable(courseLists);
        // Function here to setup the table
        function setupCourseTable(courses) {
            for (i = 0; i < courses.length; i++) {
                var row = document.createElement("tr");
                row.setAttribute("data-id", courses[i].CourseID);

                var col_courseID = document.createElement("td");
                var col_courseTitle = document.createElement("td");
                var col_credits = document.createElement("td");

                var col_edit = document.createElement("td");
                var editButton = document.createElement("a");
                editButton.innerHTML = "Edit";
                editButton.setAttribute("data-id", courses[i].CourseID);
                editButton.setAttribute("data-btntype", "edit");
                col_edit.appendChild(editButton);

                var col_details = document.createElement("td");
                var detailsButton = document.createElement("a");
                detailsButton.innerHTML = "Details";
                detailsButton.setAttribute("data-id", courses[i].CourseID);
                detailsButton.setAttribute("data-btntype", "details");
                col_details.appendChild(detailsButton);

                var col_delete = document.createElement("td");
                var deleteButton = document.createElement("a");
                deleteButton.innerHTML = "Delete";
                deleteButton.setAttribute("data-id", courses[i].CourseID);
                deleteButton.setAttribute("data-btntype", "delete");
                col_delete.appendChild(deleteButton);

                col_courseID.innerHTML = courses[i].CourseID;
                col_courseTitle.innerHTML = courses[i].Title;
                col_credits.innerHTML = courses[i].Credits;

                row.appendChild(col_courseID);
                row.appendChild(col_courseTitle);
                row.appendChild(col_credits);
                row.appendChild(col_edit);
                row.appendChild(col_details);
                row.appendChild(col_delete);

                courseContent.appendChild(row);
            }

            // hide loading messsage
            document.getElementById("loadingmsg").classList.add("hide");
            // show the table
            courseTable.classList.remove("hidden");

            // Event delegation
            courseTable.addEventListener('click', function (e) {
                var target = e.target;

                // Bubble up to tbody - need to bubble the event up because the click occurs in 
                // the td cells but the data-id attribute is in the row (for going to more detail page)
                while (target.nodeName.toLowerCase() !== "tbody") {

                    // For all these cases we use the data-id stored in either the cell or the row to keep context
                    // between seperate pages

                    // Edit
                    if (target.getAttribute("data-btntype") === "edit") {
                        window.location.href = 'edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                        return;

                        
                    }
                    // Delete
                    else if (target.getAttribute("data-btntype") === "delete") {
                        // sweetalert delete confirmation
                        swal({
                            title: "Are you sure?",
                            text: "The course will be deleted permanently!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, delete it!",
                            closeOnConfirm: false
                        }, function () {
                            courseModule.deleteCourse(target.getAttribute("data-id"), function () {
                                window.location.reload(true);
                            });
                            swal("Deleted!", "The course has been deleted.", "success");
                        });
                        return;

                    // Details - this is true if clicked anywhere within the row
                    }
                    else if (target.nodeName.toLowerCase() === "tr") {
                        window.location.href = 'details.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                        return;
                    }

                    // Keep bubbling the event up through the DOM
                    target = target.parentNode;
                }
            });
        }
    });
}