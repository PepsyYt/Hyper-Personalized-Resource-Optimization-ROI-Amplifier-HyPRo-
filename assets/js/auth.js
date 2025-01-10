// Import Firebase auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Handle Login Form Submit
document.querySelector('form').addEventListener('submit', async (e) => {
e.preventDefault();

const email = document.getElementById('emailaddress').value;
const password = document.getElementById('password').value;

try {
   const userCredential = await signInWithEmailAndPassword(auth, email, password);
   console.log('User logged in:', userCredential.user);
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Login error:', error.message);
   alert('Login failed: ' + error.message);
}
});

// Handle Google Sign In
document.querySelector('.btn:has(svg[viewBox="0 0 48 48"])').addEventListener('click', async () => {
try {
   const result = await signInWithPopup(auth, googleProvider);
   console.log('Google sign in successful:', result.user);
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Google sign in error:', error.message);
   alert('Google sign in failed: ' + error.message);
}
});

// Handle Facebook Sign In
document.querySelector('.btn:has(svg[viewBox="0 0 256 256"])').addEventListener('click', async () => {
try {
   const result = await signInWithPopup(auth, facebookProvider);
   console.log('Facebook sign in successful:', result.user);
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Facebook sign in error:', error.message);
   alert('Facebook sign in failed: ' + error.message);
}
});

// Handle Registration Link Click
document.querySelector('a[href="auth-register.html"]').addEventListener('click', (e) => {
e.preventDefault();
window.location.href = 'auth-register.html';
});

// Handle Registration Form Submit (Add this code to your registration page)
function handleRegistration(email, password) {
createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
       console.log('User registered:', userCredential.user);
       window.location.href = 'Dashboard.html';
   })
   .catch((error) => {
       console.error('Registration error:', error.message);
       alert('Registration failed: ' + error.message);
   });
}

// Handle "Remember me" checkbox
const rememberMeCheckbox = document.getElementById('checkbox-signin');
auth.setPersistence(rememberMeCheckbox.checked ? 'LOCAL' : 'SESSION');

// Handle Forgot Password
document.querySelector('a[href="auth-recoverpw.html"]').addEventListener('click', (e) => {
e.preventDefault();
window.location.href = 'auth-recoverpw.html';
});