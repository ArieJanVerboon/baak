class TabPresentationController {
    constructor() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.panels = document.querySelectorAll('.tab-panel');
        this.currentTabIndex = 0;
        this.totalTabs = this.tabs.length;
        
        // Touch/swipe variables
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        this.isSwipeEnabled = true;
        
        // Animation and transition control
        this.isTransitioning = false;
        this.transitionDuration = 250;
        
        this.init();
    }
    
    init() {
        // Ensure first tab is active
        this.setActiveTab(0);
        
        // Add event listeners
        this.addEventListeners();
        
        // Initialize accessibility features
        this.initAccessibility();
        
        // Announce initial state
        this.announceTabChange();
        
        console.log('Nederlandse copyright presentatie geladen - Gebruik Tab/pijltjestoetsen of swipe om te navigeren');
    }
    
    addEventListeners() {
        // Tab button clicks
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToTab(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch/swipe navigation for mobile
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse navigation for desktop
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Focus management
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('focus', () => this.handleTabFocus(index));
        });
        
        // Prevent context menu on long press
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.tab-panel')) {
                e.preventDefault();
            }
        });
        
        // Handle resize for responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateResponsiveFeatures();
            }, 150);
        });
        
        // Handle visibility change to pause/resume features
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isSwipeEnabled = false;
            } else {
                this.isSwipeEnabled = true;
            }
        });
    }
    
    handleKeyPress(e) {
        // Don't interfere if user is typing in form elements
        if (e.target.matches('input, textarea, select')) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                this.nextTab();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.previousTab();
                break;
            case 'Home':
                e.preventDefault();
                this.goToTab(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToTab(this.totalTabs - 1);
                break;
            case 'Tab':
                // Let natural tab behavior work, but ensure proper tab focus
                if (!e.shiftKey && document.activeElement.closest('.tab-btn')) {
                    const currentTabIndex = Array.from(this.tabs).indexOf(document.activeElement);
                    if (currentTabIndex < this.totalTabs - 1) {
                        e.preventDefault();
                        this.tabs[currentTabIndex + 1].focus();
                    }
                } else if (e.shiftKey && document.activeElement.closest('.tab-btn')) {
                    const currentTabIndex = Array.from(this.tabs).indexOf(document.activeElement);
                    if (currentTabIndex > 0) {
                        e.preventDefault();
                        this.tabs[currentTabIndex - 1].focus();
                    }
                }
                break;
            case 'Enter':
            case ' ':
                if (document.activeElement.closest('.tab-btn')) {
                    e.preventDefault();
                    const tabIndex = Array.from(this.tabs).indexOf(document.activeElement);
                    this.goToTab(tabIndex);
                }
                break;
        }
    }
    
    handleTouchStart(e) {
        if (!this.isSwipeEnabled || this.isTransitioning) return;
        
        // Only handle touches on the tab content area
        if (!e.target.closest('.tab-panel')) return;
        
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartTime = Date.now();
    }
    
    handleTouchMove(e) {
        if (!this.isSwipeEnabled || this.isTransitioning) return;
        
        // Prevent vertical scrolling during horizontal swipe
        if (this.touchStartX && e.target.closest('.tab-panel')) {
            const touchMoveX = e.changedTouches[0].clientX;
            const deltaX = Math.abs(touchMoveX - this.touchStartX);
            const deltaY = Math.abs(e.changedTouches[0].clientY - (e.changedTouches[0].clientY || 0));
            
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault();
            }
        }
    }
    
    handleTouchEnd(e) {
        if (!this.isSwipeEnabled || this.isTransitioning) return;
        if (!this.touchStartX) return;
        
        this.touchEndX = e.changedTouches[0].clientX;
        const touchDuration = Date.now() - this.touchStartTime;
        
        // Only process quick swipes (less than 300ms)
        if (touchDuration < 300) {
            this.handleSwipe();
        }
        
        // Reset touch tracking
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchStartTime = 0;
    }
    
    handleMouseDown(e) {
        // Only handle if clicking on tab content, not navigation
        if (e.target.closest('.tabs-nav')) return;
        
        this.mouseStartX = e.clientX;
        this.mouseStartTime = Date.now();
        this.isMouseDown = true;
    }
    
    handleMouseUp(e) {
        if (!this.isMouseDown) return;
        
        this.isMouseDown = false;
        this.mouseEndX = e.clientX;
        const mouseDuration = Date.now() - this.mouseStartTime;
        
        // Only process quick drags (less than 200ms) to avoid interfering with text selection
        if (mouseDuration < 200) {
            const distance = Math.abs(this.mouseEndX - this.mouseStartX);
            
            if (distance > this.minSwipeDistance) {
                if (this.mouseEndX < this.mouseStartX) {
                    this.nextTab();
                } else {
                    this.previousTab();
                }
            }
        }
        
        // Reset mouse tracking
        this.mouseStartX = 0;
        this.mouseEndX = 0;
        this.mouseStartTime = 0;
    }
    
    handleSwipe() {
        const distance = Math.abs(this.touchEndX - this.touchStartX);
        
        if (distance > this.minSwipeDistance) {
            if (this.touchEndX < this.touchStartX) {
                // Swipe left - next tab
                this.nextTab();
            } else {
                // Swipe right - previous tab
                this.previousTab();
            }
        }
    }
    
    handleTabFocus(index) {
        // When a tab receives focus, make it active
        this.goToTab(index);
    }
    
    nextTab() {
        if (this.currentTabIndex < this.totalTabs - 1) {
            this.goToTab(this.currentTabIndex + 1);
        } else {
            // Loop to first tab
            this.goToTab(0);
        }
    }
    
    previousTab() {
        if (this.currentTabIndex > 0) {
            this.goToTab(this.currentTabIndex - 1);
        } else {
            // Loop to last tab
            this.goToTab(this.totalTabs - 1);
        }
    }
    
    goToTab(index) {
        if (index < 0 || index >= this.totalTabs || index === this.currentTabIndex || this.isTransitioning) {
            return;
        }
        
        this.isTransitioning = true;
        this.setActiveTab(index);
        this.scrollTabIntoView(index);
        this.announceTabChange();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.transitionDuration);
    }
    
    setActiveTab(index) {
        // Update tab states
        this.tabs.forEach((tab, i) => {
            const isActive = i === index;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive.toString());
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        
        // Update panel states
        this.panels.forEach((panel, i) => {
            const isActive = i === index;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', (!isActive).toString());
        });
        
        this.currentTabIndex = index;
        
        // Focus management
        if (document.activeElement !== this.tabs[index]) {
            this.tabs[index].focus();
        }
        
        // Scroll to top of content when switching tabs
        const activePanel = this.panels[index];
        if (activePanel) {
            activePanel.scrollTop = 0;
        }
    }
    
    scrollTabIntoView(index) {
        const tab = this.tabs[index];
        const tabsWrapper = document.querySelector('.tabs-wrapper');
        
        if (tab && tabsWrapper) {
            // Calculate if tab is visible
            const tabRect = tab.getBoundingClientRect();
            const wrapperRect = tabsWrapper.getBoundingClientRect();
            
            // If tab is not fully visible, scroll it into view
            if (tabRect.left < wrapperRect.left || tabRect.right > wrapperRect.right) {
                tab.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }
    
    announceTabChange() {
        // Create or update live region for screen readers
        let announcer = document.getElementById('tab-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'tab-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
        
        const currentTab = this.tabs[this.currentTabIndex];
        const tabTitle = currentTab.querySelector('.tab-title')?.textContent || 
                        currentTab.textContent.replace(/[\n\r\s]+/g, ' ').trim();
        
        announcer.textContent = `Tabblad ${this.currentTabIndex + 1} van ${this.totalTabs}: ${tabTitle}`;
    }
    
    initAccessibility() {
        // Set up proper ARIA attributes
        this.tabs.forEach((tab, index) => {
            const panelId = `tab-${tab.dataset.tab}`;
            const buttonId = `tab-button-${tab.dataset.tab}`;
            
            tab.setAttribute('id', buttonId);
            tab.setAttribute('aria-controls', panelId);
            tab.setAttribute('role', 'tab');
            
            // Set initial states
            const isActive = index === this.currentTabIndex;
            tab.setAttribute('aria-selected', isActive.toString());
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        
        this.panels.forEach((panel, index) => {
            const tabId = this.tabs[index].dataset.tab;
            const panelId = `tab-${tabId}`;
            const buttonId = `tab-button-${tabId}`;
            
            panel.setAttribute('id', panelId);
            panel.setAttribute('aria-labelledby', buttonId);
            panel.setAttribute('role', 'tabpanel');
            
            // Set initial states
            const isActive = index === this.currentTabIndex;
            panel.setAttribute('aria-hidden', (!isActive).toString());
        });
        
        // Add keyboard navigation hints
        this.addKeyboardHints();
    }
    
    addKeyboardHints() {
        const hint = document.createElement('div');
        hint.className = 'sr-only';
        hint.setAttribute('aria-hidden', 'true');
        hint.textContent = 'Gebruik pijltjestoetsen om tussen tabs te navigeren, Enter of spatiebalk om te activeren';
        document.querySelector('.tabs-nav').appendChild(hint);
    }
    
    updateResponsiveFeatures() {
        // Update swipe sensitivity based on screen size
        const isMobile = window.innerWidth < 768;
        this.minSwipeDistance = isMobile ? 30 : 50;
        
        // Ensure current tab is visible after resize
        this.scrollTabIntoView(this.currentTabIndex);
    }
    
    // Public methods for external control
    getCurrentTab() {
        return {
            index: this.currentTabIndex,
            total: this.totalTabs,
            id: this.tabs[this.currentTabIndex].dataset.tab,
            title: this.tabs[this.currentTabIndex].querySelector('.tab-title')?.textContent || ''
        };
    }
    
    getTabByName(tabName) {
        const tabIndex = Array.from(this.tabs).findIndex(tab => tab.dataset.tab === tabName);
        return tabIndex >= 0 ? tabIndex : null;
    }
    
    goToTabByName(tabName) {
        const tabIndex = this.getTabByName(tabName);
        if (tabIndex !== null) {
            this.goToTab(tabIndex);
            return true;
        }
        return false;
    }
}

// Utility functions for enhanced functionality
function addFullscreenSupport() {
    if (document.documentElement.requestFullscreen) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.innerHTML = '⛶';
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1001;
            width: 2.5rem;
            height: 2.5rem;
            border: none;
            border-radius: 50%;
            background: var(--academic-navy);
            color: white;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: var(--shadow-md);
        `;
        fullscreenBtn.setAttribute('aria-label', 'Volledig scherm inschakelen');
        fullscreenBtn.setAttribute('title', 'Volledig scherm (F11)');
        
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(() => {
                    fullscreenBtn.innerHTML = '⛷';
                    fullscreenBtn.setAttribute('aria-label', 'Volledig scherm uitschakelen');
                    fullscreenBtn.setAttribute('title', 'Volledig scherm uitschakelen (Esc)');
                });
            } else {
                document.exitFullscreen().then(() => {
                    fullscreenBtn.innerHTML = '⛶';
                    fullscreenBtn.setAttribute('aria-label', 'Volledig scherm inschakelen');
                    fullscreenBtn.setAttribute('title', 'Volledig scherm (F11)');
                });
            }
        });
        
        fullscreenBtn.addEventListener('mouseover', () => {
            fullscreenBtn.style.transform = 'scale(1.1)';
            fullscreenBtn.style.background = 'var(--academic-dark-navy)';
        });
        
        fullscreenBtn.addEventListener('mouseout', () => {
            fullscreenBtn.style.transform = 'scale(1)';
            fullscreenBtn.style.background = 'var(--academic-navy)';
        });
        
        document.body.appendChild(fullscreenBtn);
        
        // Handle F11 key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11') {
                e.preventDefault();
                fullscreenBtn.click();
            }
        });
    }
}

function addPrintSupport() {
    // Add print button
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 4rem;
        z-index: 1001;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        border-radius: 50%;
        background: var(--academic-gold);
        color: var(--academic-navy);
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: var(--shadow-md);
    `;
    printBtn.setAttribute('aria-label', 'Presentatie afdrukken');
    printBtn.setAttribute('title', 'Afdrukken (Ctrl+P)');
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseover', () => {
        printBtn.style.transform = 'scale(1.1)';
        printBtn.style.background = 'var(--academic-light-gold)';
    });
    
    printBtn.addEventListener('mouseout', () => {
        printBtn.style.transform = 'scale(1)';
        printBtn.style.background = 'var(--academic-gold)';
    });
    
    document.body.appendChild(printBtn);
    
    // Handle Ctrl+P
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
}

function addProgressIndicator() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-indicator';
    progressContainer.style.cssText = `
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-surface);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-border);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        z-index: 1000;
    `;
    
    const updateProgress = (current, total) => {
        progressContainer.textContent = `${current} / ${total}`;
    };
    
    document.body.appendChild(progressContainer);
    return updateProgress;
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the tab presentation controller
    const presentation = new TabPresentationController();
    
    // Add enhancement features
    addFullscreenSupport();
    addPrintSupport();
    const updateProgress = addProgressIndicator();
    
    // Update progress indicator when tabs change
    const observer = new MutationObserver(() => {
        const current = presentation.getCurrentTab();
        updateProgress(current.index + 1, current.total);
    });
    
    observer.observe(document.querySelector('.tabs-nav'), {
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-selected']
    });
    
    // Initial progress update
    const current = presentation.getCurrentTab();
    updateProgress(current.index + 1, current.total);
    
    // Make presentation controller globally accessible
    window.presentation = presentation;
    
    // Add URL hash support for deep linking
    const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            presentation.goToTabByName(hash);
        }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash
    
    // Update hash when tabs change
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            window.location.hash = tab.dataset.tab;
        });
    });
    
    // Prevent default behaviors that might interfere
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.tab-panel') && e.touches.length === 1) {
            // Allow vertical scrolling but prevent horizontal interference
            const touch = e.touches[0];
            const startY = touch.clientY;
            if (presentation.touchStartY && Math.abs(startY - presentation.touchStartY) < 10) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // Add service worker for offline support if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service worker registratie gefaald:', err);
        });
    }
    
    console.log('Nederlandse auteursrecht presentatie succesvol geladen!');
    console.log('Beschikbare commando\'s:');
    console.log('- Pijltjestoetsen: navigeren tussen tabs');
    console.log('- Home/End: naar eerste/laatste tab');
    console.log('- F11: volledig scherm');
    console.log('- Ctrl+P: afdrukken');
    console.log('- Swipe/drag: navigeren op mobiel/tablet');
});

// Handle page unload for cleanup
window.addEventListener('beforeunload', function() {
    // Clean up any intervals, timeouts, or event listeners if needed
    console.log('Presentatie wordt afgesloten...');
});