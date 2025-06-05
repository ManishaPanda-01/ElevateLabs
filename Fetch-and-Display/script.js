let userData = [];
        
        async function fetchUsers() {
            const fetchBtn = document.getElementById('fetchBtn');
            const reloadBtn = document.getElementById('reloadBtn');
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const userContainer = document.getElementById('userContainer');
            
            // Show loading state
            fetchBtn.disabled = true;
            loading.style.display = 'block';
            error.style.display = 'none';
            userContainer.innerHTML = '';
            
            try {
                // Fetch data from API
                console.log('🔄 Starting fetch request...');
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                // Check if response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // Parse JSON response
                userData = await response.json();
                console.log('✅ Data fetched successfully:', userData);
                console.log('📊 Number of users:', userData.length);
                
                // Display users
                displayUsers(userData);
                
                // 🎯 THIS IS WHERE RELOAD BUTTON APPEARS - Only after successful fetch!
                fetchBtn.style.display = 'none';
                reloadBtn.style.display = 'inline-block';
                console.log('🔄 Reload button is now visible!');
                
            } catch (err) {
                // Handle errors - Reload button will NOT appear if there's an error
                console.error('❌ Error fetching users:', err);
                showError(`Failed to fetch user data: ${err.message}`);
                console.log('🚫 Reload button stays hidden due to error');
            } finally {
                // Hide loading state
                loading.style.display = 'none';
                fetchBtn.disabled = false;
            }
        }
        
        function displayUsers(users) {
            const userContainer = document.getElementById('userContainer');
            userContainer.innerHTML = '';
            
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                
                userCard.innerHTML = `
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">📧 ${user.email}</div>
                    <div class="user-address">
                        📍 ${user.address.street}, ${user.address.suite}<br>
                        ${user.address.city}, ${user.address.zipcode}
                    </div>
                `;
                
                userContainer.appendChild(userCard);
            });
        }
        
        function showError(message) {
            const error = document.getElementById('error');
            error.textContent = message;
            error.style.display = 'block';
        }
        
        function reloadData() {
            fetchUsers();
        }
        