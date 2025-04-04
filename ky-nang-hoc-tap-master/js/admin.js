const usersUrl = 'http://localhost:5000/users'; // Update this with the correct URL

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch(usersUrl);
        const users = await response.json();
        populateUsersTable(users);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
}

function populateUsersTable(users) {
    const usersTableBody = document.querySelector('#users-table tbody');
    usersTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.fullname}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>
                <select data-user-id="${user.id}" class="role-select">
                    <option value="guest" ${user.role === 'guest' ? 'selected' : ''}>Guest</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
            </td>
            <td><button data-user-id="${user.id}" class="save-role-btn">Lưu</button></td>
        `;

        usersTableBody.appendChild(row);
    });

    document.querySelectorAll('.save-role-btn').forEach(button => {
        button.addEventListener('click', handleSaveRole);
    });
}

async function handleSaveRole(event) {
    const userId = event.target.getAttribute('data-user-id');
    const roleSelect = document.querySelector(`.role-select[data-user-id="${userId}"]`);
    const newRole = roleSelect.value;

    try {
        const response = await fetch(`${usersUrl}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            alert('Cập nhật vai trò thành công');
        } else {
            alert('Cập nhật vai trò thất bại');
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật vai trò:', error);
        alert('Cập nhật vai trò thất bại');
    }
}