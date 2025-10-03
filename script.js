

// Global Variables (Global Scope)
let userScore = 0;
let totalInteractions = 0;
const animations = ['bounce', 'shake', 'rotate', 'glow'];
let currentAnimationIndex = 0;

// ============================================
// FUNCTION 1: Calculate Engagement Score
// Demonstrates: Parameters, Return Values
// ============================================
function calculateEngagementScore(interactions, basePoints, multiplier) {
    // Local variables (Local Scope)
    const calculatedScore = (interactions * basePoints) * multiplier;
    const bonusPoints = interactions > 5 ? 50 : 0;
    
    // Return the total score
    return calculatedScore + bonusPoints;
}

// ============================================
// FUNCTION 2: Get Animation Class
// Demonstrates: Parameters, Return Values, Array Access
// ============================================
function getNextAnimation(animationsList, currentIndex) {
    // Local variable
    const nextIndex = (currentIndex + 1) % animationsList.length;
    
    // Return the animation class name
    return animationsList[nextIndex];
}

// ============================================
// FUNCTION 3: Update Score Display
// Demonstrates: Parameters, DOM Manipulation, No Return
// ============================================
function updateScoreDisplay(newScore) {
    // Local variable (Local Scope)
    const scoreElement = document.getElementById('scoreDisplay');
    
    // Update the display
    scoreElement.textContent = newScore;
    
    // Add animation class
    scoreElement.classList.add('updated');
    
    // Remove animation class after it completes
    setTimeout(() => {
        scoreElement.classList.remove('updated');
    }, 500);
}

// ============================================
// FUNCTION 4: Add User Points
// Demonstrates: Global and Local Scope Interaction, Return Values
// ============================================
function addUserPoints(points) {
    // Accessing global variable
    userScore += points;
    totalInteractions++;
    
    // Local calculation
    const message = `Added ${points} points! Total: ${userScore}`;
    
    // Update display
    updateScoreDisplay(userScore);
    
    // Return confirmation message
    return message;
}

// ============================================
// FUNCTION 5: Validate Score Range
// Demonstrates: Parameters, Conditional Logic, Boolean Return
// ============================================
function isScoreInRange(score, minRange, maxRange) {
    // Local validation
    const isValid = score >= minRange && score <= maxRange;
    
    return isValid;
}

// ============================================
// FUNCTION 6: Format Score Message
// Demonstrates: Parameters, String Manipulation, Return Values
// ============================================
function formatScoreMessage(playerName, score, rank) {
    // Local variables
    const formattedScore = score.toLocaleString();
    const message = `${playerName}, your score is ${formattedScore} points. Rank: ${rank}`;
    
    return message;
}

// ============================================
// FUNCTION 7: Calculate Animation Duration
// Demonstrates: Parameters, Mathematical Operations, Return Values
// ============================================
function calculateAnimationDuration(baseTime, speedFactor, complexity) {
    // Local calculation
    const adjustedTime = (baseTime / speedFactor) * complexity;
    
    // Ensure minimum duration
    const finalDuration = Math.max(adjustedTime, 300);
    
    return finalDuration;
}

// ============================================
// PART 3: Combining CSS Animations with JavaScript
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const animatedBox = document.getElementById('animatedBox');
    const triggerBtn = document.getElementById('triggerAnimation');
    const flipCardBtn = document.getElementById('flipCard');
    const flipCard = document.querySelector('.flip-card');
    const showModalBtn = document.getElementById('showModal');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalActionBtn = document.querySelector('.modal-btn');
    const startLoadingBtn = document.getElementById('startLoading');
    const loadingContainer = document.getElementById('loadingContainer');
    const animateStatsBtn = document.getElementById('animateStats');
    const resetScoreBtn = document.getElementById('resetScore');
    const cardButtons = document.querySelectorAll('.card-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // ============================================
    // EVENT 1: Trigger Box Animation
    // Demonstrates: Adding/Removing CSS Classes Dynamically
    // ============================================
    triggerBtn.addEventListener('click', function() {
        // Get next animation using our function
        const nextAnim = getNextAnimation(animations, currentAnimationIndex);
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        
        // Remove all animation classes first
        animations.forEach(anim => {
            animatedBox.classList.remove(anim);
        });
        
        // Add new animation class
        animatedBox.classList.add(nextAnim);
        
        // Add points using our function
        const message = addUserPoints(10);
        console.log(message);
        
        // Remove animation class after it completes
        setTimeout(() => {
            animatedBox.classList.remove(nextAnim);
        }, 1000);
    });
    
    // ============================================
    // EVENT 2: Flip Card Animation
    // Demonstrates: Toggle Class for CSS 3D Transforms
    // ============================================
    flipCardBtn.addEventListener('click', function() {
        // Toggle flip class
        flipCard.classList.toggle('flipped');
        
        // Add points
        addUserPoints(15);
        
        // Local scope demonstration
        const flipStatus = flipCard.classList.contains('flipped') ? 'flipped' : 'normal';
        console.log('Card status:', flipStatus);
    });
    
    // ============================================
    // EVENT 3: Show Modal with Slide Animation
    // Demonstrates: Displaying Modal with CSS Animation
    // ============================================
    showModalBtn.addEventListener('click', function() {
        modal.classList.add('show');
        addUserPoints(5);
    });
    
    // Close modal when clicking X
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking button
    modalActionBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
    }
    
    // ============================================
    // EVENT 4: Loading Animation Start/Stop
    // Demonstrates: Show/Hide with Animation Classes
    // ============================================
    startLoadingBtn.addEventListener('click', function() {
        // Show loading
        loadingContainer.classList.remove('hidden');
        loadingContainer.classList.add('show');
        
        // Simulate processing time (3 seconds)
        setTimeout(() => {
            loadingContainer.classList.remove('show');
            loadingContainer.classList.add('hidden');
            
            // Add completion points
            addUserPoints(20);
            
            // Show success message
            alert('AI Model Processing Complete! +20 points');
        }, 3000);
    });
    
    // ============================================
    // EVENT 5: Animate Statistics Counter
    // Demonstrates: Animated Number Counting
    // ============================================
    animateStatsBtn.addEventListener('click', function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(statElement => {
            // Get target value from data attribute
            const target = parseFloat(statElement.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            // Reset to 0
            statElement.textContent = '0';
            
            // Animate counting up
            const counter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    statElement.textContent = target;
                    clearInterval(counter);
                } else {
                    statElement.textContent = Math.floor(current);
                }
            }, duration / steps);
        });
        
        // Add points for interaction
        addUserPoints(25);
    });
    
    // ============================================
    // EVENT 6: Reset Score
    // Demonstrates: Resetting Global Variables
    // ============================================
    resetScoreBtn.addEventListener('click', function() {
        // Reset global variables (Global Scope)
        userScore = 0;
        totalInteractions = 0;
        
        // Update display
        updateScoreDisplay(userScore);
        
        // Local confirmation message
        const confirmMessage = 'Score has been reset to 0';
        console.log(confirmMessage);
        
        alert('Score Reset! Start earning points again.');
    });
    
    // ============================================
    // EVENT 7: Card Learn More Buttons
    // Demonstrates: Event Delegation and Dynamic Content
    // ============================================
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = this.closest('.card');
            const cardTitle = card.querySelector('h3').textContent;
            
            // Add glow effect to card
            card.style.animation = 'glow 1s ease-in-out';
            
            // Remove animation after completion
            setTimeout(() => {
                card.style.animation = '';
            }, 1000);
            
            // Add points
            addUserPoints(10);
            
            // Show info (using our formatting function)
            const message = formatScoreMessage('User', userScore, 'Explorer');
            console.log(`Clicked on: ${cardTitle}`);
            console.log(message);
            
            alert(`Learning about: ${cardTitle}\n+10 points earned!`);
        });
    });
    
    // ============================================
    // EVENT 8: Navigation Buttons with Smooth Scroll
    // Demonstrates: Scroll Behavior and Section Highlighting
    // ============================================
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Add active state
            navButtons.forEach(btn => btn.style.transform = 'scale(1)');
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Add points
            addUserPoints(5);
            
            console.log(`Navigated to: ${section}`);
        });
    });
    
    // ============================================
    // BONUS: Hover Effects on Cards
    // Demonstrates: Mouse Events with Animations
    // ============================================
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Local variable for this card only
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ============================================
    // DEMONSTRATION: Using Multiple Functions Together
    // ============================================
    
    // Function that uses other functions
    function processUserInteraction(interactionType) {
        // Local variables
        let points = 0;
        let multiplier = 1.0;
        
        // Determine points based on interaction type
        switch(interactionType) {
            case 'click':
                points = 10;
                break;
            case 'hover':
                points = 5;
                break;
            case 'scroll':
                points = 3;
                break;
            default:
                points = 1;
        }
        
        // Calculate engagement using our function
        const engagementScore = calculateEngagementScore(totalInteractions, points, multiplier);
        
        // Check if score is in valid range using our function
        const isValid = isScoreInRange(engagementScore, 0, 10000);
        
        if (isValid) {
            // Format and return message using our function
            return formatScoreMessage('Player', engagementScore, 'Active');
        } else {
            return 'Score out of valid range!';
        }
    }
    
    // ============================================
    // ADVANCED: Animation Timing Calculator
    // Demonstrates: Complex Function Composition
    // ============================================
    
    function getOptimalAnimationSpeed(deviceType, userPreference) {
        // Local variables for calculation
        let baseDuration = 500; // milliseconds
        let speedFactor = 1.0;
        let complexityLevel = 1.0;
        
        // Adjust based on device type
        if (deviceType === 'mobile') {
            speedFactor = 1.2; // Slightly faster for mobile
        } else if (deviceType === 'desktop') {
            speedFactor = 1.0;
        }
        
        // Adjust based on user preference
        if (userPreference === 'fast') {
            complexityLevel = 0.7;
        } else if (userPreference === 'slow') {
            complexityLevel = 1.3;
        }
        
        // Calculate using our function
        const duration = calculateAnimationDuration(baseDuration, speedFactor, complexityLevel);
        
        return duration;
    }
    
    // ============================================
    // UTILITY: Log System Information
    // Demonstrates: Scope and Information Gathering
    // ============================================
    
    function logSystemInfo() {
        // Access global variables
        console.log('=== System Information ===');
        console.log('Current Score:', userScore);
        console.log('Total Interactions:', totalInteractions);
        console.log('Available Animations:', animations);
        console.log('Current Animation Index:', currentAnimationIndex);
        
        // Calculate and display optimal animation speed
        const optimalSpeed = getOptimalAnimationSpeed('desktop', 'normal');
        console.log('Optimal Animation Duration:', optimalSpeed + 'ms');
        
        // Process and display interaction data
        const interactionMessage = processUserInteraction('click');
        console.log(interactionMessage);
    }
    
    // Log initial system info
    logSystemInfo();
    
    // ============================================
    // PERIODIC UPDATES: Auto-save score simulation
    // Demonstrates: Intervals and Persistent Operations
    // ============================================
    
    // Auto-log statistics every 30 seconds
    setInterval(() => {
        if (totalInteractions > 0) {
            console.log(`Auto-save: Score = ${userScore}, Interactions = ${totalInteractions}`);
        }
    }, 30000);
    
    // ============================================
    // INITIALIZATION COMPLETE
    // ============================================
    console.log('AI/ML Interactive Experience Initialized!');
    console.log('All event listeners attached successfully.');
    console.log('Start interacting to earn points!');
});

// ============================================
// ADDITIONAL STANDALONE FUNCTIONS
// (Can be called from console for testing)
// ============================================

// Function to test scope demonstration
function demonstrateScope() {
    // Global variable access
    console.log('Global userScore:', userScore);
    
    // Local variable
    const localMessage = 'This is a local variable';
    console.log(localMessage);
    
    // Nested function demonstrating closure
    function innerFunction() {
        const innerLocal = 'Inner local variable';
        console.log('Can access outer local:', localMessage);
        console.log('Can access global:', userScore);
        console.log(innerLocal);
    }
    
    innerFunction();
    
    // innerLocal is not accessible here (scope boundary)
    // console.log(innerLocal); // Would cause error
}

// Function to demonstrate parameter passing
function demonstrateParameters(param1, param2, param3) {
    console.log('=== Parameter Demonstration ===');
    console.log('Parameter 1:', param1);
    console.log('Parameter 2:', param2);
    console.log('Parameter 3:', param3);
    
    // Calculate something with parameters
    const result = param1 + param2 + param3;
    
    return {
        sum: result,
        average: result / 3,
        max: Math.max(param1, param2, param3)
    };
}

// Function to demonstrate return values
function demonstrateReturnValues() {
    // Return a number
    function getNumber() {
        return 42;
    }
    
    // Return a string
    function getString() {
        return 'Hello from function!';
    }
    
    // Return an object
    function getObject() {
        return {
            name: 'AI System',
            version: '1.0',
            active: true
        };
    }
    
    // Return an array
    function getArray() {
        return [1, 2, 3, 4, 5];
    }
    
    console.log('Number return:', getNumber());
    console.log('String return:', getString());
    console.log('Object return:', getObject());
    console.log('Array return:', getArray());
}

