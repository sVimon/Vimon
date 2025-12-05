document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');

    // وظيفة تبديل الوضع (Light/Dark Mode)
    
    // إعداد الثيم الأولي
    function setInitialTheme() {
        const savedTheme = localStorage.getItem('vimonTheme');
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // تبديل الثيم عند النقر
    if (themeToggle) {
        setInitialTheme();
        themeToggle.addEventListener('click', function() {
            if (document.body.getAttribute('data-theme') === 'light') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('vimonTheme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('vimonTheme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
});