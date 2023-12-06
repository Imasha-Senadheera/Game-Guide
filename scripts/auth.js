auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupGuides([]);
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm.title.value,
        content: createForm.content.value
    }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        let errorMessage = 'An error occurred. Please try again.';
        if (err.code === 'auth/email-already-in-use') {
            errorMessage = 'Email is already in use. Please use a different email.';
        } else if (err.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address. Please enter a valid email.';
        } else if (err.code === 'auth/weak-password') {
            errorMessage = 'Weak password. Please use a stronger password.';
        }
        signupForm.querySelector('.error').innerHTML = errorMessage;
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        let errorMessage = 'Invalid email or password. Please try again.';
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            errorMessage = 'An error occurred. Please try again.';
        }
        loginForm.querySelector('.error').innerHTML = errorMessage;
    });
});
