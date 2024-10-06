

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, deleteDoc , doc} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBg11GLQ4gILZwPbZ_5xhb3gLx63U5ce9k",
    authDomain: "redstone-92f6a.firebaseapp.com",
    projectId: "redstone-92f6a",
    storageBucket: "redstone-92f6a.appspot.com",
    messagingSenderId: "384035240201",
    appId: "1:384035240201:web:0a7a6e78f038718c3fbbd8"
};
// Get documents from 'users' collection
async function getUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));

    // Populate table with data  
    querySnapshot.forEach((doc) => {
        var row = $('<tr>');
        row.append($('<td>').text(doc.data().name));
        row.append($('<td>').text(doc.data().email));
        row.append($('<td>').text(doc.data().age));
        row.append($('<td>').append($('<button>', {
            class: 'delete',
            text: 'delete',
            id: doc.id,  // Add id attribute
            click: function () {
                deleteUser(this.id)  // Use this.id to get the id of the clicked button
                alert('user deleted !')
                window.location.reload()
            }
        })));
        $('#usersData').append(row);
    });
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Add a document to a 'users' collection
async function addUser(name, email, age) {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            name: name,
            email: email,
            age: age
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// Delete a document from 'users' collection 
async function deleteUser(docId) {
    try {

        console.log(docId);
        const docRef = await deleteDoc(doc(db,'users',docId))

        console.log('Deleting document with id: ', docRef);

    } catch (e) {

        console.error('Error deleting document: ', e);

    }
}

$('#userForm').submit(async function (e) {
    e.preventDefault();

    const name = $('#nameInput').val();
    const email = $('#emailInput').val();
    const age = $('#ageInput').val();
    const docRef = await addUser(name, email, age).then(
        () => {
            $('#userForm').trigger('reset');
            alert('User added successfully!');
            window.location.reload()
        }
    )

});

// Call the functions
getUsers();