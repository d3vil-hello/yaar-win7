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

const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        let menuOpen = false;

        function toggleMenu() {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('active', menuOpen);
            hamburger.classList.toggle('active', menuOpen);
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        }

        function closeMenu() {
            menuOpen = false;
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }

         // ========== BUTTONS LOAD FROM LOCALSTORAGE ==========
        const STORAGE_KEY = 'yaarwinButtons';

        const defaults = {
            btn1Text: 'Register Now',
            btn1Link: 'https://example.com/register',
            btn2Text: 'Join Telegram',
            btn2Link: 'https://t.me/yourchannel'
        };

        function loadButtons() {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaults;
            
            document.getElementById('btn1Text').textContent = data.btn1Text;
            document.getElementById('btn1').href = data.btn1Link;
            document.getElementById('btn2Text').textContent = data.btn2Text;
            document.getElementById('btn2').href = data.btn2Link;
        }

        // Page load pe buttons update
        loadButtons();

        // Real-time update (jab bhi localStorage change ho)
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY) {
                loadButtons();
            }
        });

        // ========== LIVE TOAST POPUPS ==========
        const names = ['Rahul S.', 'Amit K.', 'Priya M.', 'Vikram R.', 'Sneha P.', 'Deepak G.', 'Anjali T.', 'Rajesh D.', 'Pooja N.', 'Suresh B.'];

        const messages = [
            'just registered!',
            'joined the platform!',
            'won ₹500!',
            'claimed bonus!',
            'earned ₹250!'
        ];

        function showToast() {
            const toast = document.getElementById('toast1');
            document.getElementById('toast1Name').textContent = names[Math.floor(Math.random() * names.length)];
            document.getElementById('toast1Msg').textContent = messages[Math.floor(Math.random() * messages.length)];
            toast.classList.add('show');

            setTimeout(() => toast.classList.remove('show'), 3500);
            setTimeout(showToast, 4000 + Math.random() * 6000);
        }

        setTimeout(showToast, 2000);

          // ========== SLIDER LOGIC ==========
        const wrapper = document.getElementById('sliderWrapper');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('sliderDots');
        
        const cards = document.querySelectorAll('.game-card');
        const cardWidth = cards[0].offsetWidth + 20; // card width + gap
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
            
            // Update buttons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalCards - getVisibleCards();
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function getVisibleCards() {
            const container = document.getElementById('sliderContainer');
            const containerWidth = container.offsetWidth;
            return Math.floor(containerWidth / cardWidth);
        }

        function slide(direction) {
            const visibleCards = getVisibleCards();
            const maxIndex = totalCards - visibleCards;

            if (direction === 'next' && currentIndex < maxIndex) {
                currentIndex++;
            } else if (direction === 'prev' && currentIndex > 0) {
                currentIndex--;
            }

            updateSlider();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    slide('next');
                } else {
                    slide('prev');
                }
            }
        }

        // Aviator multiplier animation
        const multiplierEl = document.getElementById('multiplier');
        setInterval(() => {
            const randomMultiplier = (Math.random() * 9 + 1).toFixed(1);
            multiplierEl.textContent = randomMultiplier + 'x';
        }, 3000);

        // Initial update
        updateSlider();

        // Update on resize
        window.addEventListener('resize', updateSlider);

       function featCopyCode(code, btn) {
        navigator.clipboard.writeText(code).then(() => {
            btn.textContent = '✅ Copied!';
            btn.classList.add('feat-copied');
            
            var toast = document.getElementById('featToast');
            toast.textContent = '✅ Invite code copied: ' + code;
            toast.classList.add('feat-show');
            
            setTimeout(function() {
                toast.classList.remove('feat-show');
            }, 2000);

            setTimeout(function() {
                btn.textContent = '📋 Copy';
                btn.classList.remove('feat-copied');
            }, 2000);
        });
    }

      // ========== TOGGLE SINGLE SECTION ==========
        function toggleSection(header) {
            const section = header.parentElement;
            section.classList.toggle('open');
            updateToggleButtons();
        }

        // ========== TOGGLE ALL ==========
        function toggleAll(expand) {
            const allSections = document.querySelectorAll('.toc-section');
            allSections.forEach(section => {
                if (expand) {
                    section.classList.add('open');
                } else {
                    section.classList.remove('open');
                }
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

         // Live counter animation
        setInterval(() => {
            const online = document.getElementById('onlinePlayers');
            const winners = document.getElementById('todayWinners');
            if (online) online.textContent = (2847 + Math.floor(Math.random() * 20 - 10)).toLocaleString();
            if (winners) winners.textContent = (1423 + Math.floor(Math.random() * 5)).toLocaleString();
        }, 3000);

        // Winners tabs
        document.querySelectorAll('.winners-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.winners-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

         // Tab switching
        document.querySelectorAll('.blog-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Pagination
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('arrow')) {
                    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Tags
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', function() {
                this.style.background = this.style.background === 'rgb(12, 215, 129)' ? '#f5f5f5' : '#0CD781';
                this.style.color = this.style.color === 'rgb(255, 255, 255)' ? '#666' : '#fff';
            });
        });

         // ========== FORM SUBMIT ==========
        function submitForm() {
            const name = document.getElementById('name').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const topic = document.getElementById('topic').value;
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name) { alert('Please enter your name'); return; }
            if (!mobile) { alert('Please enter your mobile number'); return; }
            if (mobile.length < 10) { alert('Please enter a valid mobile number'); return; }
            if (!topic) { alert('Please select a topic'); return; }
            if (!message) { alert('Please enter your message'); return; }
            if (message.length < 10) { alert('Message must be at least 10 characters'); return; }

            // Show success
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('successMsg').classList.add('show');

            // Console log (replace with actual API call)
            console.log('Form Submitted:', { name, mobile, email: document.getElementById('email').value, topic, message });
        }

        // ========== RESET FORM ==========
        function resetForm() {
            document.getElementById('name').value = '';
            document.getElementById('mobile').value = '';
            document.getElementById('email').value = '';
            document.getElementById('topic').value = '';
            document.getElementById('message').value = '';
            document.getElementById('contactForm').style.display = 'block';
            document.getElementById('successMsg').classList.remove('show');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ========== ENTER KEY SUBMIT ==========
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                submitForm();
            }
        });