// ===================================================================
//  MODULE: CHRONICLE (js/modules/chronicle.js)
// ===================================================================

import {
    $, $$, AppState, CHRONICLE_DATA, EDITABLE_CONFIG,
    apiAddItem, apiUpdateItem, apiDeleteItem, findImageWithExtension
} from '../common.js';

// --- Local state for this module ---
let counterInterval;
let prophecyInterval;
let currentDisplayedMilestoneIndex; // State variable to track which milestone is currently displayed

const milestones = [ // Moved to module scope
    { days: 100, title: "100 Days of Us", icon: "💯", color: "#FFD700" },
    { days: 365, title: "One Year Together", icon: "🎊", color: "#FF1493" },
    { days: 500, title: "500 Days Milestone", icon: "⭐", color: "#9370DB" },
    { days: 730, title: "Two Years Strong", icon: "💝", color: "#FF69B4" },
    { days: 1000, title: "1000 Days of Love", icon: "👑", color: "#FFD700" },
    { days: 1095, title: "Three Years Together", icon: "💖", color: "#FF1493" },
    { days: 1460, title: "Four Years & Counting", icon: "🎉", color: "#FF6347" },
    { days: 1500, title: "1500 Day Celebration", icon: "🎇", color: "#FF4500" },
    { days: 1825, title: "Five Years of Us", icon: "🏆", color: "#FFD700" },
    { days: 2000, title: "2000 Days of Adventure", icon: "🚀", color: "#1E90FF" },
    { days: 2555, title: "Seven Years in Heaven", icon: "🌌", color: "#9370DB" },
    { days: 3650, title: "A Decade of Devotion", icon: "💎", color: "#00FFFF" }
];

// --- HTML Template ---

function getChronicleOfUsHTML() {
    return `
    <div id="chronicle-panel" class="content-panel active">
        <h2 class="panel-header">The Chronicle of Us</h2>
        <p class="panel-subheader">A living testament to our journey, measured in moments and marked by falling stars.</p>
        
        <div id="relationship-counter-detailed">
            <div class="counter-unit"><span id="rel-years">0</span>Years</div>
            <div class="counter-unit"><span id="rel-months">0</span>Months</div>
            <div class="counter-unit"><span id="rel-weeks">0</span>Weeks</div>
            <div class="counter-unit"><span id="rel-days">0</span>Days</div>
            <div class="counter-unit"><span id="rel-hours">0</span>Hours</div>
            <div class="counter-unit"><span id="rel-minutes">0</span>Minutes</div>
            <div class="counter-unit"><span id="rel-seconds">0</span>Seconds</div>
            <div class="counter-unit"><span id="rel-ms">000</span>Milliseconds</div>
        </div>
        <div class="prophecy-container"><p id="prophecy-text"></p></div>
        <hr>
        <div class="timeline-calendar-container">
            <div class="calendar-left-panel">
                <div class="calendar-header">
                    <button id="cal-prev-month">‹</button>
                    <h3 id="cal-month-year"></h3>
                    <button id="cal-next-month">›</button>
                </div>
                <div class="calendar-grid-header">
                    <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                </div>
                <div class="calendar-grid-body" id="cal-body"></div>
            </div>
            <div class="calendar-right-panel">
                <div class="date-display">
                    <div id="cal-selected-day-num">--</div>
                    <div>
                        <span id="cal-selected-day-name">Select a Date</span>
                        <div class="weather">32° ☀️ Sunny</div>
                    </div>
                </div>
                <div id="event-details-container"></div>
                <div class="timeline-controls">
                    <button id="timeline-prev-event" class="btn">‹ Previous Event</button>
                    <button id="timeline-next-event" class="btn">Next Event ›</button>
                </div>
                <div class="timeline-actions">
                    <button id="add-timeline-event-btn" class="btn primary">Add New Timeline Event</button>
                </div>
            </div>
        </div>
        <hr>
        <div class="then-now-container">
            <h3 class="panel-header" style="font-size: 2rem; text-align: center;">A Glimpse Through Time</h3>
             <p class="panel-subheader" style="text-align: center;">From past to present, our story unfolds.</p>
            <div class="comparison-slider" id="comparison-slider">
                <img src="" class="img-bottom" alt="Then photo" id="then-vs-now-then-img">
                <img src="" class="img-top" alt="Now photo" id="then-vs-now-now-img">
                <div class="slider-line" id="slider-line"></div>
                <div class="slider-buttons">
                    <button id="then-btn" class="btn">THEN</button>
                    <button id="now-btn" class="btn">NOW</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// 1. MILESTONE CELEBRATIONS
// Add this to your chronicle.js after parseAndSortEvents()

function calculateMilestones() {
    const start = EDITABLE_CONFIG.relationshipStart;
    const now = new Date();
    const daysTogether = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    
    const milestones = [
        { days: 100, title: "100 Days of Us", icon: "💯", color: "#FFD700" },
        { days: 365, title: "One Year Together", icon: "🎊", color: "#FF1493" },
        { days: 500, title: "500 Days Milestone", icon: "⭐", color: "#9370DB" },
        { days: 730, title: "Two Years Strong", icon: "💝", color: "#FF69B4" },
        { days: 1000, title: "1000 Days of Love", icon: "👑", color: "#FFD700" },
        { days: 1095, title: "Three Years Together", icon: "💖", color: "#FF1493" },
        { days: 1460, title: "Four Years & Counting", icon: "🎉", color: "#FF6347" },
        { days: 1500, title: "1500 Day Celebration", icon: "🎇", color: "#FF4500" },
        { days: 1825, title: "Five Years of Us", icon: "🏆", color: "#FFD700" },
        { days: 2000, title: "2000 Days of Adventure", icon: "🚀", color: "#1E90FF" },
        { days: 2555, title: "Seven Years in Heaven", icon: "🌌", color: "#9370DB" },
        { days: 3650, title: "A Decade of Devotion", icon: "💎", color: "#00FFFF" }
    ];
    
    const upcoming = milestones.find(m => daysTogether < m.days);
    const lastAchieved = milestones.filter(m => daysTogether >= m.days).pop();
    
    return { daysTogether, upcoming, lastAchieved };
}

function renderMilestoneTracker() {
    const { daysTogether, upcoming, lastAchieved } = calculateMilestones();
    
    if (milestones.length === 0 || currentDisplayedMilestoneIndex === undefined || currentDisplayedMilestoneIndex === -1) return '';

    const displayedMilestone = milestones[currentDisplayedMilestoneIndex];
    if (!displayedMilestone) return '';

    const daysUntil = displayedMilestone.days - daysTogether;

    // Calculate progress relative to the milestone *before* the displayed one
    const previousMilestoneInList = milestones[currentDisplayedMilestoneIndex - 1];
    const progressBaseDays = previousMilestoneInList ? previousMilestoneInList.days : 0;
    
    let progress = 0;
    if (displayedMilestone.days > progressBaseDays) {
        progress = ((daysTogether - progressBaseDays) / (displayedMilestone.days - progressBaseDays)) * 100;
    }
    
    // If progress is less than 1%, show a little bit of the bar so it's visible
    if (progress > 0 && progress < 1) progress = 1;
    if (progress > 100) progress = 100; // Cap progress at 100%
    
    const hasPrevious = currentDisplayedMilestoneIndex > 0;
    const hasNext = currentDisplayedMilestoneIndex < milestones.length - 1;

    // Determine the correct header text
    const headerText = daysUntil > 0 ? "Upcoming Milestone" : "Achieved Milestone";


    return `
        <div class="milestone-tracker">
            <div class="milestone-header">
                <h3>${headerText}</h3>
                <span class="milestone-icon">${displayedMilestone.icon}</span>
            </div>
            <div class="milestone-title">${displayedMilestone.title}</div>
            <div class="milestone-progress-bar">
                <div class="milestone-progress-fill" style="width: ${progress}%; background: ${displayedMilestone.color}"></div>
            </div>
            <div class="milestone-info">
                <span>${daysUntil > 0 ? `${daysUntil} days remaining` : 'Achieved!'}</span>
                <span>${daysTogether} days together</span>
            </div>
            <div class="milestone-navigation">
                <button class="btn milestone-nav-btn" id="prev-milestone-btn" ${!hasPrevious ? 'disabled' : ''}>← Previous</button>
                <button class="btn milestone-nav-btn" id="next-milestone-btn" ${!hasNext ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;
}

function showPreviousMilestone() {
    if (currentDisplayedMilestoneIndex > 0) {
        currentDisplayedMilestoneIndex--;
        reRenderMilestoneTracker();
    }
}

function showNextMilestone() {
    if (currentDisplayedMilestoneIndex < milestones.length - 1) {
        currentDisplayedMilestoneIndex++;
        reRenderMilestoneTracker();
    }
}

// Helper to re-render just the milestone tracker
function reRenderMilestoneTracker() {
    const trackerEl = document.querySelector('.milestone-tracker');
    if (trackerEl) {
        trackerEl.outerHTML = renderMilestoneTracker(); // Replace the entire tracker HTML
        attachMilestoneNavListeners(); // Re-attach listeners after re-rendering
    }
}

function attachMilestoneNavListeners() {
    const prevBtn = $('prev-milestone-btn');
    const nextBtn = $('next-milestone-btn');
    if (prevBtn) prevBtn.onclick = showPreviousMilestone;
    if (nextBtn) nextBtn.onclick = showNextMilestone;
}

// 2. MEMORY HEATMAP - Show activity over the year
function generateMemoryHeatmap() {
    const heatmapData = {};
    const now = new Date();
    const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    
    // Initialize all days with 0
    for (let d = new Date(yearAgo); d <= now; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        heatmapData[key] = 0;
    }
    
    // Count events per day
    AppState.chronicleEvents.forEach(event => {
        const key = event.date.toISOString().split('T')[0];
        if (heatmapData[key] !== undefined) {
            heatmapData[key]++;
        }
    });
    
    return heatmapData;
}

function renderMemoryHeatmap() {
    const heatmapData = generateMemoryHeatmap();
    const now = new Date();
    const todayKey = now.toISOString().split('T')[0]; // Get today's date string for highlighting
    const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    
    let html = '<div class="memory-heatmap"><h3>Our Year in Memories</h3><div class="heatmap-grid">';
    
    for (let d = new Date(yearAgo); d <= now; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        const isToday = key === todayKey ? 'today' : ''; // Add 'today' class if it's the current day
        const count = heatmapData[key] || 0;
        const intensity = count === 0 ? 'empty' : count === 1 ? 'low' : count === 2 ? 'medium' : 'high';
        const readableDate = new Date(key).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        html += `<div class="heatmap-day ${intensity} ${isToday}" title="${readableDate}: ${count} event(s)" data-date="${key}"></div>`;
    }
    
    html += '</div><div class="heatmap-legend"><span>Less</span>';
    html += '<div class="legend-box empty"></div>';
    html += '<div class="legend-box low"></div>';
    html += '<div class="legend-box medium"></div>';
    html += '<div class="legend-box high"></div>';
    html += '<span>More</span></div></div>';
    
    return html;
}

// 3. ANNIVERSARY COUNTDOWN
function getNextAnniversary() {
    const start = EDITABLE_CONFIG.relationshipStart;
    const now = new Date();
    const thisYear = new Date(now.getFullYear(), start.getMonth(), start.getDate());
    const nextYear = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate());
    
    const nextAnniversary = thisYear > now ? thisYear : nextYear;
    const daysUntil = Math.ceil((nextAnniversary - now) / (1000 * 60 * 60 * 24));
    const yearsCount = nextAnniversary.getFullYear() - start.getFullYear();
    
    return { date: nextAnniversary, daysUntil, yearsCount };
}

function renderAnniversaryCountdown() {
    const { date, daysUntil, yearsCount } = getNextAnniversary();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return `
        <div class="anniversary-countdown">
            <div class="anniversary-ring">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" class="ring-bg"/>
                    <circle cx="50" cy="50" r="45" class="ring-progress" 
                            style="stroke-dasharray: ${(365 - daysUntil) / 365 * 283} 283"/>
                </svg>
                <div class="anniversary-center">
                    <div class="anniversary-days">${daysUntil}</div>
                    <div class="anniversary-label">days</div>
                </div>
            </div>
            <div class="anniversary-details">
                <h3>Next Anniversary</h3>
                <p class="anniversary-date">${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
                <p class="anniversary-milestone">${yearsCount} ${yearsCount === 1 ? 'Year' : 'Years'} Together</p>
            </div>
        </div>
    `;
}

// 4. MEMORY STATISTICS
function calculateMemoryStats() {
    const events = AppState.chronicleEvents;
    const totalEvents = events.length;
    
    // Most active month
    const monthCounts = {};
    events.forEach(e => {
        const month = e.date.getMonth();
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    // Find the most active month, handling the case where there are no events.
    let mostActiveMonth = 'N/A';
    if (Object.keys(monthCounts).length > 0) {
        const mostActiveMonthIndex = Object.keys(monthCounts).reduce((a, b) => 
            monthCounts[a] > monthCounts[b] ? a : b
        );
        mostActiveMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mostActiveMonthIndex];
    }
    
    // Events this year
    const thisYear = new Date().getFullYear();
    const thisYearEvents = events.filter(e => e.date.getFullYear() === thisYear).length;
    
    // Average events per month
    const now = new Date();
    const firstEvent = events[0]?.date || new Date();
    // More accurate month calculation
    const yearDiff = now.getFullYear() - firstEvent.getFullYear();
    const monthDiff = now.getMonth() - firstEvent.getMonth();
    const monthsSince = Math.max(1, yearDiff * 12 + monthDiff + 1); // +1 to be inclusive
    const avgPerMonth = totalEvents > 0 ? (totalEvents / monthsSince).toFixed(1) : '0.0';
    
    return {
        total: totalEvents,
        thisYear: thisYearEvents, // Correct
        mostActiveMonth: mostActiveMonth, // Correct
        avgPerMonth: avgPerMonth // Correct
    };
}

function renderMemoryStats() {
    const stats = calculateMemoryStats();
    
    return `
        <div class="memory-stats">
            <h3>Our Story in Numbers</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-value">${stats.total}</div>
                    <div class="stat-label">Total Memories</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✨</div>
                    <div class="stat-value">${stats.thisYear}</div>
                    <div class="stat-label">This Year</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value">${stats.mostActiveMonth}</div>
                    <div class="stat-label">Most Active</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${stats.avgPerMonth}</div>
                    <div class="stat-label">Per Month</div>
                </div>
            </div>
        </div>
    `;
}

// 5. TIMELINE VISUALIZATION
function renderTimelineVisualization() {
    const events = AppState.chronicleEvents.slice(-10); // Last 10 events
    
    let html = '<div class="timeline-visualization"><h3>Recent Journey</h3><div class="timeline-line">';
    
    events.forEach((event, idx) => {
        const side = idx % 2 === 0 ? 'left' : 'right';
        html += `
            <div class="timeline-node ${side}">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <div class="timeline-date">${event.date.toLocaleDateString()}</div>
                    <div class="timeline-event-title">${event.title}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    return html;
}

// 6. ADD PARTICLE EFFECT ON SPECIAL DATES
function addSpecialDateParticles() {
    const today = new Date();
    const start = EDITABLE_CONFIG.relationshipStart;
    
    // Check if today is anniversary
    if (today.getMonth() === start.getMonth() && today.getDate() === start.getDate()) {
        createHeartParticles();
    }
}

function createHeartParticles() {
    const container = document.querySelector('#chronicle-panel');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (2 + Math.random() * 3) + 's';
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

// --- Module-Specific Logic ---

let currentEventIndex = 0;
let displayedDate = new Date();
const PROPHECIES = [ 
    "In the infinite scroll of the cosmos, our chapter is written in starlight.", 
    "Two souls, one orbit, bound by a gravity stronger than any star.", 
    "Fate whispered your name in the solar winds, and my heart knew to listen.", 
    "Every shared glance is a supernova, birthing new galaxies within us.", 
    "Like twin stars, we dance through the darkness, forever illuminating each other's path." 
];
let currentProphecyIndex = 0;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateProphecy() {
    const prophecyEl = $('prophecy-text');
    if (!prophecyEl) return;
    prophecyEl.style.opacity = 0;
    setTimeout(() => {
        currentProphecyIndex = (currentProphecyIndex + 1) % PROPHECIES.length;
        prophecyEl.textContent = `"${PROPHECIES[currentProphecyIndex]}"`;
        prophecyEl.style.opacity = 1;
    }, 1000);
};

function parseAndSortEvents() {
    AppState.chronicleEvents = CHRONICLE_DATA.map(event => {

            // Fix for dates that are just "Jan 2020"
            const dateStr = event.year.split(' ').length === 2 ? `${event.year.split(' ')[0]} 15, ${event.year.split(' ')[1]}` : event.year;
        return { ...event, date: new Date(dateStr) };

    }).sort((a, b) => a.date - b.date);
};

/*
`Our Year in Memories` visualizes the number of events that occurred on each day of the past year. Each square in the grid represents a day, and the color intensity of the square indicates the number of events on that day. This provides a quick overview of when the most memories were created.
*/





function findLocation(desc) {
    if (desc.toLowerCase().includes('kyoto')) return 'Kyoto, Japan';
    if (desc.toLowerCase().includes('miyakonojo')) return 'Miyakonojo, Japan';
    return 'Our Memories';
};

function renderCalendarGrid() {
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();
    $('cal-month-year').textContent = `${monthNames[month]} ${year}`;
    const calBody = $('cal-body');
    calBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) { calBody.innerHTML += `<div class="calendar-day other-month"></div>`; }
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        const eventOnDay = AppState.chronicleEvents.find(e => e.date.getFullYear() === year && e.date.getMonth() === month && e.date.getDate() === day);
        if (eventOnDay) {
            dayEl.classList.add('has-event');
            dayEl.onclick = () => {
                const eventIndex = AppState.chronicleEvents.indexOf(eventOnDay);
                displayEvent(eventIndex);
            };
        }
        if (AppState.chronicleEvents[currentEventIndex] && day === AppState.chronicleEvents[currentEventIndex].date.getDate() && month === AppState.chronicleEvents[currentEventIndex].date.getMonth() && year === AppState.chronicleEvents[currentEventIndex].date.getFullYear()) {
            dayEl.classList.add('selected-day');
        }
        calBody.appendChild(dayEl);
    }
};

function renderEventDetails(event, index) {
    const date = event.date;
    $('cal-selected-day-num').textContent = date.getDate();
    $('cal-selected-day-name').textContent = dayNames[date.getDay()];
    const container = $('event-details-container');
    container.innerHTML = `
        <div class="event-card">
            <div class="event-card-header">
                <h4>${event.title}</h4>
                <div>
                    <button class="edit-event-btn" data-index="${index}" title="Edit">✏️</button>
                    <button class="delete-event-btn" data-index="${index}" title="Delete">🗑️</button>
                </div>
            </div>
            <p class="event-location">📍 ${findLocation(event.desc)}</p>
            <p class="event-description">${event.desc}</p>
        </div>`;
    container.querySelector('.edit-event-btn').onclick = () => openEventModal(index);
    container.querySelector('.delete-event-btn').onclick = () => deleteEvent(index);
};

function displayEvent(index) {
    if (index < 0 || index >= AppState.chronicleEvents.length) {
        console.warn("Invalid event index");
        return;
    }
    currentEventIndex = index;
    const event = AppState.chronicleEvents[index];
    displayedDate = new Date(event.date); 
    renderCalendarGrid();
    renderEventDetails(event, index);
};

function openEventModal(index = -1) {
    const title = $('timeline-modal-title');
    const dateInput = $('timeline-modal-date');
    const titleInput = $('timeline-modal-title-input');
    const descInput = $('timeline-modal-desc');
    const editIndexInput = $('timeline-modal-edit-index');
    if (index !== -1) {
        const event = AppState.chronicleEvents[index];
        title.textContent = 'Edit Timeline Event';
        dateInput.value = event.date.toISOString().split('T')[0];
        titleInput.value = event.title;
        descInput.value = event.desc;
        editIndexInput.value = index;
    } else {
        title.textContent = 'Add New Timeline Event';
        dateInput.value = new Date().toISOString().split('T')[0];
        titleInput.value = '';
        descInput.value = '';
        editIndexInput.value = -1;
    }
    $('timeline-event-modal').classList.add('active');
};

async function saveEvent() {
    const date = new Date($('timeline-modal-date').value); // Use local time
    const title = $('timeline-modal-title-input').value;
    const desc = $('timeline-modal-desc').value;
    const index = parseInt($('timeline-modal-edit-index').value, 10);
    
    if (!title || !desc) { alert('Please fill in all fields.'); return; }
    
    // Format date as YYYY-MM-DD string
    const dateString = date.toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD
    
    const eventData = { year: dateString, title, desc, icon: '🌟' };
    let savedEvent;

    if (index !== -1) {
        // Update existing event
        const eventId = AppState.chronicleEvents[index].id;
        savedEvent = await apiUpdateItem('timeline', eventId, eventData);
    } else {
        // Add new event
        savedEvent = await apiAddItem('timeline', eventData);
    }

    if (savedEvent) {
        // Re-parse and sort all events from scratch
        parseAndSortEvents();
        // Find the new index of the saved event
        const newIndex = AppState.chronicleEvents.findIndex(e => e.id === savedEvent.id);
        $('timeline-event-modal').classList.remove('active');
        displayEvent(newIndex !== -1 ? newIndex : 0);
    }
};

async function deleteEvent(index) {
    const eventToDelete = AppState.chronicleEvents[index];
    if (confirm(`Are you sure you want to delete "${eventToDelete.title}"?`)) {
        const success = await apiDeleteItem('timeline', eventToDelete.id);
        if (success) {
            // Re-parse and sort
            parseAndSortEvents();
            // Display the first event
            displayEvent(0);
        }
    }
};

function updateDetailedRelationshipCounter() {
    const start = EDITABLE_CONFIG.relationshipStart;
    const now = new Date();
    if(!start || isNaN(start.getTime())) return;
    
    let tempDate = new Date(start);
    let years = now.getFullYear() - tempDate.getFullYear();
    tempDate.setFullYear(tempDate.getFullYear() + years);
    if (tempDate > now) { years--; }

    tempDate = new Date(start);
    tempDate.setFullYear(start.getFullYear() + years);
    
    let months = now.getMonth() - tempDate.getMonth();
    if (months < 0) {
        months += 12;
    }
    
    tempDate.setMonth(tempDate.getMonth() + months);
    if (tempDate > now) {
        months--;
        if (months < 0) {
            months = 11;
            years--;
        }
    }

    tempDate = new Date(start);
    tempDate.setFullYear(start.getFullYear() + years);
    tempDate.setMonth(start.getMonth() + months);

    let days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    tempDate.setDate(tempDate.getDate() + days);

    let hours = Math.floor((now - tempDate) / (1000 * 60 * 60));
    tempDate.setHours(tempDate.getHours() + hours);

    let minutes = Math.floor((now - tempDate) / (1000 * 60));
    tempDate.setMinutes(tempDate.getMinutes() + minutes);

    let seconds = Math.floor((now - tempDate) / 1000);
    tempDate.setSeconds(tempDate.getSeconds() + seconds);

    let ms = now.getMilliseconds() - tempDate.getMilliseconds();
    if (ms < 0) ms += 1000;

    // Calculate total weeks and remaining days
    const totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    // Note: 'days' calculated above is the remainder of days after full months
    
    const yearsEl = $('rel-years'); if(yearsEl) yearsEl.textContent = years;
    const monthsEl = $('rel-months'); if(monthsEl) monthsEl.textContent = months;
    const weeksEl = $('rel-weeks'); if(weeksEl) weeksEl.textContent = weeks; // Show total weeks
    const daysEl = $('rel-days'); if(daysEl) daysEl.textContent = days; // Show remaining days
    const hoursEl = $('rel-hours'); if(hoursEl) hoursEl.textContent = hours;
    const minutesEl = $('rel-minutes'); if(minutesEl) minutesEl.textContent = minutes;
    const secondsEl = $('rel-seconds'); if(secondsEl) secondsEl.textContent = seconds;
    const msEl = $('rel-ms'); if(msEl) msEl.textContent = ms.toString().padStart(3, '0');
};

async function initThenNowSlider() {
    const slider = $('comparison-slider');
    if (!slider) return;
    const imagePairs = EDITABLE_CONFIG.thenVsNow_ImagePairs;
    if (!imagePairs || imagePairs.length === 0) { return; }
    
    const thenImgEl = $('then-vs-now-then-img');
    const nowImgEl = $('then-vs-now-now-img');
    const topImg = slider.querySelector('.img-top');
    const line = $('slider-line');
    const thenBtn = $('then-btn');
    const nowBtn = $('now-btn');
    
    const shuffleArray = (array) => { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } };
    
    const loadPairAtIndex = async (index, sidesToUpdate = 'both') => {
        const pair = imagePairs[index]; if (!pair) return;
        if (sidesToUpdate === 'both' || sidesToUpdate === 'then') {
            thenImgEl.style.opacity = 0; 
            const thenSrc = await findImageWithExtension(`photos/thenVsNow/${pair.then}`);
            thenImgEl.src = thenSrc; 
            thenImgEl.onload = () => thenImgEl.style.opacity = 1;
        }
        if (sidesToUpdate === 'both' || sidesToUpdate === 'now') {
            nowImgEl.style.opacity = 0; 
            const nowSrc = await findImageWithExtension(`photos/thenVsNow/${pair.now}`);
            nowImgEl.src = nowSrc; 
            nowImgEl.onload = () => nowImgEl.style.opacity = 1;
        }
    };
    
    const advancePair = () => {
        let nextIndex = AppState.thenNowState.currentIndexInAvailable + 1;
        if (nextIndex >= AppState.thenNowState.availableIndices.length) { shuffleArray(AppState.thenNowState.availableIndices); nextIndex = 0; }
        AppState.thenNowState.currentIndexInAvailable = nextIndex; return AppState.thenNowState.availableIndices[nextIndex];
    };
    
    const setSliderPosition = (percentage) => { 
        if (!topImg || !line) return; 
        line.style.left = `${percentage}%`; 
        topImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`; 
    };
    
    AppState.thenNowState.availableIndices = Array.from(Array(imagePairs.length).keys());
    shuffleArray(AppState.thenNowState.availableIndices);
    AppState.thenNowState.currentIndexInAvailable = 0; 
    AppState.thenNowState.lastReveal = null;
    const initialPairIndex = AppState.thenNowState.availableIndices[0];
    
    loadPairAtIndex(initialPairIndex, 'both');
    setSliderPosition(50);
    
    nowBtn.addEventListener('click', () => {
        setSliderPosition(100);
        if (AppState.thenNowState.lastReveal !== 'now') { 
            AppState.thenNowState.lastReveal = 'now'; 
            const nextPairIndex = advancePair(); 
            loadPairAtIndex(nextPairIndex, 'then'); 
        }
    });
    
    thenBtn.addEventListener('click', () => {
        setSliderPosition(0);
        if (AppState.thenNowState.lastReveal !== 'then') { 
            AppState.thenNowState.lastReveal = 'then'; 
            const nextPairIndex = advancePair(); 
            loadPairAtIndex(nextPairIndex, 'now'); 
        }
    });
};

// --- Public Module Functions ---

/**
 * Renders the Chronicle panel into the main content area.
 * @param {HTMLElement} mainContent - The element to render content into.
 */
export function render(mainContent) {
    mainContent.innerHTML = getChronicleOfUsHTML();
    
    let currentEventIndex = 0;
    let displayedDate = new Date();

    parseAndSortEvents();
    if (AppState.chronicleEvents.length > 0) {
        displayEvent(0);
    } else {
        renderCalendarGrid();
    }
    
    updateProphecy();
    initThenNowSlider();
    
    // 7. UPDATE YOUR RENDER FUNCTION
    
    // Initialize currentDisplayedMilestoneIndex
    const { daysTogether } = calculateMilestones();
    currentDisplayedMilestoneIndex = milestones.findIndex(m => daysTogether < m.days);
    if (currentDisplayedMilestoneIndex === -1 && milestones.length > 0) {
        currentDisplayedMilestoneIndex = milestones.length - 1; // If all achieved, show the last one
    } else if (milestones.length === 0) {
        currentDisplayedMilestoneIndex = -1; // No milestones at all
    }

    // Add milestone tracker
    const counterEl = document.querySelector('#relationship-counter-detailed');
    if (counterEl && currentDisplayedMilestoneIndex !== -1) { // Only render if there are milestones
        counterEl.insertAdjacentHTML('afterend', renderMilestoneTracker());
        attachMilestoneNavListeners(); // Attach listeners for the first time
    }
    
    // Add memory stats
    const prophecyEl = document.querySelector('.prophecy-container');
    if (prophecyEl) {
        prophecyEl.insertAdjacentHTML('afterend', renderMemoryStats());
    }
    
    // Add anniversary countdown
    const timelineContainer = document.querySelector('.timeline-calendar-container');
    if (timelineContainer) {
        timelineContainer.insertAdjacentHTML('beforebegin', renderAnniversaryCountdown());
    }
    
    // Add memory heatmap
    const thenNowContainer = document.querySelector('.then-now-container');
    if (thenNowContainer) {
        thenNowContainer.insertAdjacentHTML('beforebegin', renderMemoryHeatmap());
    }
    
    // Add timeline visualization
    if (thenNowContainer) {
        thenNowContainer.insertAdjacentHTML('beforebegin', renderTimelineVisualization());
    }
    
    // Add special date particles
    addSpecialDateParticles();
    
    // Add event listeners
    $('cal-prev-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() - 1); renderCalendarGrid(); };
    $('cal-next-month').onclick = () => { displayedDate.setMonth(displayedDate.getMonth() + 1); renderCalendarGrid(); };
    $('timeline-prev-event').onclick = () => displayEvent((currentEventIndex - 1 + AppState.chronicleEvents.length) % AppState.chronicleEvents.length);
    $('timeline-next-event').onclick = () => displayEvent((currentEventIndex + 1) % AppState.chronicleEvents.length);
    $('add-timeline-event-btn').onclick = () => openEventModal();
    $('timeline-modal-save').onclick = saveEvent;
    $('timeline-modal-cancel').onclick = () => $('timeline-event-modal').classList.remove('active');
    
    // Start intervals
    prophecyInterval = setInterval(updateProphecy, 8000);
    counterInterval = setInterval(updateDetailedRelationshipCounter, 50);
    updateDetailedRelationshipCounter();
}

/**
 * Cleans up intervals when the panel is unloaded.
 */
export function cleanup() {
    clearInterval(counterInterval);
    clearInterval(prophecyInterval);
    counterInterval = null;
    prophecyInterval = null;
}
