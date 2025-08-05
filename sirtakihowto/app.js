// Enhanced Sirtaki Learning Journey with Music Integration

class SirtakiMusicLearning {
    constructor() {
        this.currentStage = 1;
        this.completedStages = new Set();
        this.currentTempo = 'slow';
        this.isPracticing = false;
        this.isPlayingMusic = false;
        this.practiceTimer = null;
        this.stepTimer = null;
        this.beatTimer = null;
        this.practiceStartTime = null;
        
        // Audio and timing properties
        this.audio = null;
        this.currentBeat = 1;
        this.currentPhase = 'slow';
        this.metronomeOnly = false;
        this.loopMode = 'none';
        this.playbackRate = 1;
        
        // Audio timing data from the provided JSON
        this.audioTiming = {
            totalDuration: 120,
            phases: [
                {name: "Slow Hasapiko", startTime: 0, endTime: 40, bpm: 60, color: "#3B82F6", description: "Basic steps practice"},
                {name: "Medium Tempo", startTime: 40, endTime: 80, bpm: "60-100", color: "#F59E0B", description: "Transition and variations"},
                {name: "Fast Hasaposerviko", startTime: 80, endTime: 120, bpm: "100-130", color: "#EF4444", description: "Advanced moves and kicks"}
            ]
        };
        
        this.beatPatterns = {
            hasapiko: {
                timeSignature: "4/4",
                strongBeats: [1, 3],
                accentPattern: ["STRONG", "weak", "MEDIUM", "weak"],
                stepPattern: ["RIGHT", "BEHIND", "RIGHT", "CLOSE"]
            }
        };
        
        this.init();
    }

    init() {
        this.setupAudio();
        this.setupNavigation();
        this.setupStageInteractions();
        this.setupTempoControls();
        this.setupPracticeMode();
        this.setupModal();
        this.setupAssessment();
        this.setupSocialSharing();
        this.setupMusicControls();
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
        this.updateProgress();
        this.updateActiveNavigation();
        this.setupScrollObserver();
        
        console.log('🎭 Enhanced Sirtaki Learning Journey with Music initialized! 🎵💃🕺');
    }

    setupAudio() {
        this.audio = document.getElementById('practice-audio');
        if (!this.audio) {
            console.error('Audio element not found');
            return;
        }
        
        // Set up audio event listeners
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateTimeDisplay();
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.handleTimeUpdate();
        });
        
        this.audio.addEventListener('ended', () => {
            this.handleAudioEnd();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showToast('Audio loading failed. Please refresh the page.');
        });
        
        // Set initial volume
        this.audio.volume = 0.7;
    }

    setupMusicControls() {
        // Play/Pause button
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }
        
        // Volume control
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                if (this.audio) {
                    this.audio.volume = e.target.value / 100;
                }
            });
        }
        
        // Progress slider
        const progressSlider = document.getElementById('progress-slider');
        if (progressSlider) {
            progressSlider.addEventListener('input', (e) => {
                if (this.audio) {
                    this.audio.currentTime = e.target.value;
                }
            });
        }
        
        // Speed selector
        const speedSelector = document.getElementById('speed-selector');
        if (speedSelector) {
            speedSelector.addEventListener('change', (e) => {
                this.setPlaybackRate(parseFloat(e.target.value));
            });
        }
        
        // Loop selector
        const loopSelector = document.getElementById('loop-selector');
        if (loopSelector) {
            loopSelector.addEventListener('change', (e) => {
                this.setLoopMode(e.target.value);
            });
        }
        
        // Metronome only button
        const metronomeBtn = document.getElementById('metronome-only');
        if (metronomeBtn) {
            metronomeBtn.addEventListener('click', () => {
                this.toggleMetronomeOnly();
            });
        }
        
        // Phase markers
        const phaseMarkers = document.querySelectorAll('.phase-marker');
        phaseMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const phase = marker.dataset.phase;
                this.jumpToPhase(phase);
            });
        });
        
        // Practice with music buttons
        const practiceWithMusicBtns = document.querySelectorAll('.practice-with-music-btn');
        practiceWithMusicBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = parseInt(btn.dataset.stage);
                const startTime = parseInt(btn.dataset.startTime);
                const section = btn.dataset.section;
                this.practiceWithMusic(stage, startTime, section);
            });
        });
    }

    togglePlayPause() {
        if (!this.audio) return;
        
        if (this.isPlayingMusic) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    playMusic() {
        if (!this.audio) return;
        
        this.audio.muted = false;
        this.audio.play().then(() => {
            this.isPlayingMusic = true;
            this.updatePlayButton();
            this.startBeatTracking();
            this.showToast('🎵 Music started! Follow the rhythm!');
        }).catch(error => {
            console.error('Play error:', error);
            this.showToast('Unable to play audio. Please check your browser settings.');
        });
    }

    pauseMusic() {
        if (!this.audio) return;
        
        this.audio.pause();
        this.isPlayingMusic = false;
        this.updatePlayButton();
        this.stopBeatTracking();
    }

    updatePlayButton() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playIcon = playPauseBtn?.querySelector('.play-icon');
        const btnText = playPauseBtn?.querySelector('.btn-text');
        
        if (playIcon && btnText) {
            if (this.isPlayingMusic) {
                playIcon.textContent = '⏸️';
                btnText.textContent = 'Pause';
            } else {
                playIcon.textContent = '▶️';
                btnText.textContent = 'Play';
            }
        }
    }

    handleTimeUpdate() {
        if (!this.audio) return;
        
        this.updateTimeDisplay();
        this.updateProgressSlider();
        this.updatePhase();
        this.handleLooping();
    }

    updateTimeDisplay() {
        if (!this.audio) return;
        
        const currentTime = document.getElementById('current-time');
        const totalTime = document.getElementById('total-time');
        
        if (currentTime) {
            currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
        
        if (totalTime) {
            totalTime.textContent = this.formatTime(this.audio.duration || 120);
        }
    }

    updateProgressSlider() {
        if (!this.audio) return;
        
        const progressSlider = document.getElementById('progress-slider');
        if (progressSlider) {
            progressSlider.value = this.audio.currentTime;
        }
    }

    updatePhase() {
        if (!this.audio) return;
        
        const currentTime = this.audio.currentTime;
        let newPhase = 'slow';
        let bpmDisplay = '60 BPM - Slow Hasapiko';
        
        if (currentTime >= 80) {
            newPhase = 'fast';
            bpmDisplay = '100-130 BPM - Fast Hasaposerviko';
        } else if (currentTime >= 40) {
            newPhase = 'medium';
            bpmDisplay = '60-100 BPM - Medium Tempo';
        }
        
        if (this.currentPhase !== newPhase) {
            this.currentPhase = newPhase;
            this.updateTempoDisplay(bpmDisplay);
            this.updateTempoZone(newPhase);
        }
    }

    updateTempoDisplay(text) {
        const tempoDisplay = document.getElementById('tempo-display');
        if (tempoDisplay) {
            tempoDisplay.textContent = text;
        }
    }

    updateTempoZone(phase) {
        // Create or update tempo zone indicator
        let tempoZone = document.querySelector('.tempo-zone');
        if (!tempoZone) {
            tempoZone = document.createElement('div');
            tempoZone.className = 'tempo-zone';
            document.body.appendChild(tempoZone);
        }
        
        tempoZone.className = `tempo-zone ${phase}`;
    }

    startBeatTracking() {
        this.stopBeatTracking(); // Clear any existing timer
        
        // Calculate beat interval based on current phase
        let bpm = 60;
        if (this.currentPhase === 'medium') {
            bpm = 80; // Average of 60-100
        } else if (this.currentPhase === 'fast') {
            bpm = 115; // Average of 100-130
        }
        
        const beatInterval = (60 / bpm) * 1000 / this.playbackRate;
        
        this.beatTimer = setInterval(() => {
            this.processBeat();
        }, beatInterval);
    }

    stopBeatTracking() {
        if (this.beatTimer) {
            clearInterval(this.beatTimer);
            this.beatTimer = null;
        }
    }

    processBeat() {
        // Update beat counter
        this.updateBeatIndicator();
        this.highlightCurrentStep();
        this.animateDancers();
        
        // Increment beat
        this.currentBeat = (this.currentBeat % 4) + 1;
    }

    updateBeatIndicator() {
        const beatIndicator = document.getElementById('beat-indicator');
        const beatNumber = document.getElementById('beat-number');
        
        if (beatIndicator && beatNumber) {
            // Remove all classes
            beatIndicator.classList.remove('active', 'strong', 'medium', 'weak');
            
            // Determine beat type
            let beatType = 'weak';
            if (this.currentBeat === 1) {
                beatType = 'strong';
            } else if (this.currentBeat === 3) {
                beatType = 'medium';
            }
            
            // Add appropriate classes
            beatIndicator.classList.add('active', beatType);
            beatNumber.textContent = this.currentBeat;
            
            // Remove active class after animation
            setTimeout(() => {
                beatIndicator.classList.remove('active');
            }, 200);
        }
    }

    highlightCurrentStep() {
        // Find active stage and highlight corresponding step
        const activeStage = document.querySelector('.stage-card.practicing');
        if (!activeStage) return;
        
        const stepItems = activeStage.querySelectorAll('.step-item');
        stepItems.forEach(step => {
            step.classList.remove('beat-active', 'strong', 'medium', 'weak');
        });
        
        const currentStepIndex = (this.currentBeat - 1) % stepItems.length;
        const currentStep = stepItems[currentStepIndex];
        
        if (currentStep) {
            let beatType = 'weak';
            if (this.currentBeat === 1) {
                beatType = 'strong';
            } else if (this.currentBeat === 3) {
                beatType = 'medium';
            }
            
            currentStep.classList.add('beat-active', beatType);
        }
    }

    animateDancers() {
        const beatPulses = document.querySelectorAll('.beat-pulse');
        beatPulses.forEach(pulse => {
            pulse.classList.remove('active', 'strong', 'medium', 'weak');
            
            let beatType = 'weak';
            if (this.currentBeat === 1) {
                beatType = 'strong';
            } else if (this.currentBeat === 3) {
                beatType = 'medium';
            }
            
            pulse.classList.add('active', beatType);
            
            setTimeout(() => {
                pulse.classList.remove('active');
            }, 300);
        });
    }

    setPlaybackRate(rate) {
        if (this.audio) {
            this.audio.playbackRate = rate;
            this.playbackRate = rate;
            
            // Restart beat tracking with new rate
            if (this.isPlayingMusic) {
                this.startBeatTracking();
            }
            
            this.showToast(`Playback speed: ${rate}x`);
        }
    }

    setLoopMode(mode) {
        this.loopMode = mode;
        this.showToast(`Loop mode: ${mode}`);
    }

    handleLooping() {
        if (!this.audio || this.loopMode === 'none') return;
        
        const currentTime = this.audio.currentTime;
        
        if (this.loopMode === 'section') {
            // Loop current section
            if (this.currentPhase === 'slow' && currentTime >= 40) {
                this.audio.currentTime = 0;
            } else if (this.currentPhase === 'medium' && currentTime >= 80) {
                this.audio.currentTime = 40;
            }
        } else if (this.loopMode === '4beats') {
            // 4-beat loop (approximately 4 seconds at 60 BPM)
            const loopDuration = 4;
            const loopStart = Math.floor(currentTime / loopDuration) * loopDuration;
            if (currentTime >= loopStart + loopDuration) {
                this.audio.currentTime = loopStart;
            }
        }
        // Add more loop modes as needed
    }

    jumpToPhase(phase) {
        if (!this.audio) return;
        
        let targetTime = 0;
        if (phase === 'medium') {
            targetTime = 40;
        } else if (phase === 'fast') {
            targetTime = 80;
        }
        
        this.audio.currentTime = targetTime;
        this.showToast(`Jumped to ${phase} section`);
    }

    toggleMetronomeOnly() {
        this.metronomeOnly = !this.metronomeOnly;
        const btn = document.getElementById('metronome-only');
        
        if (this.metronomeOnly) {
            if (this.audio) {
                this.audio.volume = 0;
            }
            btn?.classList.add('active');
            this.showToast('Metronome only mode enabled');
        } else {
            if (this.audio) {
                const volumeSlider = document.getElementById('volume-slider');
                this.audio.volume = volumeSlider ? volumeSlider.value / 100 : 0.7;
            }
            btn?.classList.remove('active');
            this.showToast('Full music mode enabled');
        }
    }

    practiceWithMusic(stage, startTime, section) {
        // Mark stage as practicing
        document.querySelectorAll('.stage-card').forEach(card => {
            card.classList.remove('practicing');
        });
        
        const stageCard = document.querySelector(`.stage-card[data-stage="${stage}"]`);
        if (stageCard) {
            stageCard.classList.add('practicing');
        }
        
        // Jump to appropriate time and start music
        if (this.audio) {
            this.audio.currentTime = startTime;
            this.playMusic();
        }
        
        // Update current stage and show success
        this.currentStage = stage;
        this.completedStages.add(stage);
        this.updateProgress();
        
        this.showToast(`🎵 Practicing Stage ${stage} with music! Follow the beat!`);
        
        // Scroll to the music player if not visible
        const musicPlayer = document.querySelector('.music-player-section');
        if (musicPlayer) {
            musicPlayer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    handleAudioEnd() {
        this.isPlayingMusic = false;
        this.updatePlayButton();
        this.stopBeatTracking();
        this.currentBeat = 1;
        this.showToast('🎉 Practice session complete! Great work!');
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Enhanced keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't interfere if user is typing in a form field
            if (e.target.matches('input, textarea, select')) return;
            
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (this.audio) {
                        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (this.audio) {
                        this.audio.currentTime = Math.min(this.audio.duration || 120, this.audio.currentTime + 10);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.adjustVolume(0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.adjustVolume(-0.1);
                    break;
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                    e.preventDefault();
                    const stageNumber = parseInt(e.code.slice(-1));
                    this.focusStage(stageNumber);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.toggleMetronomeOnly();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.hideModal();
                    break;
            }
        });
        
        // Show keyboard shortcuts on first visit
        this.showKeyboardShortcuts();
    }

    adjustVolume(delta) {
        if (!this.audio) return;
        
        const newVolume = Math.max(0, Math.min(1, this.audio.volume + delta));
        this.audio.volume = newVolume;
        
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.value = newVolume * 100;
        }
        
        this.showToast(`Volume: ${Math.round(newVolume * 100)}%`);
    }

    focusStage(stageNumber) {
        const stageElement = document.querySelector(`[data-stage="${stageNumber}"]`);
        if (stageElement) {
            stageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            stageElement.style.outline = '3px solid var(--color-primary)';
            setTimeout(() => {
                stageElement.style.outline = '';
            }, 2000);
        }
    }

    showKeyboardShortcuts() {
        // Only show on first visit
        if (localStorage.getItem('sirtaki-shortcuts-shown')) return;
        
        const shortcuts = document.createElement('div');
        shortcuts.className = 'keyboard-shortcuts';
        shortcuts.innerHTML = `
            <h4>⌨️ Keyboard Shortcuts</h4>
            <ul class="shortcut-list">
                <li><span class="shortcut-key">Space</span><span>Play/Pause</span></li>
                <li><span class="shortcut-key">←/→</span><span>Rewind/Forward</span></li>
                <li><span class="shortcut-key">↑/↓</span><span>Volume</span></li>
                <li><span class="shortcut-key">1-4</span><span>Jump to Stage</span></li>
                <li><span class="shortcut-key">M</span><span>Metronome Mode</span></li>
            </ul>
        `;
        
        document.body.appendChild(shortcuts);
        
        setTimeout(() => {
            shortcuts.classList.add('visible');
        }, 1000);
        
        setTimeout(() => {
            shortcuts.classList.remove('visible');
            setTimeout(() => {
                if (shortcuts.parentNode) {
                    shortcuts.parentNode.removeChild(shortcuts);
                }
            }, 300);
        }, 5000);
        
        localStorage.setItem('sirtaki-shortcuts-shown', 'true');
    }

    // All the existing methods from the previous version
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
        const stepItems = document.querySelectorAll('.step-item');
        const practiceButtons = document.querySelectorAll('.practice-btn');

        stepItems.forEach(stepItem => {
            stepItem.addEventListener('click', () => {
                const siblingSteps = stepItem.parentElement.querySelectorAll('.step-item');
                siblingSteps.forEach(step => step.classList.remove('active'));
                
                stepItem.classList.add('active');
                this.demonstrateStep(stepItem);
            });
        });

        practiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const stage = parseInt(button.dataset.stage);
                this.practiceStage(stage);
            });
        });
    }

    demonstrateStep(stepItem) {
        const stepNumber = stepItem.querySelector('.step-number');
        
        stepNumber.style.transform = 'scale(1.2)';
        stepNumber.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1)';
            stepNumber.style.background = 'var(--color-primary)';
        }, 300);

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    practiceStage(stage) {
        this.currentStage = stage;
        this.completedStages.add(stage);
        this.updateProgress();
        
        this.showProgressModal(`Great work! You've practiced Stage ${stage}. Try it with music for the full experience!`);
        
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
        
        this.updateProgressAccessibility();
    }

    setupTempoControls() {
        const tempoButtons = document.querySelectorAll('.tempo-btn');
        
        tempoButtons.forEach(button => {
            button.addEventListener('click', () => {
                tempoButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentTempo = button.dataset.tempo;
                
                if (this.isPracticing) {
                    this.updatePracticeSpeed();
                }
            });
        });
    }

    setupPracticeMode() {
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');

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
        this.practiceStartTime = Date.now();
        const dancer1 = document.getElementById('dancer1');
        const dancer2 = document.getElementById('dancer2');
        
        if (dancer1) dancer1.classList.add('dancing');
        if (dancer2) dancer2.classList.add('dancing');
        
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');
        
        if (startBtn) {
            startBtn.textContent = 'Practicing...';
            startBtn.disabled = true;
        }
        if (stopBtn) {
            stopBtn.disabled = false;
        }
        
        this.startPracticeTimer();
        this.showToast('Practice started! Use the music player for the full experience!');
    }

    stopPractice() {
        this.isPracticing = false;
        const dancer1 = document.getElementById('dancer1');
        const dancer2 = document.getElementById('dancer2');
        
        if (dancer1) dancer1.classList.remove('dancing');
        if (dancer2) dancer2.classList.remove('dancing');
        
        const startBtn = document.getElementById('start-practice');
        const stopBtn = document.getElementById('stop-practice');
        
        if (startBtn) {
            startBtn.textContent = 'Start Practice';
            startBtn.disabled = false;
        }
        if (stopBtn) {
            stopBtn.disabled = true;
        }
        
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
            'slow': 1000,
            'medium': 667,
            'fast': 500
        };
        
        const interval = tempoSpeeds[this.currentTempo] || 1000;
        
        this.practiceTimer = setInterval(() => {
            if (this.isPracticing) {
                this.showBeat();
                this.updatePracticeTime();
            }
        }, interval);
    }

    updatePracticeTime() {
        if (!this.practiceStartTime) return;
        
        const elapsed = Math.floor((Date.now() - this.practiceStartTime) / 1000);
        const duration = document.getElementById('practice-duration');
        if (duration) {
            duration.textContent = this.formatTime(elapsed);
        }
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
            this.showProgressModal('🎉 Excellent! You\'ve mastered all the key elements of Sirtaki dancing with music!');
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
        
        const shareText = `I'm learning the Sirtaki dance with music! ${progressPercent}% complete on my Greek dance journey. 🇬🇷💃🎵 #Sirtaki #GreekDance #LearningJourney`;
        const shareUrl = window.location.href;
        
        if (platform === 'twitter') {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        } else {
            if (navigator.share) {
                navigator.share({
                    title: 'My Sirtaki Learning Journey with Music',
                    text: shareText,
                    url: shareUrl
                }).catch(console.error);
            } else {
                this.copyToClipboard(shareText + ' ' + shareUrl);
                this.showToast('Progress copied to clipboard!');
            }
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(console.error);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
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
            transition: 'all var(--duration-normal) var(--ease-standard)',
            maxWidth: '300px',
            fontSize: 'var(--font-size-sm)'
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        
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

    setupAccessibility() {
        const practiceButtons = document.querySelectorAll('.practice-btn, .practice-with-music-btn');
        practiceButtons.forEach((button, index) => {
            if (button.classList.contains('practice-with-music-btn')) {
                button.setAttribute('aria-label', `Practice stage with music and beat synchronization`);
            } else {
                button.setAttribute('aria-label', `Practice stage ${index + 1} dance steps`);
            }
        });
        
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((step, index) => {
            step.setAttribute('role', 'button');
            step.setAttribute('tabindex', '0');
            step.setAttribute('aria-label', `Dance step ${index + 1}`);
            
            step.addEventListener('keydown', (e) => {
                if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    step.click();
                }
            });
        });
        
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.setAttribute('role', 'progressbar');
            progressFill.setAttribute('aria-label', 'Learning progress');
        }
        
        // Audio accessibility
        if (this.audio) {
            this.audio.setAttribute('aria-label', 'Sirtaki practice music track');
        }
    }

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

// Initialize the enhanced application
document.addEventListener('DOMContentLoaded', () => {
    const app = new SirtakiMusicLearning();
    
    // Add smooth scroll behavior
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
});