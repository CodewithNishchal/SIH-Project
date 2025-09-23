document.addEventListener('DOMContentLoaded', () => {

    const reportListContainer = document.getElementById('report-list-container');
    // If the list container doesn't exist on the page, do nothing.
    if (!reportListContainer) {
        return;
    }

    // --- HELPER FUNCTION ---
    // This function is a JavaScript mirror of your EJS partial. It takes a report
    // object and builds the exact same HTML structure.
    function createReportFeedItem(report) {
        const listItem = document.createElement('li');
        listItem.className = 'p-6 hover:bg-gray-50 transition-colors new-report-animation';

        const tagsHtml = report.tags.map(tag => `
            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tag.classes}">
                ${tag.text}
            </span>
        `).join('');

        // The WebSocket payload doesn't include a timestamp, so we create one here.
        const timestamp = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

        listItem.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <span class="h-10 w-10 rounded-full flex items-center justify-center font-semibold ${report.avatarClasses}">
                        ${report.initials}
                    </span>
                </div>
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold text-gray-800">${report.name}</p>
                            <div class="flex items-center text-sm text-gray-600 mt-1">
                                <svg class="w-4 h-4 mr-1.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                ${report.location}
                            </div>
                        </div>
                        <p class="text-xs text-gray-500 flex-shrink-0">${timestamp}</p>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">${tagsHtml}</div>
                    <div class="mt-4 flex justify-end">
                        <a href="/users/reports/${report.id}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${report.buttonClasses}">
                            View Report
                            <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
        return listItem;
    }

    // --- WebSocket Connection Logic ---
    const ws = new WebSocket(`ws://${window.location.host}`);

    ws.onopen = () => {
        console.log('✅ WebSocket connected for real-time report updates.');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'new-reports' && data.payload.length > 0) {
            console.log(`Received ${data.payload.length} new reports.`);
            
            // For each new report, create a new list item and add it to the top of the list
            data.payload.forEach(report => {
                const reportElement = createReportFeedItem(report);
                reportListContainer.prepend(reportElement);
            });
        }
    };

    ws.onclose = () => {
        console.log('❌ WebSocket disconnected.');
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };
});

