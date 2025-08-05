// Sirtaki Learning Journey - Interactive JavaScript

class SirtakiLearningJourney {
    constructor() {
        this.currentStage = 1;
        this.completedStages = new Set();
        this.currentTempo = 'slow';
        this.isPracticing = false;
        this.practiceTimer = null;
        this.stepTimer = null;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupStageInteractions();
        this.setupTempoControls();
        this.setupPracticeMode();
        this.setupModal();
        this.setupAssessment();
        this.setupSocialSharing();
        this.updateProgress();
        
        // Initialize active navigation
        this.updateActiveNavigation();
        
        // Setup intersection observer for nav updates
        this.setupScrollObserver();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    // Update active navigation
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px 0px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#introduction') {
                link.classList.add('active');
            }
        });
    }

    setupStageInteractions() {
        const stageCards = document.querySelectorAll('.stage-card');
        const stepItems = document.querySelectorAll('.step-item');
        const practiceButtons = document.querySelectorAll('.practice-btn');

        // Step item interactions
        stepItems.forEach(stepItem => {
            stepItem.addEventListener('click', () => {
                // Remove active class from siblings
                const siblingSteps = stepItem.parentElement.querySelectorAll('.step-item');
                siblingSteps.forEach(step => step.classList.remove('active'));
                
                // Add active class to clicked step
                stepItem.classList.add('active');
                
                // Show step demonstration (visual feedback)
                this.demonstrateStep(stepItem);
            });
        });

        // Practice button interactions
        practiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const stage = parseInt(button.dataset.stage);
                this.practiceStage(stage);
            });
        });
    }

    demonstrateStep(stepItem) {
        const stepNumber = stepItem.querySelector('.step-number');
        const originalText = stepNumber.textContent;
        
        // Visual feedback animation
        stepNumber.style.transform = 'scale(1.2)';
        stepNumber.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1)';
            stepNumber.style.background = 'var(--color-primary)';
        }, 300);

        // Add some haptic-like feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    practiceStage(stage) {
        this.currentStage = stage;
        this.completedStages.add(stage);
        this.updateProgress();
        
        // Show success modal
        this.showProgressModal(`Great work! You've practiced Stage ${stage}. Keep building your Sirtaki skills!`);
        
        // Scroll to practice section
        const practiceSection = document.querySelector('#practice');
        if (practiceSection) {
            setTimeout(() => {
                practiceSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1000);
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const totalStages = 4;
        const completedCount = this.completedStages.size;
        const progressPercent = (completedCount / totalStages) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
    }

    setupTempoControls() {
        const tempoButtons = document.querySelectorAll('.tempo-btn');
        
        tempoButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tempo buttons
                tempoButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update current tempo
                this.currentTempo = button.dataset.tempo;
                
                // Update practice if currently practicing
                if (this.isPracticing) {
                    this.updatePracticeSpeed();
                }
            });
        });
    }

    setupPracticeMode() {
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');
        const dancer1 = document.getElementById('dancer1');
        const dancer2 = document.getElementById('dancer2');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startPractice();
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.stopPractice();
            });
        }
    }

    startPractice() {
        this.isPracticing = true;
        const dancer1 = document.getElementById('dancer1');
        const dancer2 = document.getElementById('dancer2');
        
        // Add dancing animation class
        if (dancer1) dancer1.classList.add('dancing');
        if (dancer2) dancer2.classList.add('dancing');
        
        // Update button states
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');
        
        if (startBtn) {
            startBtn.textContent = 'Practicing...';
            startBtn.disabled = true;
        }
        if (stopBtn) {
            stopBtn.disabled = false;
        }
        
        // Start practice timer based on current tempo
        this.startPracticeTimer();
        
        // Show encouraging message
        this.showToast('Practice started! Follow the rhythm and enjoy dancing!');
    }

    stopPractice() {
        this.isPracticing = false;
        const dancer1 = document.getElementById('dancer1');
        const dancer2 = document.getElementById('dancer2');
        
        // Remove dancing animation class
        if (dancer1) dancer1.classList.remove('dancing');
        if (dancer2) dancer2.classList.remove('dancing');
        
        // Update button states
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');
        
        if (startBtn) {
            startBtn.textContent = 'Start Practice';
            startBtn.disabled = false;
        }
        if (stopBtn) {
            stopBtn.disabled = true;
        }
        
        // Clear timers
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
            this.practiceTimer = null;
        }
        if (this.stepTimer) {
            clearInterval(this.stepTimer);
            this.stepTimer = null;
        }
    }

    startPracticeTimer() {
        const tempoSpeeds = {
            'slow': 1000,    // 60 BPM - 1 second per beat
            'medium': 667,   // 90 BPM - 0.667 seconds per beat
            'fast': 500      // 120 BPM - 0.5 seconds per beat
        };
        
        const interval = tempoSpeeds[this.currentTempo] || 1000;
        
        this.practiceTimer = setInterval(() => {
            if (this.isPracticing) {
                // Add visual beat indicator
                this.showBeat();
            }
        }, interval);
    }

    updatePracticeSpeed() {
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
            this.startPracticeTimer();
        }
    }

    showBeat() {
        const floorGrid = document.querySelector('.floor-grid');
        if (floorGrid) {
            floorGrid.style.background = 'var(--color-bg-8)';
            setTimeout(() => {
                floorGrid.style.background = 'var(--color-bg-1)';
            }, 100);
        }
    }

    setupModal() {
        const modal = document.getElementById('progress-modal');
        const closeBtn = modal?.querySelector('.modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideModal();
            });
        }
        
        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
    }

    showProgressModal(message) {
        const modal = document.getElementById('progress-modal');
        const messageElement = document.getElementById('progress-message');
        
        if (modal && messageElement) {
            messageElement.textContent = message;
            modal.classList.remove('hidden');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                this.hideModal();
            }, 3000);
        }
    }

    hideModal() {
        const modal = document.getElementById('progress-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    setupAssessment() {
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateAssessmentProgress();
            });
        });
    }

    updateAssessmentProgress() {
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
        const checkedCount = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked').length;
        const totalCount = checkboxes.length;
        
        if (checkedCount === totalCount) {
            this.showProgressModal('🎉 Excellent! You\'ve mastered all the key elements of Sirtaki dancing!');
        } else if (checkedCount >= totalCount * 0.8) {
            this.showToast('Great progress! You\'re almost there!');
        }
    }

    setupSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                this.shareProgress(platform);
            });
        });
    }

    shareProgress(platform) {
        const completedStages = this.completedStages.size;
        const totalStages = 4;
        const progressPercent = Math.round((completedStages / totalStages) * 100);
        
        const shareText = `I'm learning the Sirtaki dance! ${progressPercent}% complete on my Greek dance journey. 🇬🇷💃 #Sirtaki #GreekDance #LearningJourney`;
        const shareUrl = window.location.href;
        
        if (platform === 'twitter') {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        } else {
            // Generic sharing
            if (navigator.share) {
                navigator.share({
                    title: 'My Sirtaki Learning Journey',
                    text: shareText,
                    url: shareUrl
                }).catch(console.error);
            } else {
                // Fallback - copy to clipboard
                this.copyToClipboard(shareText + ' ' + shareUrl);
                this.showToast('Progress copied to clipboard!');
            }
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(console.error);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showToast(message) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add toast styles
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'var(--color-success)',
            color: 'var(--color-btn-primary-text)',
            padding: 'var(--space-12) var(--space-16)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '1001',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all var(--duration-normal) var(--ease-standard)'
        });
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Space bar to start/stop practice
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                if (this.isPracticing) {
                    this.stopPractice();
                } else {
                    this.startPractice();
                }
            }
            
            // Number keys to jump to stages
            if (e.code >= 'Digit1' && e.code <= 'Digit4') {
                const stageNumber = parseInt(e.code.slice(-1));
                const stageElement = document.querySelector(`[data-stage="${stageNumber}"]`);
                if (stageElement) {
                    stageElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Escape to close modal
            if (e.code === 'Escape') {
                this.hideModal();
            }
        });
    }

    // Initialize accessibility features
    setupAccessibility() {
        // Add ARIA labels and roles where needed
        const practiceButtons = document.querySelectorAll('.practice-btn');
        practiceButtons.forEach((button, index) => {
            button.setAttribute('aria-label', `Practice stage ${index + 1} dance steps`);
        });
        
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((step, index) => {
            step.setAttribute('role', 'button');
            step.setAttribute('tabindex', '0');
            step.setAttribute('aria-label', `Dance step ${index + 1}`);
            
            // Add keyboard support
            step.addEventListener('keydown', (e) => {
                if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    step.click();
                }
            });
        });
        
        // Announce progress changes to screen readers
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.setAttribute('role', 'progressbar');
            progressFill.setAttribute('aria-label', 'Learning progress');
        }
    }

    // Update progress bar accessibility
    updateProgressAccessibility() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const completedStages = this.completedStages.size;
            const totalStages = 4;
            const progressPercent = Math.round((completedStages / totalStages) * 100);
            
            progressFill.setAttribute('aria-valuenow', progressPercent);
            progressFill.setAttribute('aria-valuemin', '0');
            progressFill.setAttribute('aria-valuemax', '100');
            progressFill.setAttribute('aria-valuetext', `${progressPercent} percent complete`);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SirtakiLearningJourney();
    
    // Setup keyboard shortcuts and accessibility
    app.setupKeyboardShortcuts();
    app.setupAccessibility();
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('🎭 Sirtaki Learning Journey initialized! Ready to dance! 💃🕺');
});