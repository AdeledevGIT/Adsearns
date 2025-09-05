(function(){
  const KEY='adsearns_theme';
  const root=document.documentElement;
  const mq=window.matchMedia('(prefers-color-scheme: dark)');
  function compute(mode){ return mode==='system' ? (mq.matches ? 'dark' : 'light') : mode; }
  function setThemeAttr(theme){ root.setAttribute('data-theme', theme); }
  function setManifest(theme){
    try {
      const link = document.querySelector("link[rel='manifest']");
      if (!link) return;
      const isLight = theme === 'light';
      const href = isLight ? 'manifest-light.json' : 'manifest.json';
      if (link.getAttribute('href') !== href) link.setAttribute('href', href);
    } catch(e) {}
  }
  function apply(mode){
    try { localStorage.setItem(KEY, mode); } catch(e) {}
    const eff=compute(mode);
    setThemeAttr(eff);
    setManifest(eff);
  }
  // initial apply as early as possible to minimize FOUC
  try {
    const saved=(localStorage.getItem(KEY) || 'system');
    const eff=compute(saved);
    setThemeAttr(eff);
    // defer manifest swap until DOM is ready if link may not be present yet
    document.addEventListener('DOMContentLoaded', ()=> setManifest(eff));
  } catch(e) {}
  function setActive(mode){
    try {
      document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
      const el=document.getElementById('mode-'+mode);
      if(el) el.classList.add('active');
    } catch(e) {}
  }
  function initButtons(){
    const saved = (localStorage.getItem(KEY) || 'system');
    setActive(saved);
    ['light','dark','system'].forEach(m=>{
      const btn=document.getElementById('mode-'+m);
      if(btn && !btn.__themeInit){
        btn.__themeInit=true;
        btn.addEventListener('click', ()=>{ apply(m); setActive(m); });
      }
    });
    const onSystemChange = () => {
      const cur=(localStorage.getItem(KEY) || 'system');
      if(cur==='system') {
        const eff=compute('system');
        setThemeAttr(eff);
        setManifest(eff);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }
  window.AdsearnsTheme = { apply, initButtons, get: ()=> (localStorage.getItem(KEY)||'system') };
})();

// ADSEARNS Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    if (window.AdsearnsTheme && typeof window.AdsearnsTheme.initButtons === 'function') { window.AdsearnsTheme.initButtons(); }
    
    // Add click event listeners to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('.action-label').textContent;
            console.log(`Action clicked: ${action}`);
            // Add your action logic here
        });
    });

    // Add click event listeners to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navAction = this.querySelector('.nav-label').textContent.trim().toLowerCase();
            console.log(`Navigation clicked: ${navAction}`);
            if (navAction === 'home') {
                window.location.href = 'index.html';
            } else if (navAction === 'profile') {
                window.location.href = 'profile.html';
            } else if (navAction === 'withdraw') {
                window.location.href = 'withdraw.html';
            } else if (navAction === 'friends') {
                // Placeholder for future page
                alert('Friends page coming soon');
            }
        });
    });

    // Add click event listener to switch button
    const switchBtn = document.querySelector('.switch-btn');
    if (switchBtn) {
        switchBtn.addEventListener('click', function() {
            console.log('Switch to advertise clicked');
            // Add your switch logic here
        });
    }

    // Add click event listeners to side features
    const sideFeatures = document.querySelectorAll('.side-feature');
    sideFeatures.forEach(feature => {
        feature.addEventListener('click', function() {
            const featureName = this.querySelector('.feature-label').textContent;
            console.log(`Feature clicked: ${featureName}`);
            // Add your feature logic here
        });
    });

    // Add click event listeners to banner cards
    const bannerCards = document.querySelectorAll('.banner-card');
    bannerCards.forEach((card, idx) => {
        card.addEventListener('click', function() {
            console.log(`ShowBanner ads ${idx + 1} clicked`);
            // Add your banner logic here
        });
    });

    // Add click event listener to balance card
    const balanceCard = document.querySelector('.balance-card');
    if (balanceCard) {
        balanceCard.addEventListener('click', function() {
            console.log('Balance card clicked');
            // Add your balance logic here
        });
    }

    // Optional: Add loading animation
    function showLoading() {
        const container = document.querySelector('.container');
        container.style.opacity = '0.8';
        // Add your loading logic here
    }

    function hideLoading() {
        const container = document.querySelector('.container');
        container.style.opacity = '1';
        // Remove loading state
    }

    // Optional: Add smooth scrolling for better UX
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Optional: Add touch feedback for mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.action-btn, .nav-item, .side-feature, .banner-card, .balance-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Auto-rotating banner carousel (horizontal, overflow hidden)
    const carousel = document.querySelector('.banner-carousel');
    if (carousel) {
        const track = carousel.querySelector('.banner-track');
        const slides = carousel.querySelectorAll('.banner-card');
        let index = 0;

        function applySlideWidth() {
            const gap = 12; // must match CSS .banner-track gap
            const viewport = carousel.clientWidth;
            const totalGapFor3 = gap * 2;
            // If we can fit all three fully with gaps, do so
            if (viewport >= (3 * 300 + totalGapFor3)) {
                // Show all 3 fully (300px each default height baseline) – use equal thirds
                const slideWidth = (viewport - totalGapFor3) / 3;
                slides.forEach(s => s.style.setProperty('--slide-width', `${slideWidth}px`));
            } else {
                // Show peeking neighbors around a centered slide (~80% viewport)
                const slideWidth = Math.max(220, Math.min(0.8 * viewport, viewport - 60));
                slides.forEach(s => s.style.setProperty('--slide-width', `${slideWidth}px`));
            }
        }

        function updatePosition() {
            const slide = slides[0];
            const slideWidth = slide.getBoundingClientRect().width;
            const gap = 12; // must match CSS .banner-track gap
            const viewport = carousel.clientWidth;
            // Center the active slide so neighbors peek
            const offset = index * (slideWidth + gap);
            const centerShift = (viewport - slideWidth) / 2;
            track.style.transform = `translateX(${centerShift - offset}px)`;
        }

        const intervalMs = 3000; // 3 seconds
        const timer = setInterval(() => {
            index = (index + 1) % slides.length;
            updatePosition();
        }, intervalMs);

        window.addEventListener('resize', () => {
            applySlideWidth();
            updatePosition();
        });

        applySlideWidth();
        updatePosition();
    }

    // Align the small account number with the full name's vertical position
    function positionAccountNumber() {
        const card = document.querySelector('.balance-card');
        if (!card) return;
        const fullName = card.querySelector('.full-name');
        const acct = card.querySelector('.account-number');
        if (!fullName || !acct) return;
        // Make it really small and keep in one line
        acct.style.fontSize = '9px';
        acct.style.whiteSpace = 'nowrap';
        // Compute vertical alignment to match full name
        const cardRect = card.getBoundingClientRect();
        const fullNameRect = fullName.getBoundingClientRect();
        const acctRect = acct.getBoundingClientRect();
        const top = fullNameRect.top - cardRect.top + (fullNameRect.height - acctRect.height) / 2;
        acct.style.top = `${Math.max(0, Math.round(top))}px`;
    }

    positionAccountNumber();
    window.addEventListener('resize', positionAccountNumber);
    window.addEventListener('load', positionAccountNumber);

    // Page-specific: Withdraw logic
    (function initWithdrawPage() {
        const withdrawPage = document.querySelector('.withdraw-page');
        if (!withdrawPage) return;

        // Conversion: 1 Adspoint = 0.5 Naira
        const RATE = 0.5;
        const adspointInput = document.getElementById('adspoint-input');
        const nairaValue = document.getElementById('naira-value');
        const withdrawBtn = document.getElementById('withdraw-btn');

        function updateConversion() {
            const pts = parseFloat(adspointInput.value || '0');
            const naira = Math.max(0, pts * RATE);
            nairaValue.textContent = naira.toLocaleString();
            withdrawBtn.disabled = !(pts > 0);
        }

        adspointInput && adspointInput.addEventListener('input', updateConversion);
        updateConversion();

        // Simple in-memory bank manager with localStorage persistence
        const bankList = document.getElementById('bank-list');
        const addBankBtn = document.getElementById('add-bank-btn');
        const addForm = document.getElementById('add-bank-form');
        const cancelAddBank = document.getElementById('cancel-add-bank');
        const saveBank = document.getElementById('save-bank');
        const bankNameEl = document.getElementById('bank-name');
        const accountNameEl = document.getElementById('account-name');
        const accountNumberEl = document.getElementById('account-number');

        const STORAGE_KEY = 'adsearns_banks';
        function loadBanks() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
            catch { return []; }
        }
        function saveBanks(banks) { localStorage.setItem(STORAGE_KEY, JSON.stringify(banks)); }

        function renderBanks() {
            const banks = loadBanks();
            bankList.innerHTML = '';
            if (!banks.length) {
                const empty = document.createElement('div');
                empty.className = 'hint';
                empty.textContent = 'No bank added yet. Add a bank to withdraw.';
                bankList.appendChild(empty);
                return;
            }
            banks.forEach((b, idx) => {
                const row = document.createElement('div');
                row.className = 'bank-item';
                row.innerHTML = `
                    <div class="radio">
                        <input type="radio" name="bank" ${b.selected ? 'checked' : ''} />
                    </div>
                    <div class="bank-meta">
                        <div class="bank-name">${b.bankName} - ${b.accountName}</div>
                        <div class="bank-number">${b.accountNumber}</div>
                    </div>
                    <button class="btn bank-remove" title="Remove"><i class="fas fa-trash"></i></button>
                `;
                // select
                const radio = row.querySelector('input[type="radio"]');
                radio.addEventListener('change', () => {
                    const all = loadBanks().map((x, i) => ({...x, selected: i === idx}));
                    saveBanks(all); renderBanks();
                });
                // remove
                const removeBtn = row.querySelector('.bank-remove');
                removeBtn.addEventListener('click', () => {
                    const all = loadBanks();
                    all.splice(idx, 1);
                    saveBanks(all); renderBanks();
                });
                bankList.appendChild(row);
            });
        }

        function toggleAddForm(show) {
            addForm.style.display = show ? 'block' : 'none';
        }

        addBankBtn && addBankBtn.addEventListener('click', () => toggleAddForm(true));
        cancelAddBank && cancelAddBank.addEventListener('click', () => toggleAddForm(false));
        saveBank && saveBank.addEventListener('click', () => {
            const bankName = (bankNameEl.value || '').trim();
            const accountName = (accountNameEl.value || '').trim();
            const accountNumber = (accountNumberEl.value || '').trim();
            if (!bankName || !accountName || !accountNumber) {
                alert('Please fill in all bank details.');
                return;
            }
            const banks = loadBanks();
            banks.push({ bankName, accountName, accountNumber, selected: !banks.length });
            saveBanks(banks);
            bankNameEl.value = accountNameEl.value = accountNumberEl.value = '';
            toggleAddForm(false);
            renderBanks();
        });

        renderBanks();

        // ===== Withdraw history =====
        const TX_STORAGE = 'adsearns_withdrawals';
        const FEE_PTS = 100;
        const historyList = document.getElementById('history-list');
        const seeAllBtn = document.getElementById('see-all-history');
        const modal = document.getElementById('history-modal');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

        function loadTxs() {
            try { return JSON.parse(localStorage.getItem(TX_STORAGE)) || []; }
            catch { return []; }
        }
        function saveTxs(txs) { localStorage.setItem(TX_STORAGE, JSON.stringify(txs)); }
        function seedTxsIfEmpty() {
            const now = Date.now();
            const txs = loadTxs();
            if (txs.length) return;
            const banks = loadBanks();
            const sampleBank = banks.find(b => b.selected) || { bankName: 'Access Bank', accountName: 'Adeyemi Adele', accountNumber: '0123456789' };
            const samples = [
                { id: `AD${now-86400000}`, points: 2500, status: 'complete', bank: sampleBank, createdAt: now-86400000 },
                { id: `AD${now-43200000}`, points: 1500, status: 'submitted', bank: sampleBank, createdAt: now-43200000 },
                { id: `AD${now-21600000}`, points: 900, status: 'requested', bank: sampleBank, createdAt: now-21600000 },
            ];
            saveTxs(samples);
        }

        function formatDate(ts) {
            const d = new Date(ts);
            return d.toLocaleString();
        }

        let showAllHistory = false;
        function renderHistory() {
            seedTxsIfEmpty();
            const txs = loadTxs().sort((a,b)=>b.createdAt-a.createdAt);
            const toShow = showAllHistory ? txs : txs.slice(0,2);
            historyList.innerHTML = '';
            if (!toShow.length) {
                const empty = document.createElement('div');
                empty.className = 'hint';
                empty.textContent = 'No transactions yet.';
                historyList.appendChild(empty);
                return;
            }
            toShow.forEach(tx => {
                const item = document.createElement('div');
                item.className = 'history-item';
                const naira = tx.points * RATE;
                item.innerHTML = `
                    <div class="meta">
                        <div class="title">${tx.id}</div>
                        <div class="sub">${tx.status} • ${formatDate(tx.createdAt)}</div>
                    </div>
                    <div class="amount">${tx.points.toLocaleString()} pts (₦${naira.toLocaleString()})</div>
                `;
                item.addEventListener('click', () => openHistoryModal(tx));
                historyList.appendChild(item);
            });
            if (seeAllBtn) seeAllBtn.textContent = showAllHistory ? 'See less' : 'See all';
        }

        function setStepActive(status) {
            if (!modal) return;
            const steps = Array.from(modal.querySelectorAll('.step'));
            const order = ['requested','submitted','complete'];
            const activeIndex = order.indexOf(status);
            steps.forEach((el, idx) => {
                if (idx <= activeIndex) el.classList.add('active');
                else el.classList.remove('active');
            });
        }

        function openHistoryModal(tx) {
            if (!modal) return;
            // Set steps
            setStepActive(tx.status);
            // Amounts
            const amountPts = tx.points;
            const feePts = FEE_PTS;
            const totalPts = Math.max(0, amountPts - feePts);
            modal.querySelector('#modal-amount-pts').textContent = `${amountPts.toLocaleString()} pts (₦${(amountPts*RATE).toLocaleString()})`;
            modal.querySelector('#modal-fee-pts').textContent = `${feePts.toLocaleString()} pts (₦${(feePts*RATE).toLocaleString()})`;
            modal.querySelector('#modal-total-pts').textContent = `${totalPts.toLocaleString()} pts (₦${(totalPts*RATE).toLocaleString()})`;
            // Details
            modal.querySelector('#modal-txid').textContent = tx.id;
            modal.querySelector('#modal-account').textContent = `${tx.bank.accountName} • ${tx.bank.accountNumber}`;
            modal.querySelector('#modal-bank').textContent = tx.bank.bankName;
            modal.querySelector('#modal-date').textContent = formatDate(tx.createdAt);
            // Copy
            const copyBtn = modal.querySelector('#tx-copy');
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(tx.id).then(()=>{
                    copyBtn.textContent = 'Copied';
                    setTimeout(()=>copyBtn.textContent='Copy', 1200);
                }).catch(()=>alert('Copy failed'));
            };
            // Report issue
            const reportBtn = modal.querySelector('#report-issue');
            reportBtn.onclick = () => {
                const subject = encodeURIComponent(`Withdraw issue - ${tx.id}`);
                const body = encodeURIComponent(`Hi Support,%0D%0A%0D%0AI'd like to report an issue with my withdrawal.%0D%0A%0D%0ATransaction ID: ${tx.id}%0D%0AStatus: ${tx.status}%0D%0ARequested at: ${formatDate(tx.createdAt)}%0D%0AAmount: ${amountPts.toLocaleString()} pts (₦${(amountPts*RATE).toLocaleString()})%0D%0AFee: ${FEE_PTS.toLocaleString()} pts (₦${(FEE_PTS*RATE).toLocaleString()})%0D%0ATotal: ${totalPts.toLocaleString()} pts (₦${(totalPts*RATE).toLocaleString()})%0D%0AAccount: ${tx.bank.accountName} • ${tx.bank.accountNumber}%0D%0ABank: ${tx.bank.bankName}%0D%0A%0D%0ADescription of the issue:%0D%0A`);
                window.location.href = `mailto:support@adsearns.example?subject=${subject}&body=${body}`;
            };
            // Show
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden','false');
        }
        function closeHistoryModal() {
            if (!modal) return;
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden','true');
        }
        modalClose && modalClose.addEventListener('click', closeHistoryModal);
        modalOverlay && modalOverlay.addEventListener('click', closeHistoryModal);
        seeAllBtn && seeAllBtn.addEventListener('click', () => { showAllHistory = !showAllHistory; renderHistory(); });

        renderHistory();

        // Withdraw button behavior: create transaction and refresh history
        withdrawBtn && withdrawBtn.addEventListener('click', () => {
            const pts = parseFloat(adspointInput.value || '0');
            if (!(pts > 0)) return;
            const banks = loadBanks();
            const selected = banks.find(b => b.selected);
            if (!selected) { alert('Please select a bank first.'); return; }
            const txs = loadTxs();
            const id = `AD${Date.now()}`;
            const tx = { id, points: Math.floor(pts), status: 'requested', bank: selected, createdAt: Date.now() };
            txs.push(tx);
            saveTxs(txs);
            adspointInput.value = '';
            updateConversion();
            renderHistory();
            openHistoryModal(tx);
        });
    })();

    console.log('ADSEARNS Dashboard loaded successfully!');
});
