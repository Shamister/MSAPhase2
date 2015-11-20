document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-ng-controller");
    if (controller == "courses") {
        //Function gets called here to execute the command
        loadCourseTable(controller);
    }
});

function loadCourseTable(controller) {
    var courseTable = document.getElementById("courseTable");
    courseModule.getCourses(function (courseLists) {
        // Function gets called here to set up
        setupCourseTable(courseLists);
        // Function here to setup the table
        function setupCourseTable(courses) {
            // hide loading messsage
            document.getElementById("loadingmsg").className += "hide";

            // show the table
            courseTable.className += "show";
            var courseContent = document.getElementById("courseContent");

            for (i = 0; i < courses.length; i++) {
                var row = document.createElement("tr");
                var col_lastname = document.createElement("td");
                var col_firstname = document.createElement("td");
                var col_enrol = document.createElement("td");
                var col_edit = document.createElement("td");
                var col_details = document.createElement("td");
                var col_delete = document.createElement("td");

                col_lastname.innerHTML = courses[i].CourseID;
                col_firstname.innerHTML = courses[i].Title;
                col_enrol.innerHTML = courses[i].Credits;

                row.appendChild(col_lastname);
                row.appendChild(col_firstname);
                row.appendChild(col_enrol);
                row.appendChild(col_edit);
                row.appendChild(col_details);
                row.appendChild(col_delete);

                courseContent.appendChild(row);
            }
        }
    });
}