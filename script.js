// Array to store multiple person details
let persons = [];

// Function to create a new person
function createPerson() {
    // Get the input values
    let fullName = document.getElementById('fullName').value;
    let gender = document.getElementById('gender').value;
    let birthDate = document.getElementById('birthDate').value;
    let occupation = document.getElementById('occupation').value;

    // Calculate age from birth date
    let age = calculateAge(birthDate);

    // Create a person object
    let newPerson = {
        fullName,
        gender,
        birthDate,
        age,
        occupation
    };

    // Add the person object to the persons array
    persons.push(newPerson);

    // Update the display
    displayPersonDetails();

    // Clear the form inputs
    document.getElementById('personForm').reset();
}

// Function to calculate age from birth date
function calculateAge(birthDate) {
    let birth = new Date(birthDate);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Function to display all person details
function displayPersonDetails() {
    let personList = document.getElementById('personDetails');
    personList.innerHTML = '';

    if (persons.length === 0) {
        personList.innerHTML = '<p class="text-secondary">No person details available.</p>';
        return;
    }

    // Generate HTML for each person in the array
    persons.forEach((person, index) => {
        let personCard = `
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${person.fullName}</h5>
                    <p class="card-text">
                        <strong>Gender:</strong> ${person.gender} <br>
                        <strong>Birth Date:</strong> ${person.birthDate} <br>
                        <strong>Age:</strong> ${person.age} <br>
                        <strong>Occupation:</strong> ${person.occupation}
                    </p>
                    <button class="btn btn-warning btn-sm me-2" onclick="editPerson(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson(${index})">Delete</button>
                </div>
            </div>
        `;
        personList.innerHTML += personCard;
    });
}

// Function to edit a person's details
function editPerson(index) {
    let person = persons[index];

    // Populate the form with the selected person's details
    document.getElementById('fullName').value = person.fullName;
    document.getElementById('gender').value = person.gender;
    document.getElementById('birthDate').value = person.birthDate;
    document.getElementById('occupation').value = person.occupation;

    // Show the update button and hide the create button
    document.getElementById('updateBtn').style.display = 'inline';
    document.getElementById('updateBtn').onclick = function () {
        updatePerson(index);
    };
}

// Function to update a person's details
function updatePerson(index) {
    // Get updated values from the form
    persons[index].fullName = document.getElementById('fullName').value;
    persons[index].gender = document.getElementById('gender').value;
    persons[index].birthDate = document.getElementById('birthDate').value;
    persons[index].occupation = document.getElementById('occupation').value;
    persons[index].age = calculateAge(persons[index].birthDate);

    // Update the display
    displayPersonDetails();

    // Clear the form and reset buttons
    document.getElementById('personForm').reset();
    document.getElementById('updateBtn').style.display = 'none';
}

// Function to delete a person's details
function deletePerson(index) {
    persons.splice(index, 1);
    displayPersonDetails();
}



// Function to restrict birthDate input to the current year or earlier
function restrictBirthDate() {
    let today = new Date();
    let currentYear = today.getFullYear();
    let startOfYear = `${currentYear}-01-01`;
    let endOfYear = `${currentYear}-12-31`;

    // Set the minimum to January 1st of a reasonable year (e.g., 1900)
    document.getElementById('birthDate').setAttribute('min', '1900-01-01');
    // Set the maximum to December 31st of the current year
    document.getElementById('birthDate').setAttribute('max', endOfYear);
}

// Call the function on page load
window.onload = function () {
    restrictBirthDate();
};
