document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);
    var courseID = getUrlParameters("courseID", "", true);
    if (controller === "assignments") {
        assignmentModule.getAssignmentById(id, courseID, function (assignment) {
            loadForm(assignment);
        });
        setupAssignmentSubmit(id, courseID);
    }

    setupReturn(courseID);

});

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

function loadForm(obj) {
    // Prefill form with details
    for (var key in obj) {
        var formInput = document.getElementById(key + "Input");
        formInput.value = obj[key];
    }

    // show form after loaded
    document.forms.edit.classList.remove("hidden");
}

function setupAssignmentSubmit(id, cid) {
    // Create student from form and update database
    var form = document.forms.edit;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newAssignment = {
            assignmentID: id,
            courseID: cid,
            Title: document.getElementById("TitleInput").value,
            ReleaseDate: document.getElementById("ReleaseDateInput").value,
            EndDate: document.getElementById("EndDateInput").value,
            Percentage: document.getElementById("PercentageInput").value,
        }

        assignmentModule.updateAssignment(id, cid, newAssignment, function () {
            window.location.href = "/courses/details.html?type=courses&id="+cid;
        });
    }
}

//Go back to home without saving changes
function setupReturn(cid) {
    document.getElementById("cancelButton").addEventListener('click', function () {
        window.location.href = "/courses/details.html?type=courses&id=" + cid;
    });
}