document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);
    if (controller === "courses") {
        courseModule.getCourseById(id, function (course) {
            loadForm(course);
        });
        setupCourseSubmit(id);
    }

    setupReturn();

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

function setupCourseSubmit(id) {
    // Create student from form and update database
    var form = document.forms.edit;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newCourse = {
            CourseID: id,
            Title: document.getElementById("TitleInput").value,
            Credits: document.getElementById("CreditsInput").value
        }

        courseModule.updateCourse(id, newCourse, function () {
            window.location.href = "index.html";
        });
    }
}

//Go back to home without saving changes
function setupReturn() {
    document.getElementById("cancelButton").addEventListener('click', function () {
        window.location.href = "index.html";
    });
}