/* ============================================
   Theme Toggle (روز و شب)
   ============================================ */

// بررسی تم ذخیره شده در localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButton();
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// تغییر تم
function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
    
    updateThemeButton();
}

// بروزرسانی آیکن تم
function updateThemeButton() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

// Event Listener برای دکمه تم
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

/* ============================================
   Hamburger Menu (منو موبایل)
   ============================================ */

function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // بستن منو هنگام کلیک روی لینک
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeHamburger);

/* ============================================
   Login Handler
   ============================================ */

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // بررسی ساده
    if (email && password) {
        // در یک برنامه واقعی، اطلاعات به سرور ارسال می‌شود
        alert('ورود موفق! خوش آمدید ' + email);
        
        // ریست کردن فرم
        document.querySelector('.login-form').reset();
        
        // ممکن است به صفحه اصلی برود
        // window.location.href = 'index.html';
    } else {
        alert('لطفاً تمام فیلدها را پر کنید');
    }
}

/* ============================================
   File Upload Handler
   ============================================ */

function handleFileUpload(event) {
    const file = event.target.files[0];
    const uploadStatus = document.getElementById('uploadStatus');
    
    if (file) {
        // بررسی فرمت فایل
        const allowedFormats = ['audio/mpeg', 'audio/wav', 'audio/mp4'];
        
        if (allowedFormats.includes(file.type)) {
            // بررسی حجم فایل (حداکثر 50MB)
            if (file.size <= 50 * 1024 * 1024) {
                uploadStatus.textContent = '✓ فایل ' + file.name + ' آماده آپلود است';
                uploadStatus.style.color = '#28a745';
                
                // می‌تواند فایل را به سرور ارسال کند
                // در این مثال فقط فرانت‌اند است
            } else {
                uploadStatus.textContent = '✗ فایل خیلی بزرگ است (حداکثر 50MB)';
                uploadStatus.style.color = '#dc3545';
            }
        } else {
            uploadStatus.textContent = '✗ فرمت فایل پشتیبانی نمی‌شود';
            uploadStatus.style.color = '#dc3545';
        }
    }
}

/* ============================================
   Drag and Drop for File Upload
   ============================================ */

function initializeDragAndDrop() {
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.getElementById('fileUpload');
    
    if (uploadBox && fileInput) {
        // جلوگیری از رفتار پیش‌فرض
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadBox.style.borderColor = '#007bff';
        });
        
        uploadBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadBox.style.borderColor = '#ddd';
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadBox.style.borderColor = '#ddd';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileUpload({ target: { files: files } });
            }
        });
        
        // کلیک روی باکس برای انتخاب فایل
        uploadBox.addEventListener('click', function() {
            fileInput.click();
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeDragAndDrop);

/* ============================================
   Active Link Updater (برای منو)
   ============================================ */

function updateActiveLink() {
    const links = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveLink);

/* ============================================
   Smooth Scroll Behavior
   ============================================ */

// این قسمت از طریق CSS `scroll-behavior: smooth` انجام می‌شود
// اما اگر نیاز به حمایت بیشتر باشد، می‌توان از این کد استفاده کرد

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ============================================
   Window Resize Handler (برای تنظیمات responsive)
   ============================================ */

window.addEventListener('resize', function() {
    // اگر صفحه بزرگتر از 768px شود، منو را ببند
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

/* ============================================
   Initialization on Page Load
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحه بارگذاری شد');
    
    // اگر استفاده‌کننده ترجیح شب را داشته باشد
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});