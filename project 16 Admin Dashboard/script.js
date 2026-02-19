const dashboardData = {
    stats: {
        users: 12458,
        revenue: 84250,
        sales: 3842,
        performance: 87
    },
    lineChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [30, 45, 38, 55, 48, 65]
    },
    barChartData: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        values: [45, 62, 38, 55]
    },
    pieChartData: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        values: [55, 30, 15],
        colors: ['#4a90e2', '#50c878', '#f39c12']
    },
    transactions: [
        { id: 1001, name: 'John Doe', email: 'john@example.com', amount: 1250, status: 'completed', date: '2024-01-15' },
        { id: 1002, name: 'Jane Smith', email: 'jane@example.com', amount: 890, status: 'pending', date: '2024-01-16' },
        { id: 1003, name: 'Bob Johnson', email: 'bob@example.com', amount: 2100, status: 'completed', date: '2024-01-17' },
        { id: 1004, name: 'Alice Brown', email: 'alice@example.com', amount: 450, status: 'failed', date: '2024-01-18' },
        { id: 1005, name: 'Charlie Wilson', email: 'charlie@example.com', amount: 1680, status: 'completed', date: '2024-01-19' },
        { id: 1006, name: 'Diana Davis', email: 'diana@example.com', amount: 920, status: 'pending', date: '2024-01-20' },
        { id: 1007, name: 'Edward Miller', email: 'edward@example.com', amount: 1340, status: 'completed', date: '2024-01-21' },
        { id: 1008, name: 'Fiona Garcia', email: 'fiona@example.com', amount: 780, status: 'completed', date: '2024-01-22' }
    ]
};

let filteredTransactions = [...dashboardData.transactions];

function initDashboard() {
    renderCards();
    renderCharts();
    renderTable(filteredTransactions);
    setupEventListeners();
}

function renderCards() {
    const cards = [
        { id: 'card1', value: dashboardData.stats.users.toLocaleString() },
        { id: 'card2', value: `$${dashboardData.stats.revenue.toLocaleString()}` },
        { id: 'card3', value: dashboardData.stats.sales.toLocaleString() },
        { id: 'card4', value: `${dashboardData.stats.performance}%` }
    ];

    cards.forEach(card => {
        const element = document.getElementById(card.id);
        const valueElement = element.querySelector('.card-value');
        animateValue(valueElement, 0, card.value);
    });
}

function animateValue(element, start, end) {
    const isNumber = !isNaN(parseFloat(end.replace(/[^0-9.-]/g, '')));
    if (!isNumber) {
        element.textContent = end;
        return;
    }

    const numericEnd = parseFloat(end.replace(/[^0-9.-]/g, ''));
    const prefix = end.match(/^\$/)?.[0] || '';
    const suffix = end.match(/%$/)?.[0] || '';
    const duration = 1000;
    const steps = 50;
    const increment = numericEnd / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        
        if (step >= steps) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, duration / steps);
}

function renderCharts() {
    renderLineChart();
    renderBarChart();
    renderPieChart();
}

function renderLineChart() {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    const data = dashboardData.lineChartData;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = Math.max(...data.values);
    const stepX = chartWidth / (data.labels.length - 1);
    const stepY = chartHeight / maxValue;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.values.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = canvas.height - padding - value * stepY;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    data.values.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = canvas.height - padding - value * stepY;
        ctx.fillStyle = '#4a90e2';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    data.labels.forEach((label, index) => {
        const x = padding + stepX * index;
        ctx.fillText(label, x, canvas.height - 10);
    });
}

function renderBarChart() {
    const canvas = document.getElementById('barChart');
    const ctx = canvas.getContext('2d');
    const data = dashboardData.barChartData;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = Math.max(...data.values);
    const barWidth = chartWidth / data.labels.length * 0.6;
    const barSpacing = chartWidth / data.labels.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.values.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + barSpacing * index + (barSpacing - barWidth) / 2;
        const y = canvas.height - padding - barHeight;
        
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(1, '#50c878');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + barWidth / 2, y - 5);
    });

    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    data.labels.forEach((label, index) => {
        const x = padding + barSpacing * index + barSpacing / 2;
        ctx.fillText(label, x, canvas.height - 10);
    });
}

function renderPieChart() {
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    const data = dashboardData.pieChartData;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const total = data.values.reduce((a, b) => a + b, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentAngle = -Math.PI / 2;

    data.values.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        ctx.fillStyle = data.colors[index];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${value}%`, labelX, labelY);

        currentAngle += sliceAngle;
    });

    const legendX = 20;
    let legendY = canvas.height - data.labels.length * 25;
    
    data.labels.forEach((label, index) => {
        ctx.fillStyle = data.colors[index];
        ctx.fillRect(legendX, legendY, 15, 15);
        
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(label, legendX + 20, legendY + 12);
        
        legendY += 25;
    });
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    data.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.name}</td>
            <td>${transaction.email}</td>
            <td>$${transaction.amount.toLocaleString()}</td>
            <td><span class="status ${transaction.status}">${transaction.status}</span></td>
            <td>${transaction.date}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterTable(searchTerm) {
    filteredTransactions = dashboardData.transactions.filter(transaction => 
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderTable(filteredTransactions);
}

function sortTable(sortBy) {
    if (!sortBy) {
        filteredTransactions = [...dashboardData.transactions];
    } else {
        filteredTransactions.sort((a, b) => {
            if (sortBy === 'amount') return b[sortBy] - a[sortBy];
            return a[sortBy].toString().localeCompare(b[sortBy].toString());
        });
    }
    renderTable(filteredTransactions);
}

function setupEventListeners() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const page = item.querySelector('.nav-text').textContent;
            switchPage(page);
        });
    });

    const searchTable = document.getElementById('searchTable');
    searchTable.addEventListener('input', (e) => {
        filterTable(e.target.value);
    });

    const sortTableSelect = document.getElementById('sortTable');
    sortTableSelect.addEventListener('change', (e) => {
        sortTable(e.target.value);
    });

    window.addEventListener('resize', () => {
        renderCharts();
    });
}

function switchPage(page) {
    document.querySelector('.header h1').textContent = page;
    
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('dashboardCharts').style.display = 'none';
    document.getElementById('dashboardTable').style.display = 'none';
    document.getElementById('reportsPage').style.display = 'none';
    document.getElementById('usersPage').style.display = 'none';
    document.getElementById('settingsPage').style.display = 'none';
    
    if (page === 'Dashboard') {
        document.getElementById('dashboardPage').style.display = 'grid';
        document.getElementById('dashboardCharts').style.display = 'grid';
        document.getElementById('dashboardTable').style.display = 'block';
    } else if (page === 'Reports') {
        document.getElementById('reportsPage').style.display = 'block';
    } else if (page === 'Users') {
        document.getElementById('usersPage').style.display = 'block';
    } else if (page === 'Settings') {
        document.getElementById('settingsPage').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);


function viewReport(reportName) {
    const reportData = {
        'Monthly Sales': 'Total Sales: $125,000 | Growth: +15% | Top Product: Product A',
        'User Activity': 'Active Users: 8,542 | New Users: 1,234 | Retention Rate: 78%',
        'Revenue Analysis': 'Total Revenue: $84,250 | Profit Margin: 32% | ROI: 145%',
        'Performance Metrics': 'System Uptime: 99.8% | Response Time: 120ms | Success Rate: 97%'
    };
    
    document.getElementById('reportTitle').textContent = reportName + ' Report';
    document.getElementById('reportContent').textContent = reportData[reportName];
    document.getElementById('reportViewer').style.display = 'block';
}

function closeReport() {
    document.getElementById('reportViewer').style.display = 'none';
}

function editUser(userName) {
    const newRole = prompt('Enter new role for ' + userName + ':', 'User');
    if (newRole) {
        alert('Role updated to: ' + newRole);
    }
}

function removeUser(button) {
    if (confirm('Are you sure you want to remove this user?')) {
        button.parentElement.remove();
    }
}

function toggleSetting(button) {
    if (button.classList.contains('enabled')) {
        button.classList.remove('enabled');
        button.classList.add('disabled');
        button.textContent = 'Disabled';
    } else {
        button.classList.remove('disabled');
        button.classList.add('enabled');
        button.textContent = 'Enabled';
    }
}
