document.addEventListener("DOMContentLoaded", function () {
    setupCourseSubmit();
    setupReturn();
});

function setupCourseSubmit() {
    // Create student from form and update database
    var form = document.forms.create;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newCourse = {
            CourseID: document.getElementById("CourseIDInput").value,
            Title: document.getElementById("TitleInput").value,
            Credits: document.getElementById("CreditsInput").value
        }

        courseModule.addCourse(newCourse, function () {
            window.location.href = "index.html";
        });
    }
}

//Go back to home without saving changes
function setupReturn() {
    document.getElementById("cancelButton").addEventListener('click', function () {
        window.location.href = "/courses";
    });
}