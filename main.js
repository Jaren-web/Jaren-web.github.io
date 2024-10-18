document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const changingTextElement = document.querySelector('.changing-text span');
    const loginButton = document.getElementById('login-button');
    const adminPanel = document.getElementById('admin-panel');
    const commandForm = document.getElementById('new-command-form');
    const loadingSpinner = document.createElement('div'); // Create a loading spinner element
    
    // Loading spinner styles
    loadingSpinner.classList.add('loading'); // Add loading class
    loadingSpinner.innerHTML = '<div class="loading-spinner"></div>'; // Create spinner element
    document.body.appendChild(loadingSpinner); // Append to the body
    loadingSpinner.style.display = 'none'; // Initially hide the spinner
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        if (overlay) {
            overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        }
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
    
    // Text that changes at the top of the page
    const textArray = [
        "Build Your Best Server!",
        "Get help with Jaren!",
        "Let us help you grow!",
        "You deserve us!"
    ];
    let currentIndex = 0;

    function typeText(text, index = 0) {
        if (index < text.length) {
            setTimeout(() => {
                const span = document.createElement('span');
                if (text[index] === ' ') {
                    span.innerHTML = '&nbsp;';
                } else {
                    span.textContent = text[index];
                }
                if (changingTextElement) {
                    changingTextElement.appendChild(span);
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 50);
                }
                typeText(text, index + 1);
            }, 100);
        } else {
            setTimeout(changeText, 3000); // Wait for 3 seconds before changing text
        }
    }

    function changeText() {
        if (changingTextElement) {
            changingTextElement.innerHTML = ''; // Clear previous text
            currentIndex = (currentIndex + 1) % textArray.length;
            typeText(textArray[currentIndex]);
        }
    }

    if (changingTextElement) {
        typeText(textArray[0]); // Start the animation with the first text
    }

    // Admin Login (accepts any password)
    loginButton.addEventListener('click', function() {
        const password = prompt("Enter Admin Password:");
        
        // Always "accept" the password and log them in
        if (password) {
            loadingSpinner.style.display = 'flex'; // Show the loading spinner
            
            // Simulate loading time (you can adjust this duration)
            setTimeout(() => {
                adminPanel.style.display = "block";
                loadingSpinner.style.display = 'none'; // Hide the loading spinner
                loginButton.style.display = "none";
            }, 1000); // 1 second loading time
        }
    });

    // Show trick message when form is submitted
    commandForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show alert trick message
        alert("You got tricked lol");

        // Ask if they want to add the bot to their server
        if (confirm("Would you like to add our fun discord bot to your server?")) {
            // Redirect to Discord authorization link
            window.location.href = "https://discord.com/oauth2/authorize?client_id=1288503796321751080&scope=bot%20applications.commands&permissions=110016";
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close sidebar if it's open
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });
});
