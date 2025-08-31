document.addEventListener('DOMContentLoaded', () => {

    // --- INTERACTIVITY: SCROLL-TRIGGERED ANIMATIONS ---
    // This makes elements fade in as you scroll to them.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the class 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- FUNCTIONALITY: REAL-TIME FORM VALIDATION ---
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        input.classList.add('invalid');
        errorDisplay.textContent = message;
    };

    const showSuccess = (input) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        input.classList.remove('invalid');
        errorDisplay.textContent = '';
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const checkRequired = (inputs) => {
        let isFormValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required.`);
                isFormValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isFormValid;
    };
    
    const checkEmailFormat = (input) => {
        if (input.value.trim() !== '' && !validateEmail(input.value.trim())) {
            showError(input, 'Email is not valid.');
            return false;
        }
        return true;
    }
    
    const getFieldName = (input) => {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting by default

        let isRequiredValid = checkRequired([nameInput, emailInput, messageInput]);
        let isEmailFormatValid = checkEmailFormat(emailInput);
        
        if (isRequiredValid && isEmailFormatValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your inquiry! We will be in touch shortly. (This is a demo)');
            form.reset();
        }
    });
});