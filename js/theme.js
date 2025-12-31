/**
 * Phluowise Theme Management
 * Supports: dark, gray, light themes
 * Matches React Native themeContext.tsx exactly
 */

const THEMES = {
    dark: {
        backgroundColor: '#060606',
        backgroundSecondColor: '#1D1D1DF2',
        backgroundThirdColor: '#101010',
        bottomSheetColor: '#1D1D1D',
        buttonColor: '#007ACC66',
        buttonBorderColor: '#3B74FF',
        buttonSecondColor: '#F57D7D4D',
        buttonSecondBorderColor: '#F57D7D',
        inputFieldColor: '#22222233',
        inputFieldBorderColor: '#DADADA',
        inputFieldSecondColor: '#40444B66',
        inputFieldSecondBorderColor: '#808080',
        modelBackgroundColor: '#101010',
        modelBorderColor: '#DADADA',
        headerBg: '#101010',
        tabBg: '#101010'
    },
    gray: {
        backgroundColor: '#202225',
        backgroundSecondColor: '#40444B',
        backgroundThirdColor: '#292B2F',
        bottomSheetColor: '#40444B',
        buttonColor: '#007ACC',
        buttonBorderColor: '#007ACC',
        buttonSecondColor: '#F57D7D',
        buttonSecondBorderColor: '#F57D7D',
        inputFieldColor: '#40444B',
        inputFieldBorderColor: '#40444B',
        inputFieldSecondColor: '#40444B',
        inputFieldSecondBorderColor: '#40444B',
        modelBackgroundColor: '#40444B',
        modelBorderColor: '#40444B',
        headerBg: '#292B2F',
        tabBg: '#292B2F'
    },
    light: {
        backgroundColor: '#202225',
        backgroundSecondColor: '#40444B',
        backgroundThirdColor: '#292B2F',
        bottomSheetColor: '#40444B',
        buttonColor: '#007ACC',
        buttonBorderColor: '#007ACC',
        buttonSecondColor: '#F57D7D',
        buttonSecondBorderColor: '#F57D7D',
        inputFieldColor: '#40444B',
        inputFieldBorderColor: '#40444B',
        inputFieldSecondColor: '#40444B',
        inputFieldSecondBorderColor: '#40444B',
        modelBackgroundColor: '#40444B',
        modelBorderColor: '#40444B',
        headerBg: '#292B2F',
        tabBg: '#292B2F'
    }
};

// Get current theme
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// Save theme
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Update theme on page
function updateTheme(theme) {
    const colors = THEMES[theme] || THEMES.dark;

    // Remove existing theme classes
    document.body.classList.remove('dark-theme', 'gray-theme', 'light-theme');

    // Add new theme class
    document.body.classList.add(theme + '-theme');

    // Update CSS variables
    document.documentElement.style.setProperty('--bg-color', colors.backgroundColor);
    document.documentElement.style.setProperty('--bg-second', colors.backgroundSecondColor);
    document.documentElement.style.setProperty('--bg-third', colors.backgroundThirdColor);
    document.documentElement.style.setProperty('--header-bg', colors.headerBg);
    document.documentElement.style.setProperty('--tab-bg', colors.tabBg);
    document.documentElement.style.setProperty('--bottom-sheet', colors.bottomSheetColor);
    document.documentElement.style.setProperty('--model-bg', colors.modelBackgroundColor);
    document.documentElement.style.setProperty('--model-border', colors.modelBorderColor);

    // Save to localStorage
    saveTheme(theme);

    // Update body background
    document.body.style.backgroundColor = colors.backgroundColor;

    // Update header if exists
    const headerBar = document.querySelector('.header-bar');
    if (headerBar) {
        headerBar.style.backgroundColor = colors.headerBg;
    }

    // Update tab bar if exists
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) {
        tabBar.style.backgroundColor = colors.tabBg;
    }
}

// Initialize theme on page load
function initTheme() {
    const theme = getCurrentTheme();
    updateTheme(theme);
}

// Set greeting based on time of day
function setGreeting() {
    const hour = new Date().getHours();
    const userName = localStorage.getItem('userName') || 'USER';
    let greeting = '';

    if (hour >= 0 && hour < 12) {
        greeting = `Good Morning, ${userName.toUpperCase()}`;
    } else if (hour >= 12 && hour < 18) {
        greeting = `Good Afternoon, ${userName.toUpperCase()}`;
    } else {
        greeting = `Good Evening, ${userName.toUpperCase()}`;
    }

    const greetingEl = document.getElementById('greetingText');
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
}

// Theme Modal HTML template
function getThemeModalHTML() {
    const currentTheme = getCurrentTheme();

    return `
    <div id="themeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style="display: none;">
        <div class="w-full h-full flex flex-col items-center justify-center p-5">
            <!-- Back Button -->
            <div class="w-full max-w-[400px] mb-4">
                <button onclick="closeThemeModal()" class="w-10 h-10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
            </div>
            
            <!-- Theme Options Container -->
            <div class="w-full max-w-[400px] rounded-[15px] overflow-hidden border" 
                 style="height: 301px; border-color: var(--model-border, #DADADA);">
                
                <!-- Choose Theme Header -->
                <div class="h-[60px] flex items-center px-6 border-b border-[#3A3B3F]"
                     style="background-color: var(--bg-third, #101010);">
                    <span class="text-white text-lg font-semibold">Choose Theme</span>
                </div>
                
                <!-- Light Option -->
                <button onclick="selectTheme('light')" 
                        class="w-full h-[60px] flex items-center px-6 gap-5 border-b border-[#3A3B3F]"
                        style="background-color: var(--bg-third, #101010);">
                    <div class="w-6 h-6 rounded-full bg-[#40444B]"></div>
                    <span class="${currentTheme === 'light' ? 'text-white' : 'text-white/50'} text-lg font-semibold">Light</span>
                </button>
                
                <!-- Gray Option -->
                <button onclick="selectTheme('gray')" 
                        class="w-full h-[60px] flex items-center px-6 gap-5 border-b border-[#3A3B3F]"
                        style="background-color: var(--bg-third, #101010);">
                    <div class="w-6 h-6 rounded-full bg-[#40444B]"></div>
                    <span class="${currentTheme === 'gray' ? 'text-white' : 'text-white/50'} text-lg font-semibold">Gray</span>
                </button>
                
                <!-- Dark Option -->
                <button onclick="selectTheme('dark')" 
                        class="w-full h-[60px] flex items-center px-6 gap-5 border-b border-[#3A3B3F]"
                        style="background-color: var(--bg-third, #101010);">
                    <div class="w-6 h-6 rounded-full bg-[#40444B]"></div>
                    <span class="${currentTheme === 'dark' ? 'text-white' : 'text-white/50'} text-lg font-semibold">Dark</span>
                </button>
                
                <!-- System Default Option -->
                <button onclick="selectTheme('dark')" 
                        class="w-full h-[60px] flex items-center px-6 gap-5"
                        style="background-color: var(--bg-third, #101010);">
                    <div class="w-6 h-6 rounded-full bg-[#40444B]"></div>
                    <span class="text-white/50 text-lg font-semibold">System Default</span>
                </button>
                
            </div>
        </div>
    </div>
    `;
}

// Open theme modal
function openThemeModal() {
    let modal = document.getElementById('themeModal');

    if (!modal) {
        // Create modal if it doesn't exist
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = getThemeModalHTML();
        document.body.appendChild(modalContainer.firstElementChild);
        modal = document.getElementById('themeModal');
    }

    // Update highlighting based on current theme
    updateThemeModalHighlight();

    modal.style.display = 'flex';
}

// Close theme modal
function closeThemeModal() {
    const modal = document.getElementById('themeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Select theme from modal
function selectTheme(theme) {
    updateTheme(theme);
    updateThemeModalHighlight();

    // Update theme display in menu if exists
    const themeDisplay = document.getElementById('currentThemeDisplay');
    if (themeDisplay) {
        themeDisplay.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }

    closeThemeModal();
}

// Update theme modal highlighting
function updateThemeModalHighlight() {
    const currentTheme = getCurrentTheme();
    const modal = document.getElementById('themeModal');

    if (!modal) return;

    // Get all theme buttons (skip the header which is index 0)
    const buttons = modal.querySelectorAll('button[onclick^="selectTheme"]');

    buttons.forEach(button => {
        const themeName = button.getAttribute('onclick').match(/'(\w+)'/)?.[1];
        const span = button.querySelector('span');

        if (span) {
            if (themeName === currentTheme) {
                span.classList.remove('text-white/50');
                span.classList.add('text-white');
            } else {
                span.classList.remove('text-white');
                span.classList.add('text-white/50');
            }
        }
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    setGreeting();
});
