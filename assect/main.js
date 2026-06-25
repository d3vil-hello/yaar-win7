// ========== PAGE LOADER ==========
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }
});
// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu() {
    if (!hamburger || !mobileMenu) return;
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    hamburger.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function closeMenu() {
    if (!hamburger || !mobileMenu) return;
    menuOpen = false;
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// Hamburger click event
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// ========== BUTTONS LOAD FROM LOCALSTORAGE ==========
const STORAGE_KEY = 'yaarwinButtons';

const defaults = {
    btn1Text: 'Register Now',
    btn1Link: 'https://yaarwin.club/#/register?invitationCode=52143161103',
    btn2Text: 'Join Telegram',
    btn2Link: 'https://t.me/+Xp6dhjJnYUQxOTE1'
};

function loadButtons() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaults;
    
    // Safe element access with null check
    const btn1Text = document.getElementById('btn1Text');
    const btn1 = document.getElementById('btn1');
    const btn2Text = document.getElementById('btn2Text');
    const btn2 = document.getElementById('btn2');
    
    if (btn1Text) btn1Text.textContent = data.btn1Text;
    if (btn1) {
        btn1.href = data.btn1Link;
        btn1.setAttribute('rel', 'sponsored');
    }
    if (btn2Text) btn2Text.textContent = data.btn2Text;
    if (btn2) {
        btn2.href = data.btn2Link;
        btn2.setAttribute('rel', 'noopener');
        btn2.setAttribute('target', '_blank');
    }
}

// Page load pe buttons update
if (document.getElementById('btn1') || document.getElementById('btn2')) {
    loadButtons();
}

// Real-time update
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        loadButtons();
    }
});

// ========== LIVE TOAST POPUPS ==========
const toast1 = document.getElementById('toast1');
if (toast1) {
    const names = ['Rahul S.', 'Amit K.', 'Priya M.', 'Vikram R.', 'Sneha P.', 'Deepak G.', 'Anjali T.', 'Rajesh D.', 'Pooja N.', 'Suresh B.'];
    const messages = ['just registered!', 'joined the platform!', 'won ₹500!', 'claimed bonus!', 'earned ₹250!'];

    function showToast() {
        const nameEl = document.getElementById('toast1Name');
        const msgEl = document.getElementById('toast1Msg');
        if (nameEl) nameEl.textContent = names[Math.floor(Math.random() * names.length)];
        if (msgEl) msgEl.textContent = messages[Math.floor(Math.random() * messages.length)];
        toast1.classList.add('show');

        setTimeout(() => toast1.classList.remove('show'), 3500);
        setTimeout(showToast, 4000 + Math.random() * 6000);
    }

    setTimeout(showToast, 2000);
}

// ========== SLIDER LOGIC ==========
const wrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

if (wrapper && prevBtn && nextBtn && dotsContainer) {
    const cards = document.querySelectorAll('.game-card');
    
    if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 20;
        let currentIndex = 0;
        const totalCards = cards.length;

        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalCards - getVisibleCards();
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function getVisibleCards() {
            const container = document.getElementById('sliderContainer');
            if (!container) return 1;
            const containerWidth = container.offsetWidth;
            return Math.floor(containerWidth / cardWidth) || 1;
        }

        function slide(direction) {
            const visibleCards = getVisibleCards();
            const maxIndex = totalCards - visibleCards;
            if (direction === 'next' && currentIndex < maxIndex) currentIndex++;
            else if (direction === 'prev' && currentIndex > 0) currentIndex--;
            updateSlider();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        // Touch swipe
        let touchStartX = 0;
        let touchEndX = 0;

        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? slide('next') : slide('prev');
            }
        });

        // Initial update
        updateSlider();

        // Resize update
        window.addEventListener('resize', updateSlider);
    }
}

// ========== AVIATOR MULTIPLIER ANIMATION ==========
const multiplierEl = document.getElementById('multiplier');
if (multiplierEl) {
    setInterval(() => {
        const randomMultiplier = (Math.random() * 9 + 1).toFixed(1);
        multiplierEl.textContent = randomMultiplier + 'x';
    }, 3000);
}

// ========== COPY INVITE CODE ==========
function featCopyCode(code, btn) {
    navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✅ Copied!';
        btn.classList.add('feat-copied');
        
        const toast = document.getElementById('featToast');
        if (toast) {
            toast.textContent = '✅ Invite code copied: ' + code;
            toast.classList.add('feat-show');
            setTimeout(() => toast.classList.remove('feat-show'), 2000);
        }

        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('feat-copied');
        }, 2000);
    }).catch(() => {
        alert('Failed to copy. Please try again.');
    });
}

// ========== TOGGLE SECTIONS ==========
function toggleSection(header) {
    if (!header) return;
    const section = header.parentElement;
    if (section) {
        section.classList.toggle('open');
        updateToggleButtons();
    }
}

function toggleAll(expand) {
    const allSections = document.querySelectorAll('.toc-section');
    allSections.forEach(section => {
        if (expand) section.classList.add('open');
        else section.classList.remove('open');
    });
    updateToggleButtons();
}

function updateToggleButtons() {
    const allSections = document.querySelectorAll('.toc-section');
    const openCount = document.querySelectorAll('.toc-section.open').length;
    const totalCount = allSections.length;
    const expandBtn = document.querySelectorAll('.toc-toggle-btn')[0];
    const collapseBtn = document.querySelectorAll('.toc-toggle-btn')[1];

    if (!expandBtn || !collapseBtn) return;

    if (openCount === totalCount) {
        expandBtn.classList.add('active');
        collapseBtn.classList.remove('active');
    } else if (openCount === 0) {
        collapseBtn.classList.add('active');
        expandBtn.classList.remove('active');
    } else {
        expandBtn.classList.remove('active');
        collapseBtn.classList.remove('active');
    }
}

// ========== LIVE COUNTER ANIMATION ==========
setInterval(() => {
    const online = document.getElementById('onlinePlayers');
    const winners = document.getElementById('todayWinners');
    if (online) online.textContent = (2847 + Math.floor(Math.random() * 20 - 10)).toLocaleString();
    if (winners) winners.textContent = (1423 + Math.floor(Math.random() * 5)).toLocaleString();
}, 3000);

// ========== WINNERS TABS ==========
document.querySelectorAll('.winners-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.winners-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ========== BLOG TABS ==========
document.querySelectorAll('.blog-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ========== PAGINATION ==========
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('arrow')) {
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// ========== TAGS ==========
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.background = this.style.background === 'rgb(12, 215, 129)' ? '#f5f5f5' : '#0CD781';
        this.style.color = this.style.color === 'rgb(255, 255, 255)' ? '#666' : '#fff';
    });
});

// ========== FORM SUBMIT ==========
function submitForm() {
    const nameEl = document.getElementById('name');
    const mobileEl = document.getElementById('mobile');
    const topicEl = document.getElementById('topic');
    const messageEl = document.getElementById('message');
    const emailEl = document.getElementById('email');

    if (!nameEl || !mobileEl || !topicEl || !messageEl) return;

    const name = nameEl.value.trim();
    const mobile = mobileEl.value.trim();
    const topic = topicEl.value;
    const message = messageEl.value.trim();
    const email = emailEl ? emailEl.value.trim() : '';

    if (!name) { alert('Please enter your name'); return; }
    if (!mobile) { alert('Please enter your mobile number'); return; }
    if (mobile.length < 10) { alert('Please enter a valid mobile number'); return; }
    if (!topic) { alert('Please select a topic'); return; }
    if (!message) { alert('Please enter your message'); return; }
    if (message.length < 10) { alert('Message must be at least 10 characters'); return; }

    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');
    
    if (contactForm) contactForm.style.display = 'none';
    if (successMsg) successMsg.classList.add('show');

    console.log('Form Submitted:', { name, mobile, email, topic, message });
}

function resetForm() {
    const nameEl = document.getElementById('name');
    const mobileEl = document.getElementById('mobile');
    const emailEl = document.getElementById('email');
    const topicEl = document.getElementById('topic');
    const messageEl = document.getElementById('message');
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');

    if (nameEl) nameEl.value = '';
    if (mobileEl) mobileEl.value = '';
    if (emailEl) emailEl.value = '';
    if (topicEl) topicEl.value = '';
    if (messageEl) messageEl.value = '';
    if (contactForm) contactForm.style.display = 'block';
    if (successMsg) successMsg.classList.remove('show');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        submitForm();
    }
});