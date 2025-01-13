fetch('/orders')
    .then(response => response.json())
    .then(orders => {
        const tableBody = document.querySelector('#ordersTable tbody');
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.playernames_ || 'N/A'}</td>
                <td>${order.teammatereq_ || 'N/A'}</td>
                <td>${order.over14_ || 'N/A'}</td>
                <td>${order.teamname_ || 'N/A'}</td>
                <td>${order.billing_email}</td>
                <td>${order.billing_phone}</td>
                <td>${order.id}</td>
                <td>${order.date_paid || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching orders:', error));
