var courseModule = (function () {

    var courseAPI = "http://phase2back.azurewebsites.net/api/Courses";

    return {
        getCourses: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedCourses();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", courseAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the courselist data back to index.js
            function loadedCourses() {
                var coursesList = JSON.parse(xhttp.responseText);
                callback(coursesList);
                return coursesList;
            }
        },

        getCourseById: function (id, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedCourse();
                }
            }

            xhttp.open("GET", courseAPI + id, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedCourse() {
                var course = JSON.parse(xhttp.responseText);
                callback(course);
                return course;
            }
        },

        addCourse: function (course, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", courseAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(course));

        },

        updateCourse: function (courseid, course, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", courseAPI + courseid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(course));
        },

        deleteCourse: function (courseid, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", courseAPI + courseid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        },
    };

}());