var testModule = (function () {

    var testAPI = "http://phase2back.azurewebsites.net/api/Tests";

    return {
        getTests: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedTests();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", testAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the testlist data back to index.js
            function loadedTests() {
                var testsList = JSON.parse(xhttp.responseText);
                callback(testsList);
                return testsList;
            }
        },

        getTestById: function (testid, courseID, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedTest();
                }
            }

            xhttp.open("GET", testAPI + "/" + testid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedTest() {
                var test = JSON.parse(xhttp.responseText);
                callback(test);
                return test;
            }
        },

        addTest: function (test, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", testAPI, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(test));

        },

        updateTest: function (testid, courseID, test, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", testAPI + "/" + testid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(test));
        },

        deleteTest: function (testid, courseID, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", testAPI + "/" + testid + "?courseID=" + courseID, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        },
    };

}());