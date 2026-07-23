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

if (hamburger) {
    hamburger.addEventListener('click', function() {
        menuOpen = !menuOpen;
        if (mobileMenu) {
            mobileMenu.classList.toggle('active', menuOpen);
        }
        hamburger.classList.toggle('active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });
}

function closeMenu() {
    menuOpen = false;
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Close menu when clicking a link
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
}

// ========== BUTTONS LOAD FROM LOCALSTORAGE ==========
const STORAGE_KEY = 'yaarwinButtons';

const defaults = {
    btn1Text: 'Register Now',
    btn1Link: 'https://yaarwin39.com/#/register?invitationCode=301503022483',
    btn2Text: 'Join Telegram',
    btn2Link: 'https://t.me/+lbhYSeuPd580MTZl'
};

function loadButtons() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaults;
    
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

loadButtons();

window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY) {
        loadButtons();
    }
});

// ========== LIVE TOAST POPUPS ==========
const toast1 = document.getElementById('toast1');
const toast1Name = document.getElementById('toast1Name');
const toast1Msg = document.getElementById('toast1Msg');

if (toast1 && toast1Name && toast1Msg) {
    const names = ['Rahul S.', 'Amit K.', 'Priya M.', 'Vikram R.', 'Sneha P.', 'Deepak G.', 'Anjali T.', 'Rajesh D.', 'Pooja N.', 'Suresh B.'];
    const messages = ['just registered!', 'joined the platform!', 'won ₹500!', 'claimed bonus!', 'earned ₹250!'];

    function showToast() {
        toast1Name.textContent = names[Math.floor(Math.random() * names.length)];
        toast1Msg.textContent = messages[Math.floor(Math.random() * messages.length)];
        toast1.classList.add('show');
        setTimeout(function() { toast1.classList.remove('show'); }, 3500);
        setTimeout(showToast, 4000 + Math.random() * 6000);
    }

    setTimeout(showToast, 2000);
}


// ========== AVIATOR MULTIPLIER ==========
const multiplierEl = document.getElementById('multiplier');
if (multiplierEl) {
    setInterval(function() {
        const randomMultiplier = (Math.random() * 9 + 1).toFixed(1);
        multiplierEl.textContent = randomMultiplier + 'x';
    }, 3000);
}

// ========== COPY INVITE CODE ==========
function featCopyCode(code, btn) {
    navigator.clipboard.writeText(code).then(function() {
        btn.textContent = '✅ Copied!';
        btn.classList.add('feat-copied');
        
        const toast = document.getElementById('featToast');
        if (toast) {
            toast.textContent = '✅ Invite code copied: ' + code;
            toast.classList.add('feat-show');
            setTimeout(function() { toast.classList.remove('feat-show'); }, 2000);
        }

        setTimeout(function() {
            btn.textContent = '📋 Copy';
            btn.classList.remove('feat-copied');
        }, 2000);
    }).catch(function() {
        alert('Failed to copy. Please try again.');
    });
}

// ========== TOGGLE SINGLE SECTION ==========
function toggleSection(header) {
    if (!header) return;
    const section = header.parentElement;
    if (section) {
        section.classList.toggle('open');
        updateToggleButtons();
    }
}

// ========== TOGGLE ALL ==========
function toggleAll(expand) {
    const allSections = document.querySelectorAll('.toc-section');
    allSections.forEach(function(section) {
        if (expand) section.classList.add('open');
        else section.classList.remove('open');
    });
    updateToggleButtons();
}

// ========== UPDATE BUTTON STATES ==========
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
setInterval(function() {
    const online = document.getElementById('onlinePlayers');
    const winners = document.getElementById('todayWinners');
    if (online) online.textContent = (2847 + Math.floor(Math.random() * 20 - 10)).toLocaleString();
    if (winners) winners.textContent = (1423 + Math.floor(Math.random() * 5)).toLocaleString();
}, 3000);

// ========== WINNERS TABS ==========
document.querySelectorAll('.winners-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.winners-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
    });
});

// ========== BLOG TABS ==========
document.querySelectorAll('.blog-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.blog-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
    });
});

// ========== PAGINATION ==========
document.querySelectorAll('.page-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('arrow')) {
            document.querySelectorAll('.page-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
        }
    });
});

// ========== TAGS ==========
document.querySelectorAll('.tag').forEach(function(tag) {
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

    console.log('Form Submitted:', { name: name, mobile: mobile, email: email, topic: topic, message: message });
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