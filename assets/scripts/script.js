// Store persons in memory
let persons = [];

// Calculate age based on birth date
function calculateAge() {
  const birthDate = new Date(document.getElementById('birthDate').value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  document.getElementById('age').value = age;
}

// Calculate age for edit form
function calculateEditAge() {
  const birthDate = new Date(document.getElementById('editBirthDate').value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  document.getElementById('editAge').value = age;
}

// Toast notification
function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Add person
function handleAddPerson(event) {
  event.preventDefault();
  const person = {
    id: Date.now().toString(),
    fullName: document.getElementById('fullName').value,
    gender: document.getElementById('gender').value,
    birthDate: document.getElementById('birthDate').value,
    age: parseInt(document.getElementById('age').value),
    occupation: document.getElementById('occupation').value
  };
  
  persons.push(person);
  event.target.reset();
  showToast('Person added successfully');
  renderPersonsList();
}

// Render persons list
function renderPersonsList() {
  const personsList = document.getElementById('personsList');
  personsList.innerHTML = persons.map(person => `
    <div class="col-md-6 col-lg-4">
      <div class="card person-card">
        <div class="card-body">
          <h5 class="card-title">${person.fullName}</h5>
          <p class="card-text">
            <small class="text-muted">${person.gender} • ${person.age} years old</small><br>
            <small class="text-muted">Born: ${new Date(person.birthDate).toLocaleDateString()}</small><br>
            Occupation: ${person.occupation}
          </p>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" onclick="editPerson('${person.id}')">
              Edit
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="deletePerson('${person.id}')">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Delete person
function deletePerson(id) {
  persons = persons.filter(person => person.id !== id);
  renderPersonsList();
  showToast('Person deleted successfully');
}

// Edit person
function editPerson(id) {
  const person = persons.find(p => p.id === id);
  if (person) {
    document.getElementById('editId').value = person.id;
    document.getElementById('editFullName').value = person.fullName;
    document.getElementById('editGender').value = person.gender;
    document.getElementById('editBirthDate').value = person.birthDate;
    document.getElementById('editAge').value = person.age;
    document.getElementById('editOccupation').value = person.occupation;
    calculateEditAge();
    
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }
}

// Update person
function handleUpdatePerson() {
  const id = document.getElementById('editId').value;
  const updatedPerson = {
    id,
    fullName: document.getElementById('editFullName').value,
    gender: document.getElementById('editGender').value,
    birthDate: document.getElementById('editBirthDate').value,
    age: parseInt(document.getElementById('editAge').value),
    occupation: document.getElementById('editOccupation').value
  };
  
  persons = persons.map(person => 
    person.id === id ? updatedPerson : person
  );
  
  const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
  modal.hide();
  renderPersonsList();
  showToast('Person updated successfully');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderPersonsList();
});