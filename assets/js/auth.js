// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5gfTJ1i-ynzhIs9tG3-ygzOVhp8elxPI",
    authDomain: "hypro-c37dd.firebaseapp.com",
    projectId: "hypro-c37dd",
    storageBucket: "hypro-c37dd.firebasestorage.app",
    messagingSenderId: "226044571122",
    appId: "1:226044571122:web:d3efe9a8e487480c99cf6b",
    measurementId: "G-N354LPRS7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Determine if we're on the login or register page
const isRegisterPage = window.location.href.includes('register');

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submissions
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('emailaddress').value;
            const password = document.getElementById('password').value;

            if (isRegisterPage) {
                // Registration
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Registration successful:', userCredential.user);
                    window.location.href = 'Dashboard.html';
                } catch (error) {
                    console.error('Registration error:', error);
                    alert('Registration failed: ' + error.message);
                }
            } else {
                // Login
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    console.log('Login successful:', userCredential.user);
                    window.location.href = 'Dashboard.html';
                } catch (error) {
                    console.error('Login error:', error);
                    alert('Login failed: ' + error.message);
                }
            }
        });
    }

    // Google Sign In
    const googleBtn = document.querySelector('.btn:has(svg[viewBox="0 0 48 48"])');
    if (googleBtn) {
        googleBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                console.log('Google sign in successful:', result.user);
                window.location.href = 'Dashboard.html';
            } catch (error) {
                console.error('Google sign in error:', error);
                alert('Google sign in failed: ' + error.message);
            }
        });
    }
});

// Monitor auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
    } else {
        console.log('User is signed out');
    }
});