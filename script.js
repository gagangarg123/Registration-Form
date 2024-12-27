// document.querySelector("form").addEventListener("submit", function (event) {
//     const firstNameField = document.getElementById("firstname");
//     const firstNameError = document.getElementById("firstname-error");

//     // Reset previous error state
//     firstNameField.classList.remove("error");
//     firstNameError.style.display = "none";

//     // Validate the first name field
//     if (!firstNameField.value.trim()) {
//         event.preventDefault(); // Prevent form submission

//         // Display error message
//         firstNameError.style.display = "block";
//         firstNameField.classList.add("error");

//         // Scroll to the field
//         firstNameField.scrollIntoView({ behavior: "smooth", block: "center" });
//         firstNameField.focus();
//     }
// });




document.querySelector("form").addEventListener("submit", function (event) {
    // List of fields to validate
    const fields = [
        { id: "firstname", errorId: "firstname-error", message: "Please fill this field." },
        { id: "lastname", errorId: "lastname-error", message: "Please fill this field." },
        { id: "email", errorId: "email-error", message: "Please enter a valid email address.", type: "email" },
        { id: "phone", errorId: "phone-error", message: "Please enter a valid phone number.", type: "phone" },
        { id: "dob", errorId: "dob-error", message: "Please select your date of birth." },
        { id: "gender", errorId: "gender-error", message: "Please select your gender.", type: "select" },
        { id: "aadhaar", errorId: "aadhaar-error", message: "Please enter your Aadhaar number." },
        { id: "category", errorId: "category-error", message: "Please select your category.", type: "select" },
        { id: "education", errorId: "education-error", message: "Please select your educational qualification.", type: "select" },
        { id: "exam-center", errorId: "exam-center-error", message: "Please select an exam center.", type: "select" },
        { id: "address", errorId: "address-error", message: "Please enter your current address." },
        { id: "address2", errorId: "address2-error", message: "Please enter your permanent address." },
        { id: "state", errorId: "state-error", message: "Please enter your state." },
        { id: "country", errorId: "country-error", message: "Please enter your country." }
    ];

    let isValid = true;

    fields.forEach(field => {
        const inputField = document.getElementById(field.id);
        const errorField = document.getElementById(field.errorId);

        // Reset previous error state
        inputField.classList.remove("error");
        if (errorField) {
            errorField.style.display = "none";
        }

        // Validation logic
        if (!inputField.value.trim() || (field.type === "select" && inputField.value === "")) {
            event.preventDefault(); // Prevent form submission

            // Display error message
            if (errorField) {
                errorField.style.display = "block";
                errorField.textContent = field.message;
            }
            inputField.classList.add("error");

            // Scroll to the first invalid field
            if (isValid) {
                inputField.scrollIntoView({ behavior: "smooth", block: "center" });
                inputField.focus();
            }

            isValid = false;
        }

        // Additional validations for specific types
        if (field.type === "email" && inputField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(inputField.value)) {
                event.preventDefault();
                if (errorField) {
                    errorField.style.display = "block";
                    errorField.textContent = "Invalid email format.";
                }
                inputField.classList.add("error");
                isValid = false;
            }
        }

        if (field.type === "phone" && inputField.value) {
            const phonePattern = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
            if (!phonePattern.test(inputField.value)) {
                event.preventDefault();
                if (errorField) {
                    errorField.style.display = "block";
                    errorField.textContent = "Invalid phone number.";
                }
                inputField.classList.add("error");
                isValid = false;
            }
        }
    });

    // Checkbox validation
    const checkbox = document.getElementById("supportCheckbox");
    if (!checkbox.checked) {
        event.preventDefault();
        alert("You must agree to the terms and conditions to proceed.");
        checkbox.focus();
    }
});
