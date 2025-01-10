// Import Firebase auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Login function
async function loginWithEmailPassword() {
const email = document.getElementById('emailaddress').value;
const password = document.getElementById('password').value;

if (!email || !password) {
   alert('Please enter both email and password');
   return;
}

try {
   const userCredential = await signInWithEmailAndPassword(auth, email, password);
   console.log('Login successful:', userCredential.user);
   // Store user data in localStorage
   localStorage.setItem('user', JSON.stringify(userCredential.user));
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Login error:', error);
   alert('Login failed: ' + error.message);
}
}

// Google Sign In function
async function signInWithGoogle() {
try {
   const result = await signInWithPopup(auth, googleProvider);
   console.log('Google sign in successful:', result.user);
   // Store user data in localStorage
   localStorage.setItem('user', JSON.stringify(result.user));
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Google sign in error:', error);
   alert('Google sign in failed: ' + error.message);
}
}

// Facebook Sign In function
async function signInWithFacebook() {
try {
   const result = await signInWithPopup(auth, facebookProvider);
   console.log('Facebook sign in successful:', result.user);
   // Store user data in localStorage
   localStorage.setItem('user', JSON.stringify(result.user));
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Facebook sign in error:', error);
   alert('Facebook sign in failed: ' + error.message);
}
}

// Add event listeners once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Login button click
const loginButton = document.querySelector('button[type="submit"]');
if (loginButton) {
   loginButton.addEventListener('click', function(e) {
       e.preventDefault();
       loginWithEmailPassword();
   });
}

// Google sign-in button
const googleBtn = document.querySelector('.btn:has(svg[viewBox="0 0 48 48"])');
if (googleBtn) {
   googleBtn.addEventListener('click', function(e) {
       e.preventDefault();
       signInWithGoogle();
   });
}

// Facebook sign-in button
const facebookBtn = document.querySelector('.btn:has(svg[viewBox="0 0 256 256"])');
if (facebookBtn) {
   facebookBtn.addEventListener('click', function(e) {
       e.preventDefault();
       signInWithFacebook();
   });
}

// Remember me checkbox
const rememberMeCheckbox = document.getElementById('checkbox-signin');
if (rememberMeCheckbox) {
   rememberMeCheckbox.addEventListener('change', function() {
       localStorage.setItem('rememberMe', this.checked);
   });
}
});

// Check auth state changes
auth.onAuthStateChanged((user) => {
if (user) {
   console.log('User is signed in:', user);
   localStorage.setItem('user', JSON.stringify(user));
} else {
   console.log('User is signed out');
   localStorage.removeItem('user');
}
});

// Registration function (to be used on registration page)
async function registerUser(email, password) {
try {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   console.log('Registration successful:', userCredential.user);
   localStorage.setItem('user', JSON.stringify(userCredential.user));
   window.location.href = 'Dashboard.html';
} catch (error) {
   console.error('Registration error:', error);
   alert('Registration failed: ' + error.message);
}
}