document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Clear previous error messages
            clearErrors();
            
            let isValid = true;
            
            // Validate Name (non-empty)
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            }
            
            // Validate Email (non-empty and valid format)
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Message (non-empty)
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            }
            
            // Test edge cases and special characters
            if (name && containsSpecialChars(name)) {
                showError('nameError', 'Name should not contain special characters');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
            }
        });
        
        // Function to validate email using regex
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Function to check for special characters in name
        function containsSpecialChars(str) {
            const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
            return specialChars.test(str);
        }
        
        // Function to show error message
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Function to clear all error messages
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(function(error) {
                error.style.display = 'none';
                error.textContent = '';
            });
            
            // Hide success message if showing
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('contactForm').style.display = 'block';
        }