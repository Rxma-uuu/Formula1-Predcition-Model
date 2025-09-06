// Global variables
let raceData = [];
let driversData = [];
let isLoading = false;

// DOM elements
const raceSelect = document.getElementById('race-select');
const driversGrid = document.getElementById('driversGrid');
const driversContainer = driversGrid.querySelector('.drivers-container');
const predictionForm = document.getElementById('predictionForm');
const predictButton = document.getElementById('predictButton');
const resultsPanel = document.getElementById('resultsPanel');
const resultsContent = document.getElementById('resultsContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const successAnimation = document.getElementById('successAnimation');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    createParticleEffect();
});

// Initialize application
async function initializeApp() {
    try {
        await loadRaceData();
        await loadDriversData();
        populateRaceSelect();
        setupDriverInputs();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError('Failed to load race data. Please refresh the page.');
    }
}

// Load race data (simulated - replace with actual API call)
async function loadRaceData() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock race data - replace with actual FastF1 data
    raceData = [
        { id: 1, name: 'Bahrain Grand Prix', round: 1 },
        { id: 2, name: 'Saudi Arabian Grand Prix', round: 2 },
        { id: 3, name: 'Australian Grand Prix', round: 3 },
        { id: 4, name: 'Japanese Grand Prix', round: 4 },
        { id: 5, name: 'Chinese Grand Prix', round: 5 },
        { id: 6, name: 'Miami Grand Prix', round: 6 },
        { id: 7, name: 'Emilia Romagna Grand Prix', round: 7 },
        { id: 8, name: 'Monaco Grand Prix', round: 8 },
        { id: 9, name: 'Canadian Grand Prix', round: 9 },
        { id: 10, name: 'Spanish Grand Prix', round: 10 },
        { id: 11, name: 'Austrian Grand Prix', round: 11 },
        { id: 12, name: 'British Grand Prix', round: 12 },
        { id: 13, name: 'Hungarian Grand Prix', round: 13 },
        { id: 14, name: 'Belgian Grand Prix', round: 14 },
        { id: 15, name: 'Dutch Grand Prix', round: 15 },
        { id: 16, name: 'Italian Grand Prix', round: 16 },
        { id: 17, name: 'Azerbaijan Grand Prix', round: 17 },
        { id: 18, name: 'Singapore Grand Prix', round: 18 },
        { id: 19, name: 'United States Grand Prix', round: 19 },
        { id: 20, name: 'Mexican Grand Prix', round: 20 },
        { id: 21, name: 'Brazilian Grand Prix', round: 21 },
        { id: 22, name: 'Las Vegas Grand Prix', round: 22 },
        { id: 23, name: 'Qatar Grand Prix', round: 23 },
        { id: 24, name: 'Abu Dhabi Grand Prix', round: 24 }
    ];
}

// Load drivers data (simulated - replace with actual API call)
async function loadDriversData() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock drivers data - replace with actual data from your backend
    driversData = [
        { abbr: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing' },
        { abbr: 'NOR', name: 'Lando Norris', team: 'McLaren' },
        { abbr: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
        { abbr: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
        { abbr: 'SAI', name: 'Carlos Sainz', team: 'Williams' },
        { abbr: 'RUS', name: 'George Russell', team: 'Mercedes' },
        { abbr: 'HAM', name: 'Lewis Hamilton', team: 'Ferrari' },
        { abbr: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
        { abbr: 'HUL', name: 'Nico Hülkenberg', team: 'Sauber' },
        { abbr: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
        { abbr: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
        { abbr: 'OCO', name: 'Esteban Ocon', team: 'Haas' },
        { abbr: 'TSU', name: 'Yuki Tsunoda', team: 'RB' },
        { abbr: 'ALB', name: 'Alexander Albon', team: 'Williams' },
        { abbr: 'ANT', name: 'Kimi Antonelli', team: 'Mercedes' },
        { abbr: 'BEA', name: 'Oliver Bearman', team: 'Haas' },
        { abbr: 'LAW', name: 'Liam Lawson', team: 'Red Bull Racing' },
        { abbr: 'BOR', name: 'Gabriel Bortoleto', team: 'Sauber' },
        { abbr: 'DOO', name: 'Jack Doohan', team: 'Alpine' },
        { abbr: 'HAD', name: 'Isack Hadjar', team: 'RB' }
    ];
}

// Populate race select dropdown
function populateRaceSelect() {
    raceSelect.innerHTML = '<option value="">Choose a race...</option>';
    
    raceData.forEach(race => {
        const option = document.createElement('option');
        option.value = race.round;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Setup driver input fields
function setupDriverInputs() {
    driversContainer.innerHTML = '';
    
    driversData.forEach((driver, index) => {
        const driverInput = document.createElement('div');
        driverInput.className = 'driver-input';
        driverInput.innerHTML = `
            <div class="driver-name">${driver.abbr} - ${driver.name}</div>
            <input 
                type="number" 
                name="grid_${driver.abbr}" 
                min="1" 
                max="20" 
                value="${index + 1}"
                placeholder="Grid Position"
                required
            >
        `;
        driversContainer.appendChild(driverInput);
        
        // Add animation delay
        setTimeout(() => {
            driverInput.style.animation = 'fadeInUp 0.5s ease-out both';
        }, index * 50);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    predictionForm.addEventListener('submit', handlePrediction);
    
    // Race selection change
    raceSelect.addEventListener('change', function() {
        if (this.value) {
            addGlowEffect(this);
        }
    });
    
    // Driver input changes
    driversContainer.addEventListener('input', function(e) {
        if (e.target.type === 'number') {
            validateGridPosition(e.target);
            addGlowEffect(e.target);
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                updateActiveNavLink(this);
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

// Handle prediction form submission
async function handlePrediction(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const selectedRace = raceSelect.value;
    if (!selectedRace) {
        showError('Please select a race first.');
        return;
    }
    
    const gridPositions = getGridPositions();
    if (!validateGridPositions(gridPositions)) {
        showError('Please ensure all grid positions are unique and between 1-20.');
        return;
    }
    
    try {
        isLoading = true;
        showLoading();
        
        // Simulate API call to your ML backend
        const predictions = await callPredictionAPI(selectedRace, gridPositions);
        
        hideLoading();
        showSuccessAnimation();
        displayResults(predictions);
        
    } catch (error) {
        hideLoading();
        console.error('Prediction failed:', error);
        showError('Prediction failed. Please try again.');
    } finally {
        isLoading = false;
    }
}

// Get grid positions from form
function getGridPositions() {
    const positions = {};
    driversData.forEach(driver => {
        const input = document.querySelector(`input[name="grid_${driver.abbr}"]`);
        positions[driver.abbr] = parseInt(input.value);
    });
    return positions;
}

// Validate grid positions
function validateGridPositions(positions) {
    const values = Object.values(positions);
    const uniqueValues = new Set(values);
    
    // Check if all positions are unique and within range
    return uniqueValues.size === values.length && 
           values.every(pos => pos >= 1 && pos <= 20);
}

// Call prediction API (simulated)
async function callPredictionAPI(raceRound, gridPositions) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction results - replace with actual API call
    const mockPredictions = driversData.map((driver, index) => ({
        position: index + 1,
        driver: driver.abbr,
        driverName: driver.name,
        confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    }));
    
    // Shuffle for realistic results
    return mockPredictions.sort(() => Math.random() - 0.5);
}

// Display prediction results
function displayResults(predictions) {
    const sortedPredictions = predictions.sort((a, b) => a.position - b.position);
    
    resultsContent.innerHTML = `
        <div class="results-header">
            <h4>Predicted Race Results</h4>
            <p>AI-generated finishing positions</p>
        </div>
        <div class="results-list">
            ${sortedPredictions.map((result, index) => `
                <div class="result-item" style="animation-delay: ${index * 0.1}s">
                    <div class="result-position">${index + 1}</div>
                    <div class="result-driver">${result.driverName}</div>
                    <div class="result-confidence">${Math.round(result.confidence * 100)}%</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Scroll to results
    resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function showLoading() {
    loadingOverlay.classList.add('active');
    predictButton.disabled = true;
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
    predictButton.disabled = false;
}

function showSuccessAnimation() {
    successAnimation.classList.add('active');
    setTimeout(() => {
        successAnimation.classList.remove('active');
    }, 1500);
}

function showError(message) {
    // Create and show error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

function addGlowEffect(element) {
    element.style.boxShadow = '0 0 20px rgba(0, 206, 201, 0.3)';
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 1000);
}

function validateGridPosition(input) {
    const value = parseInt(input.value);
    if (value < 1 || value > 20) {
        input.style.borderColor = '#ff6b6b';
    } else {
        input.style.borderColor = '';
    }
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.9)';
    }
}

function scrollToPredict() {
    document.getElementById('predict').scrollIntoView({ behavior: 'smooth' });
}

// Create particle effect
function createParticleEffect() {
    const particlesContainer = document.querySelector('.particles');
    
    // Add more dynamic particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        particlesContainer.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = [
        'rgba(212, 0, 0, 0.6)',
        'rgba(255, 215, 0, 0.6)',
        'rgba(192, 192, 192, 0.6)',
        'rgba(212, 0, 0, 0.4)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for error notifications and additional animations
const additionalStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .results-header {
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(212, 0, 0, 0.3);
    }
    
    .results-header h4 {
        font-family: var(--font-primary);
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--ferrari-red);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .results-header p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .result-confidence {
        font-family: var(--font-primary);
        font-weight: 600;
        color: var(--ferrari-gold);
        font-size: 0.9rem;
    }
    
    .error-notification {
        background: linear-gradient(135deg, #D40000, #A30000) !important;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);