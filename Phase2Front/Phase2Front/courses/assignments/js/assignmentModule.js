var assignmentModule = (function () {

    var assignmentAPI = "http://phase2back.azurewebsites.net/api/Assignments";

    return {
        getAssignments: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedAssignments();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", assignmentAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the assignmentlist data back to index.js
            function loadedAssignments() {
                var assignmentsList = JSON.parse(xhttp.responseText);
                callback(assignmentsList);
                return assignmentsList;
            }
        },

        getAssignmentById: function (assignmentid, courseID, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedAssignment();
                }
            }

            xhttp.open("GET", assignmentAPI + "/" + assignmentid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedAssignment() {
                var assignment = JSON.parse(xhttp.responseText);
                callback(assignment);
                return assignment;
            }
        },

        addAssignment: function (assignment, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", assignmentAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(assignment));

        },

        updateAssignment: function (assignmentid, courseID, assignment, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", assignmentAPI + "/" + assignmentid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(assignment));
        },

        deleteAssignment: function (assignmentid, courseID, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", assignmentAPI + "/" + assignmentid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        },
    };

}());