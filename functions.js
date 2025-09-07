function projectData() {
    return {
        projects: [],

        async fetchProjects() {
            try {
                const response = await fetch('./json/projects.json');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                this.projects = await response.json();
            } catch (err) {
                console.error('Error fetching projects:', err);
            }
        }
    }
}

function workExperienceData() {
    return {
        works: [],

        async fetchWorks() {
            try {
                const response = await fetch('./json/works.json');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                this.works = await response.json();
            } catch (err) {
                console.error('Error fetching projects:', err);
            }
        }
    }
}

function copyFunction() {
    const email = "sina.k.career@gmail.com"
    navigator.clipboard.writeText(email)
        .then(() => {
            alert('Text copied to clipboard: ' + email);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');

    // Handle navigation click
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            // Show the target page and hide others
            pages.forEach(page => {
                if (page.id === targetPage + '-content') {
                    page.style.display = 'block';
                } else {
                    page.style.display = 'none';
                }
            });

            // Update active nav item
            navItems.forEach(navItem => {
                if (navItem === this) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            });
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            htmlElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme);
    });

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
});