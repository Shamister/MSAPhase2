document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var courseID = getUrlParameters("courseID", "", true);
    if (controller === "assignments") {
        // set up the return link
        var courseDetails = document.getElementById("courseDetails");
        courseDetails.setAttribute("href", "/courses/details.html?type=courses&id=" + courseID);

        // set the courseIDInput to the course id by default
        var courseIDInput = document.getElementById("CourseIDInput");
        courseIDInput.value = courseID;
        // prevent the input being typed
        courseIDInput.setAttribute("readonly", "");

        setupAssignmentSubmit(courseID);
        setupReturn(courseID);
    }
});

function setupAssignmentSubmit(cid) {
    // Create student from form and update database
    var form = document.forms.create;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newAssignment = {
            assignmentID: document.getElementById("AssignmentIDInput").value,
            courseID: cid,
            Title: document.getElementById("TitleInput").value,
            ReleaseDate: document.getElementById("ReleaseDateInput").value,
            EndDate: document.getElementById("EndDateInput").value,
            Percentage: document.getElementById("PercentageInput").value,
        }

        assignmentModule.addAssignment(newAssignment, function () {
            window.location.href = "/courses/details.html?type=courses&id=" + cid;
        });
    }
}

function getUrlParameters(parameter, staticURL, decode) {
    var currentLocation = (staticURL.length) ? staticURL : window.location.search,
        paramArray = currentLocation.split("?")[1].split("&");
    for (var i = 0; i < paramArray.length; i++) {
        param = paramArray[i].split("=");
        if (param[0] == parameter) {
            return (decode) ? decodeURIComponent(param[1]) : param[1];
        }
    }
    return false;
}

//Go back to home without saving changes
function setupReturn(cid) {
    document.getElementById("cancelButton").addEventListener('click', function () {
        window.location.href = "/courses/details.html?type=courses&id=" + cid;
    });
}