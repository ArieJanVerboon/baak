// GitHub Repository Organization Guide - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupProgressBar();
    setupNavigation();
    setupStrategyCards();
    setupDecisionTree();
    setupTabs();
    setupSmoothScrolling();
    setupIntersectionObserver();
}

// Progress Bar Functionality
function setupProgressBar() {
    const progressBar = document.getElementById('progressFill');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

// Navigation Functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Strategy Cards Interaction
function setupStrategyCards() {
    const strategyCards = document.querySelectorAll('.strategy-card');
    
    strategyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            strategyCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'translateY(-8px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 200);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0366d6';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.borderColor = 'transparent';
            }
        });
    });
}

// Decision Tree Functionality
function setupDecisionTree() {
    const decisionOptions = document.querySelectorAll('.decision-option');
    const decisionNodes = document.querySelectorAll('.decision-node');
    const decisionResult = document.getElementById('decisionResult');
    
    decisionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const nextNode = this.getAttribute('data-next');
            const result = this.getAttribute('data-result');
            
            if (nextNode) {
                // Show next decision node
                decisionNodes.forEach(node => node.classList.remove('active'));
                document.querySelector(`[data-node="${nextNode}"]`).classList.add('active');
            } else if (result) {
                // Show result
                decisionNodes.forEach(node => node.classList.remove('active'));
                showDecisionResult(result);
            }
        });
    });
}

function showDecisionResult(strategy) {
    const decisionResult = document.getElementById('decisionResult');
    const resultContent = decisionResult.querySelector('.result-content');
    
    const strategies = {
        single: {
            title: 'Single Repository',
            description: 'Perfect for your needs! Keep all projects in one repository with organized subfolders.',
            icon: 'fas fa-folder',
            color: '#0366d6',
            benefits: [
                'Easy to manage and maintain',
                'Shared resources across projects',
                'Great for learning and practice',
                'Lower administrative overhead'
            ]
        },
        multiple: {
            title: 'Repository per Project',
            description: 'Excellent choice! Each project gets its own dedicated repository.',
            icon: 'fas fa-code-branch',
            color: '#28a745',
            benefits: [
                'Clean, professional URLs',
                'Independent project deployment',
                'Better project isolation',
                'Easier client presentation'
            ]
        },
        hybrid: {
            title: 'Hybrid Approach',
            description: 'Smart strategy! Group related projects into themed repositories.',
            icon: 'fas fa-sitemap',
            color: '#f66a0a',
            benefits: [
                'Balanced organization',
                'Logical project grouping',
                'Flexible structure',
                'Good for team collaboration'
            ]
        }
    };
    
    const selectedStrategy = strategies[strategy];
    
    resultContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="background: ${selectedStrategy.color}; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem;">
                <i class="${selectedStrategy.icon}"></i>
            </div>
            <h4 style="color: #24292e; margin-bottom: 0.5rem;">${selectedStrategy.title}</h4>
            <p style="color: #586069; margin-bottom: 1.5rem;">${selectedStrategy.description}</p>
        </div>
        <div>
            <h5 style="color: #24292e; margin-bottom: 1rem;">Key Benefits:</h5>
            <ul style="list-style: none; padding: 0;">
                ${selectedStrategy.benefits.map(benefit => `
                    <li style="padding: 0.5rem 0; color: #586069; position: relative; padding-left: 1.5rem;">
                        <span style="position: absolute; left: 0; color: ${selectedStrategy.color};">✓</span>
                        ${benefit}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    decisionResult.classList.add('active');
}

function resetDecisionTree() {
    const decisionNodes = document.querySelectorAll('.decision-node');
    const decisionResult = document.getElementById('decisionResult');
    
    decisionNodes.forEach(node => node.classList.remove('active'));
    decisionResult.classList.remove('active');
    
    // Show the first node
    document.querySelector('[data-node="start"]').classList.add('active');
}

// Make resetDecisionTree available globally
window.resetDecisionTree = resetDecisionTree;

// Tab Functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.querySelector(`[data-tab="${targetTab}"].tab-content`).classList.add('active');
        });
    });
}

// Smooth Scrolling Enhancement
function setupSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Navigation
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -80px 0px',
        threshold: 0.1
    };
    
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
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced Strategy Card Interactions
function enhanceStrategyCards() {
    const strategyCards = document.querySelectorAll('.strategy-card');
    
    strategyCards.forEach(card => {
        // Add click-to-expand functionality
        card.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Collapse all cards
            strategyCards.forEach(c => c.classList.remove('expanded'));
            
            if (!isExpanded) {
                this.classList.add('expanded');
                // Scroll to show full card
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
}

// Interactive Decision Tree Enhancements
function enhanceDecisionTree() {
    const decisionTree = document.querySelector('.decision-tree');
    
    // Add breadcrumb navigation
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'decision-breadcrumb';
    breadcrumb.innerHTML = '<span>Question 1 of 3</span>';
    decisionTree.insertBefore(breadcrumb, decisionTree.firstChild);
    
    // Track progress through decision tree
    const decisionOptions = document.querySelectorAll('.decision-option');
    let currentStep = 1;
    
    decisionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const nextNode = this.getAttribute('data-next');
            const result = this.getAttribute('data-result');
            
            if (nextNode) {
                currentStep++;
                breadcrumb.innerHTML = `<span>Question ${currentStep} of 3</span>`;
            } else if (result) {
                breadcrumb.innerHTML = '<span>✓ Recommendation Ready</span>';
            }
        });
    });
}

// Checklist Functionality
function setupChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const totalItems = checkboxes.length;
    
    // Create progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'checklist-progress';
    progressIndicator.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <span style="font-weight: 600; color: #24292e;">Progress: </span>
            <span id="checklist-count">0</span>/${totalItems} completed
        </div>
        <div style="background: #e1e4e8; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="checklist-bar" style="background: #28a745; height: 100%; width: 0%; transition: width 0.3s ease;"></div>
        </div>
    `;
    
    const checklist = document.querySelector('.checklist');
    checklist.parentNode.insertBefore(progressIndicator, checklist);
    
    // Update progress when items are checked
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
            const percentage = (checkedCount / totalItems) * 100;
            
            document.getElementById('checklist-count').textContent = checkedCount;
            document.getElementById('checklist-bar').style.width = percentage + '%';
            
            // Add celebration effect when all items are checked
            if (checkedCount === totalItems) {
                showCelebration();
            }
        });
    });
}

function showCelebration() {
    const celebration = document.createElement('div');
    celebration.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; z-index: 1000;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="color: #24292e; margin-bottom: 0.5rem;">Congratulations!</h3>
            <p style="color: #586069;">You've completed all best practices!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-top: 1rem;">Close</button>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999;"></div>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.remove();
        }
    }, 3000);
}

// URL Examples Interactive Features
function setupUrlExamples() {
    const urlCards = document.querySelectorAll('.url-card');
    
    urlCards.forEach(card => {
        const codeElement = card.querySelector('code');
        if (codeElement) {
            codeElement.addEventListener('click', function() {
                // Copy to clipboard
                navigator.clipboard.writeText(this.textContent).then(() => {
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = '#28a745';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '#24292e';
                    }, 2000);
                });
            });
            
            // Add hover effect
            codeElement.style.cursor = 'pointer';
            codeElement.title = 'Click to copy';
        }
    });
}

// Troubleshooting Search Functionality
function setupTroubleshootingSearch() {
    const troubleshootingSection = document.getElementById('troubleshooting');
    if (!troubleshootingSection) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'trouble-search';
    searchContainer.innerHTML = `
        <div style="max-width: 400px; margin: 0 auto 2rem;">
            <input type="text" id="troubleSearch" placeholder="Search troubleshooting topics..." style="width: 100%; padding: 0.75rem; border: 2px solid #e1e4e8; border-radius: 8px; font-size: 1rem;">
        </div>
    `;
    
    const container = troubleshootingSection.querySelector('.container');
    const sectionDescription = container.querySelector('.section-description');
    sectionDescription.parentNode.insertBefore(searchContainer, sectionDescription.nextSibling);
    
    const searchInput = document.getElementById('troubleSearch');
    const troubleItems = document.querySelectorAll('.trouble-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        troubleItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('.trouble-solution').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #24292e;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Add to navbar
    navbar.querySelector('.container').appendChild(mobileToggle);
    
    // Toggle functionality
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
        const icon = this.querySelector('i');
        icon.className = navMenu.classList.contains('mobile-active') ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('mobile-active');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupChecklist();
    setupUrlExamples();
    setupTroubleshootingSearch();
    setupMobileMenu();
    enhanceStrategyCards();
    enhanceDecisionTree();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll event
window.addEventListener('scroll', debounce(function() {
    // Any scroll-related functions can be called here
}, 10));