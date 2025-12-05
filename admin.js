document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');
    const loginForm = document.getElementById('login-form'); 
    const errorMessage = document.getElementById('error-message');

    // ** بيانات تسجيل الدخول الثابتة **
    const VALID_USERNAME = 'mo3ad';
    const VALID_PASSWORD = 'a7san7ala9';
    const DASHBOARD_URL = 'dashboard.html'; 

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الافتراضي للصفحة

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        errorMessage.textContent = ''; 

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // نجاح تسجيل الدخول
            errorMessage.textContent = '✅ جاري توجيهك إلى لوحة التحكم...';
            errorMessage.style.color = '#4CAF50';
            
            setTimeout(() => {
                window.location.href = DASHBOARD_URL; 
            }, 1000); 

        } else {
            // فشل تسجيل الدخول
            errorMessage.textContent = '❌ اسم المشرف أو كلمة المرور غير صحيحة. حاول مرة أخرى.';
            errorMessage.style.color = '#ff5722';
            
            // تنظيف حقول الإدخال عند الفشل 
            passwordInput.value = '';
        }
    });
});