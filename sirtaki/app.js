// Enhanced Sirtaki Learning Journey with Video Integration

class SirtakiVideoMusicLearning {
    constructor() {
        this.currentStage = 1;
        this.completedStages = new Set();
        this.currentTempo = 'slow';
        this.isPracticing = false;
        this.isPlayingMusic = false;
        this.isPlayingVideo = false;
        this.practiceTimer = null;
        this.stepTimer = null;
        this.beatTimer = null;
        this.videoTimer = null;
        this.practiceStartTime = null;
        
        // Audio and timing properties
        this.audio = null;
        this.video = null;
        this.currentBeat = 1;
        this.currentPhase = 'slow';
        this.metronomeOnly = false;
        this.loopMode = 'none';
        this.playbackRate = 1;
        
        // Video-specific properties
        this.currentChapter = 0;
        this.videoCurrentTime = 0;
        this.videoDuration = 750; // 12:30 in seconds
        this.videoPlaybackRate = 1;
        this.syncVideoAudio = false;
        this.isVideoLooping = false;
        this.videoLoopStart = 0;
        this.videoLoopEnd = 0;
        this.isPictureInPicture = false;
        this.isFullscreen = false;
        this.bookmarks = [];
        this.annotations = [];
        this.currentVideoType = 'main';
        
        // Video content data
        this.videoContent = {
            chapters: [
                {title: "Introduction & History", startTime: 0, endTime: 90, description: "Origins of Sirtaki and basic concepts"},
                {title: "Basic Hasapiko Steps", startTime: 90, endTime: 240, description: "Fundamental slow movements"},
                {title: "Body Posture & Form", startTime: 240, endTime: 330, description: "Proper stance and positioning"},
                {title: "Tempo Transitions", startTime: 330, endTime: 420, description: "Moving from slow to medium tempo"},
                {title: "Hasaposerviko Kicks", startTime: 420, endTime: 570, description: "Fast movements and kicks"},
                {title: "Group Coordination", startTime: 570, endTime: 660, description: "Dancing with others"},
                {title: "Full Sequence", startTime: 660, endTime: 750, description: "Complete dance demonstration"}
            ],
            supplementaryVideos: {
                'footwork': {title: 'Footwork Close-up', duration: 225, description: 'Detailed foot placement and movement'},
                'side-view': {title: 'Side View Demo', duration: 260, description: 'Profile view of complete sequence'},
                'group-formation': {title: 'Group Formation', duration: 170, description: 'How men position themselves in groups'},
                'common-mistakes': {title: 'Common Mistakes', duration: 195, description: 'What to avoid and how to fix errors'}
            },
            culturalVideos: {
                'origins': {title: 'Sirtaki Origins', duration: 150, description: 'History of the dance creation for Zorba film'},
                'weddings': {title: 'Greek Wedding Traditions', duration: 180, description: 'How Sirtaki is used in celebrations'},
                'variations': {title: 'Regional Variations', duration: 165, description: 'Different styles across Greece'},
                'music-connection': {title: 'Music and Dance Connection', duration: 210, description: 'Understanding Greek rhythm and timing'}
            }
        };
        
        // Video annotations with timing
        this.videoAnnotations = [
            {time: 105, text: "Notice the slight bend in the supporting leg", x: 60, y: 70},
            {time: 200, text: "Keep weight on the ball of your foot", x: 50, y: 80},
            {time: 435, text: "Kick with bent knee, not straight leg", x: 70, y: 60},
            {time: 585, text: "Maintain light contact with neighbor's shoulders", x: 40, y: 40}
        ];
        
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
        this.setupVideo();
        this.setupNavigation();
        this.setupStageInteractions();
        this.setupTempoControls();
        this.setupPracticeMode();
        this.setupModal();
        this.setupAssessment();
        this.setupSocialSharing();
        this.setupMusicControls();
        this.setupVideoControls();
        this.setupVideoNavigation();
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
        this.updateProgress();
        this.updateActiveNavigation();
        this.setupScrollObserver();
        this.initializeVideoContent();
        
        console.log('🎭 Enhanced Sirtaki Learning Journey with Video & Music initialized! 🎵💃🕺🎬');
    }

    setupVideo() {
        this.video = document.getElementById('main-video');
        if (!this.video) {
            console.log('Video element not found - creating placeholder functionality');
            return;
        }
        
        // Set up video event listeners
        this.video.addEventListener('loadedmetadata', () => {
            this.updateVideoTimeDisplay();
            this.setupChapterMarkers();
        });
        
        this.video.addEventListener('timeupdate', () => {
            this.handleVideoTimeUpdate();
        });
        
        this.video.addEventListener('ended', () => {
            this.handleVideoEnd();
        });
        
        this.video.addEventListener('error', (e) => {
            console.error('Video error:', e);
            this.showToast('Video loading failed. Using placeholder mode.');
        });
    }

    setupVideoControls() {
        // Main video play button
        const videoPlayLarge = document.getElementById('video-play-large');
        const videoPlayPause = document.getElementById('video-play-pause');
        
        if (videoPlayLarge) {
            videoPlayLarge.addEventListener('click', () => {
                this.toggleVideoPlayPause();
            });
        }
        
        if (videoPlayPause) {
            videoPlayPause.addEventListener('click', () => {
                this.toggleVideoPlayPause();
            });
        }
        
        // Video speed control
        const videoSpeedSelector = document.getElementById('video-speed-selector');
        if (videoSpeedSelector) {
            videoSpeedSelector.addEventListener('change', (e) => {
                this.setVideoPlaybackRate(parseFloat(e.target.value));
            });
        }
        
        // Video progress slider
        const videoProgressSlider = document.getElementById('video-progress-slider');
        if (videoProgressSlider) {
            videoProgressSlider.addEventListener('input', (e) => {
                this.seekVideo(parseInt(e.target.value));
            });
        }
        
        // Picture-in-Picture toggle
        const pipToggle = document.getElementById('pip-toggle');
        if (pipToggle) {
            pipToggle.addEventListener('click', () => {
                this.togglePictureInPicture();
            });
        }
        
        // Fullscreen toggle
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
        
        // Sync video and audio checkbox
        const syncVideoAudio = document.getElementById('sync-video-audio');
        if (syncVideoAudio) {
            syncVideoAudio.addEventListener('change', (e) => {
                this.syncVideoAudio = e.target.checked;
                if (this.syncVideoAudio) {
                    this.showToast('Video and audio sync enabled');
                } else {
                    this.showToast('Video and audio sync disabled');
                }
            });
        }
        
        // Video loop toggle
        const videoLoopToggle = document.getElementById('video-loop-toggle');
        if (videoLoopToggle) {
            videoLoopToggle.addEventListener('click', () => {
                this.toggleVideoLoop();
            });
        }
        
        // Bookmark moment
        const bookmarkMoment = document.getElementById('bookmark-moment');
        if (bookmarkMoment) {
            bookmarkMoment.addEventListener('click', () => {
                this.addBookmark();
            });
        }

        // Follow along button
        const followAlongBtn = document.getElementById('follow-along-btn');
        if (followAlongBtn) {
            followAlongBtn.addEventListener('click', () => {
                this.startFollowAlongMode();
            });
        }
    }

    setupVideoNavigation() {
        // Chapter navigation
        const chapterItems = document.querySelectorAll('.chapter-item');
        chapterItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.jumpToChapter(index);
            });
        });
        
        // Video thumbnails
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const videoType = thumbnail.dataset.video;
                this.playSupplementaryVideo(videoType);
            });
        });
        
        // Cultural video items
        const cultureVideoItems = document.querySelectorAll('.culture-video-item');
        cultureVideoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoType = item.dataset.video;
                this.playCulturalVideo(videoType);
            });
        });
        
        // Video intro buttons
        const videoIntroBtn = document.querySelector('.video-intro-btn');
        if (videoIntroBtn) {
            videoIntroBtn.addEventListener('click', () => {
                const chapter = parseInt(videoIntroBtn.dataset.chapter);
                this.jumpToChapter(chapter);
                this.scrollToVideoPlayer();
            });
        }
        
        // Chapter buttons in basics section
        const chapterBtns = document.querySelectorAll('.chapter-btn');
        chapterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const chapterIndex = parseInt(btn.closest('.video-basic-item').dataset.chapter);
                this.jumpToChapter(chapterIndex);
                this.scrollToVideoPlayer();
            });
        });
        
        // Practice with video buttons
        const practiceWithVideoBtns = document.querySelectorAll('.practice-with-video-btn');
        practiceWithVideoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = parseInt(btn.dataset.stage);
                const chapter = parseInt(btn.dataset.chapter);
                const audioStart = parseInt(btn.dataset.audioStart);
                this.practiceWithVideo(stage, chapter, audioStart);
            });
        });
        
        // Chapter video buttons
        const chapterVideoBtns = document.querySelectorAll('.chapter-video-btn');
        chapterVideoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const chapter = parseInt(btn.dataset.chapter);
                this.jumpToChapter(chapter);
                this.scrollToVideoPlayer();
            });
        });

        // Group coordination video button
        const groupCoordinationVideo = document.getElementById('group-coordination-video');
        if (groupCoordinationVideo) {
            groupCoordinationVideo.addEventListener('click', () => {
                this.jumpToChapter(5); // Group coordination chapter
                this.scrollToVideoPlayer();
            });
        }
    }

    initializeVideoContent() {
        this.setupChapterMarkers();
        this.updateVideoTimeDisplay();
        this.updateChapterNavigation();
    }

    setupChapterMarkers() {
        const chapterMarkers = document.getElementById('chapter-markers');
        if (!chapterMarkers) return;
        
        chapterMarkers.innerHTML = '';
        
        this.videoContent.chapters.forEach((chapter, index) => {
            const marker = document.createElement('div');
            marker.className = 'chapter-marker';
            marker.style.left = `${(chapter.startTime / this.videoDuration) * 100}%`;
            marker.addEventListener('click', () => {
                this.jumpToChapter(index);
            });
            chapterMarkers.appendChild(marker);
        });
    }

    toggleVideoPlayPause() {
        if (this.isPlayingVideo) {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    }

    playVideo() {
        this.isPlayingVideo = true;
        this.updateVideoPlayButton();
        this.startVideoTimer();
        this.showToast('🎬 Video started! Watch and learn!');
        
        // Sync with audio if enabled
        if (this.syncVideoAudio && this.audio && !this.isPlayingMusic) {
            this.playMusic();
        }
    }

    pauseVideo() {
        this.isPlayingVideo = false;
        this.updateVideoPlayButton();
        this.stopVideoTimer();
        
        // Pause audio if synced
        if (this.syncVideoAudio && this.audio && this.isPlayingMusic) {
            this.pauseMusic();
        }
    }

    updateVideoPlayButton() {
        const playPauseBtn = document.getElementById('video-play-pause');
        const playIcon = playPauseBtn?.querySelector('.video-play-icon');
        const btnText = playPauseBtn?.querySelector('.btn-text');
        
        if (playIcon && btnText) {
            if (this.isPlayingVideo) {
                playIcon.textContent = '⏸️';
                btnText.textContent = 'Pause Video';
            } else {
                playIcon.textContent = '▶️';
                btnText.textContent = 'Play Video';
            }
        }
    }

    startVideoTimer() {
        this.stopVideoTimer();
        this.videoTimer = setInterval(() => {
            if (this.isPlayingVideo) {
                this.videoCurrentTime += 1;
                this.handleVideoTimeUpdate();
                
                // Check for video end
                if (this.videoCurrentTime >= this.videoDuration) {
                    this.handleVideoEnd();
                }
            }
        }, 1000 / this.videoPlaybackRate);
    }

    stopVideoTimer() {
        if (this.videoTimer) {
            clearInterval(this.videoTimer);
            this.videoTimer = null;
        }
    }

    handleVideoTimeUpdate() {
        this.updateVideoTimeDisplay();
        this.updateVideoProgressSlider();
        this.updateCurrentChapter();
        this.showVideoAnnotations();
        this.handleVideoLooping();
        
        // Sync with audio if enabled
        if (this.syncVideoAudio && this.audio) {
            const audioTime = this.getCorrespondingAudioTime(this.videoCurrentTime);
            if (audioTime !== null && Math.abs(this.audio.currentTime - audioTime) > 2) {
                this.audio.currentTime = audioTime;
            }
        }
    }

    updateVideoTimeDisplay() {
        const currentTime = document.getElementById('video-current-time');
        const totalTime = document.getElementById('video-total-time');
        
        if (currentTime) {
            currentTime.textContent = this.formatTime(this.videoCurrentTime);
        }
        
        if (totalTime) {
            totalTime.textContent = this.formatTime(this.videoDuration);
        }
    }

    updateVideoProgressSlider() {
        const progressSlider = document.getElementById('video-progress-slider');
        if (progressSlider) {
            progressSlider.value = this.videoCurrentTime;
        }
    }

    updateCurrentChapter() {
        const newChapter = this.getCurrentChapterIndex();
        if (newChapter !== this.currentChapter) {
            this.currentChapter = newChapter;
            this.updateChapterNavigation();
        }
    }

    getCurrentChapterIndex() {
        for (let i = 0; i < this.videoContent.chapters.length; i++) {
            const chapter = this.videoContent.chapters[i];
            if (this.videoCurrentTime >= chapter.startTime && this.videoCurrentTime < chapter.endTime) {
                return i;
            }
        }
        return this.videoContent.chapters.length - 1;
    }

    updateChapterNavigation() {
        const chapterItems = document.querySelectorAll('.chapter-item');
        chapterItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentChapter);
        });
    }

    showVideoAnnotations() {
        const annotationsContainer = document.getElementById('video-annotations');
        if (!annotationsContainer) return;
        
        // Clear existing annotations
        annotationsContainer.innerHTML = '';
        
        // Show relevant annotations
        this.videoAnnotations.forEach(annotation => {
            if (Math.abs(this.videoCurrentTime - annotation.time) < 3) {
                const annotationEl = document.createElement('div');
                annotationEl.className = 'video-annotation active';
                annotationEl.style.left = `${annotation.x}%`;
                annotationEl.style.top = `${annotation.y}%`;
                annotationEl.textContent = annotation.text;
                annotationsContainer.appendChild(annotationEl);
            }
        });
    }

    handleVideoLooping() {
        if (this.isVideoLooping && this.videoCurrentTime >= this.videoLoopEnd) {
            this.videoCurrentTime = this.videoLoopStart;
            this.showToast('Video loop restarted');
        }
    }

    handleVideoEnd() {
        this.isPlayingVideo = false;
        this.updateVideoPlayButton();
        this.stopVideoTimer();
        this.videoCurrentTime = 0;
        this.showToast('🎉 Video completed! Great learning session!');
    }

    jumpToChapter(chapterIndex) {
        if (chapterIndex < 0 || chapterIndex >= this.videoContent.chapters.length) return;
        
        const chapter = this.videoContent.chapters[chapterIndex];
        this.videoCurrentTime = chapter.startTime;
        this.currentChapter = chapterIndex;
        this.updateVideoTimeDisplay();
        this.updateVideoProgressSlider();
        this.updateChapterNavigation();
        
        this.showToast(`Jumped to: ${chapter.title}`);
    }

    seekVideo(time) {
        this.videoCurrentTime = Math.max(0, Math.min(this.videoDuration, time));
        this.updateVideoTimeDisplay();
        this.updateCurrentChapter();
    }

    setVideoPlaybackRate(rate) {
        this.videoPlaybackRate = rate;
        if (this.isPlayingVideo) {
            this.startVideoTimer(); // Restart timer with new rate
        }
        this.showToast(`Video speed: ${rate}x`);
    }

    toggleVideoLoop() {
        const currentChapter = this.videoContent.chapters[this.currentChapter];
        if (!this.isVideoLooping) {
            this.isVideoLooping = true;
            this.videoLoopStart = currentChapter.startTime;
            this.videoLoopEnd = currentChapter.endTime;
            this.showToast(`Looping: ${currentChapter.title}`);
        } else {
            this.isVideoLooping = false;
            this.showToast('Video loop disabled');
        }
    }

    addBookmark() {
        const currentChapter = this.videoContent.chapters[this.currentChapter];
        const bookmark = {
            time: this.videoCurrentTime,
            chapter: this.currentChapter,
            description: `${currentChapter.title} - ${this.formatTime(this.videoCurrentTime)}`,
            timestamp: Date.now()
        };
        
        this.bookmarks.push(bookmark);
        this.updateBookmarksPanel();
        this.showToast('Bookmark added!');
    }

    updateBookmarksPanel() {
        const bookmarksList = document.getElementById('bookmarks-list');
        if (!bookmarksList) return;
        
        if (this.bookmarks.length === 0) {
            bookmarksList.innerHTML = '<div class="bookmark-empty">No bookmarks yet. Click "Bookmark" while watching videos to save key moments!</div>';
            return;
        }
        
        bookmarksList.innerHTML = this.bookmarks.map(bookmark => `
            <div class="bookmark-item" data-time="${bookmark.time}">
                <div class="bookmark-time">${this.formatTime(bookmark.time)}</div>
                <div class="bookmark-description">${bookmark.description}</div>
            </div>
        `).join('');
        
        // Add click handlers to bookmarks
        bookmarksList.querySelectorAll('.bookmark-item').forEach(item => {
            item.addEventListener('click', () => {
                const time = parseInt(item.dataset.time);
                this.seekVideo(time);
                this.hideBookmarksPanel();
            });
        });
    }

    showBookmarksPanel() {
        const panel = document.getElementById('bookmarks-panel');
        if (panel) {
            panel.classList.add('visible');
        }
        
        // Setup close button
        const closeBtn = panel?.querySelector('.bookmarks-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideBookmarksPanel();
            });
        }
    }

    hideBookmarksPanel() {
        const panel = document.getElementById('bookmarks-panel');
        if (panel) {
            panel.classList.remove('visible');
        }
    }

    togglePictureInPicture() {
        if (this.isPictureInPicture) {
            this.exitPictureInPicture();
        } else {
            this.enterPictureInPicture();
        }
    }

    enterPictureInPicture() {
        const pipOverlay = document.createElement('div');
        pipOverlay.className = 'pip-overlay';
        pipOverlay.innerHTML = `
            <div class="pip-video-container">
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-secondary);">
                    📹 Video Playing
                </div>
            </div>
            <div class="pip-controls">
                <div class="pip-title">Sirtaki Tutorial</div>
                <button class="pip-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(pipOverlay);
        this.isPictureInPicture = true;
        
        // Make draggable
        this.makeDraggable(pipOverlay);
        
        // Setup close button
        const closeBtn = pipOverlay.querySelector('.pip-close');
        closeBtn.addEventListener('click', () => {
            this.exitPictureInPicture();
        });
        
        this.showToast('Picture-in-Picture mode enabled');
    }

    exitPictureInPicture() {
        const pipOverlay = document.querySelector('.pip-overlay');
        if (pipOverlay) {
            pipOverlay.remove();
        }
        this.isPictureInPicture = false;
        this.showToast('Picture-in-Picture mode disabled');
    }

    makeDraggable(element) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(window.getComputedStyle(element).left);
            startTop = parseInt(window.getComputedStyle(element).top);
            
            const onMouseMove = (e) => {
                if (!isDragging) return;
                const newLeft = startLeft + e.clientX - startX;
                const newTop = startTop + e.clientY - startY;
                element.style.left = `${newLeft}px`;
                element.style.top = `${newTop}px`;
                element.style.right = 'auto';
                element.style.bottom = 'auto';
            };
            
            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    toggleFullscreen() {
        const videoContainer = document.getElementById('main-video-container');
        if (!videoContainer) return;
        
        if (!this.isFullscreen) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
            this.isFullscreen = true;
            this.showToast('Fullscreen mode enabled');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
            this.showToast('Fullscreen mode disabled');
        }
    }

    playSupplementaryVideo(videoType) {
        const videoData = this.videoContent.supplementaryVideos[videoType];
        if (!videoData) return;
        
        this.showVideoModal(videoData.title, videoData.description, videoData.duration);
    }

    playCulturalVideo(videoType) {
        const videoData = this.videoContent.culturalVideos[videoType];
        if (!videoData) return;
        
        this.showVideoModal(videoData.title, videoData.description, videoData.duration);
    }

    showVideoModal(title, description, duration) {
        const modal = document.getElementById('video-modal');
        const modalTitle = document.getElementById('video-modal-title');
        const modalDescription = document.getElementById('modal-video-description');
        
        if (modal && modalTitle && modalDescription) {
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.classList.remove('hidden');
            
            // Setup modal controls
            this.setupModalVideoControls();
        }
    }

    setupModalVideoControls() {
        const modal = document.getElementById('video-modal');
        const closeBtn = document.getElementById('video-modal-close');
        const playBtn = document.getElementById('modal-video-play');
        const pauseBtn = document.getElementById('modal-video-pause');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideVideoModal();
            });
        }
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.showToast('Video playing...');
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.showToast('Video paused');
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideVideoModal();
                }
            });
        }
    }

    hideVideoModal() {
        const modal = document.getElementById('video-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    practiceWithVideo(stage, chapter, audioStart) {
        // Mark stage as practicing
        document.querySelectorAll('.stage-card').forEach(card => {
            card.classList.remove('practicing');
        });
        
        const stageCard = document.querySelector(`.stage-card[data-stage="${stage}"]`);
        if (stageCard) {
            stageCard.classList.add('practicing');
        }
        
        // Jump to video chapter
        this.jumpToChapter(chapter);
        
        // Start video
        this.playVideo();
        
        // Jump to audio time and start if sync is enabled
        if (this.audio) {
            this.audio.currentTime = audioStart;
            if (this.syncVideoAudio) {
                this.playMusic();
            }
        }
        
        // Update current stage
        this.currentStage = stage;
        this.completedStages.add(stage);
        this.updateProgress();
        
        this.showToast(`🎬🎵 Practicing Stage ${stage} with video and music!`);
        this.scrollToVideoPlayer();
    }

    startFollowAlongMode() {
        const showVideoOverlay = document.getElementById('show-video-overlay');
        const syncTiming = document.getElementById('sync-timing');
        
        if (syncTiming?.checked) {
            this.syncVideoAudio = true;
        }
        
        if (showVideoOverlay?.checked) {
            this.enterPictureInPicture();
        }
        
        // Start both video and audio
        this.playVideo();
        this.playMusic();
        
        this.showToast('🎭 Follow Along Mode started! Dance with the video!');
    }

    getCorrespondingAudioTime(videoTime) {
        // Map video time to audio time based on the content
        // This is a simplified mapping - in a real app, you'd have precise timing data
        if (videoTime >= 90 && videoTime <= 240) { // Basic steps chapter
            return 0; // Start of audio
        } else if (videoTime >= 330 && videoTime <= 420) { // Transitions chapter
            return 40; // Medium tempo in audio
        } else if (videoTime >= 420 && videoTime <= 570) { // Fast chapter
            return 80; // Fast section in audio
        }
        return null; // No direct mapping
    }

    scrollToVideoPlayer() {
        const videoSection = document.querySelector('.video-learning-section');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Enhanced keyboard shortcuts with video controls
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't interfere if user is typing in a form field
            if (e.target.matches('input, textarea, select')) return;
            
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.toggleVideoPlayPause();
                    } else {
                        this.togglePlayPause();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (e.shiftKey && this.isPlayingVideo) {
                        this.seekVideo(this.videoCurrentTime - 10);
                    } else if (this.audio) {
                        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (e.shiftKey && this.isPlayingVideo) {
                        this.seekVideo(this.videoCurrentTime + 10);
                    } else if (this.audio) {
                        this.audio.currentTime = Math.min(this.audio.duration || 120, this.audio.currentTime + 10);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.setVideoPlaybackRate(Math.min(2, this.videoPlaybackRate + 0.25));
                    } else {
                        this.adjustVolume(0.1);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.setVideoPlaybackRate(Math.max(0.25, this.videoPlaybackRate - 0.25));
                    } else {
                        this.adjustVolume(-0.1);
                    }
                    break;
                case 'KeyV':
                    e.preventDefault();
                    this.toggleVideoPlayPause();
                    break;
                case 'KeyF':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'KeyP':
                    e.preventDefault();
                    this.togglePictureInPicture();
                    break;
                case 'KeyB':
                    e.preventDefault();
                    this.addBookmark();
                    break;
                case 'KeyL':
                    e.preventDefault();
                    this.toggleVideoLoop();
                    break;
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                case 'Digit5':
                case 'Digit6':
                case 'Digit7':
                    e.preventDefault();
                    const chapterNumber = parseInt(e.code.slice(-1)) - 1;
                    this.jumpToChapter(chapterNumber);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.toggleMetronomeOnly();
                    break;
                case 'KeyS':
                    e.preventDefault();
                    this.syncVideoAudio = !this.syncVideoAudio;
                    this.showToast(`Video-Audio sync: ${this.syncVideoAudio ? 'ON' : 'OFF'}`);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.hideModal();
                    this.hideVideoModal();
                    this.hideBookmarksPanel();
                    if (this.isPictureInPicture) {
                        this.exitPictureInPicture();
                    }
                    break;
            }
        });
        
        // Show enhanced keyboard shortcuts
        this.showEnhancedKeyboardShortcuts();
    }

    showEnhancedKeyboardShortcuts() {
        // Only show on first visit
        if (localStorage.getItem('sirtaki-video-shortcuts-shown')) return;
        
        const shortcuts = document.createElement('div');
        shortcuts.className = 'keyboard-shortcuts';
        shortcuts.innerHTML = `
            <h4>⌨️ Enhanced Keyboard Shortcuts</h4>
            <ul class="shortcut-list">
                <li><span class="shortcut-key">Space</span><span>Play/Pause Audio</span></li>
                <li><span class="shortcut-key">Shift+Space</span><span>Play/Pause Video</span></li>
                <li><span class="shortcut-key">V</span><span>Toggle Video</span></li>
                <li><span class="shortcut-key">F</span><span>Fullscreen</span></li>
                <li><span class="shortcut-key">P</span><span>Picture-in-Picture</span></li>
                <li><span class="shortcut-key">B</span><span>Bookmark</span></li>
                <li><span class="shortcut-key">L</span><span>Loop Video</span></li>
                <li><span class="shortcut-key">S</span><span>Sync Video/Audio</span></li>
                <li><span class="shortcut-key">1-7</span><span>Jump to Chapter</span></li>
                <li><span class="shortcut-key">Shift+←/→</span><span>Video Seek</span></li>
                <li><span class="shortcut-key">Shift+↑/↓</span><span>Video Speed</span></li>
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
        }, 8000);
        
        localStorage.setItem('sirtaki-video-shortcuts-shown', 'true');
    }

    // Include all existing methods from the previous version
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
    }

    togglePlayPause() {
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
        
        this.showProgressModal(`Great work! You've practiced Stage ${stage}. Try it with video and music for the full experience!`);
        
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
        const startVideoBtn = document.getElementById('start-video-practice');
        const stopVideoBtn = document.getElementById('stop-video-practice');

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

        if (startVideoBtn) {
            startVideoBtn.addEventListener('click', () => {
                this.startVideoPractice();
            });
        }

        if (stopVideoBtn) {
            stopVideoBtn.addEventListener('click', () => {
                this.stopVideoPractice();
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
        this.showToast('Practice started! Use video and music for the full experience!');
    }

    startVideoPractice() {
        this.startPractice();
        this.playVideo();
        this.showToast('🎬 Video practice started! Follow along with the instructor!');
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

    stopVideoPractice() {
        this.stopPractice();
        this.pauseVideo();
        this.showToast('Video practice stopped');
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
            this.showProgressModal('🎉 Excellent! You\'ve mastered all aspects of Sirtaki dancing with video and music!');
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
        
        const shareText = `I'm learning the Sirtaki dance with video tutorials and music! ${progressPercent}% complete on my Greek dance journey. 🇬🇷💃🎵🎬 #Sirtaki #GreekDance #VideoLearning`;
        const shareUrl = window.location.href;
        
        if (platform === 'twitter') {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        } else {
            if (navigator.share) {
                navigator.share({
                    title: 'My Sirtaki Video Learning Journey',
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
        const practiceButtons = document.querySelectorAll('.practice-btn, .practice-with-video-btn');
        practiceButtons.forEach((button, index) => {
            if (button.classList.contains('practice-with-video-btn')) {
                button.setAttribute('aria-label', `Practice stage with video and music synchronization`);
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

        // Video accessibility
        const videoContainer = document.getElementById('main-video-container');
        if (videoContainer) {
            videoContainer.setAttribute('aria-label', 'Sirtaki video tutorial player');
        }

        // Chapter items
        const chapterItems = document.querySelectorAll('.chapter-item');
        chapterItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Jump to chapter ${index + 1}`);
        });
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
    const app = new SirtakiVideoMusicLearning();
    
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
    
    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            app.isFullscreen = false;
        }
    });
    
    // Setup bookmarks panel toggle
    setTimeout(() => {
        if (app.bookmarks.length > 0) {
            app.showBookmarksPanel();
        }
    }, 2000);
});