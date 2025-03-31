// AWS Configuration
        const REGION = 'eu-west-2';
        const IDENTITY_POOL_ID = 'eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275';
        const SURVIVOR_TABLE = 'GameSurvivors';
        const PERKS_TABLE = 'GamePerks';
        
        // Initialize AWS SDK
        AWS.config.region = REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IDENTITY_POOL_ID
        });
        
        // Initialize DynamoDB
        const docClient = new AWS.DynamoDB.DocumentClient();
        
        // Data storage
        let allSurvivors = [];
        let allPerks = [];
        
        // Fetch data from both tables
        async function fetchData() {
            try {
                // Show loading message
                document.getElementById('survivor-container').innerHTML = '<div class="loading">Loading survivors from the fog...</div>';
                
                // Fetch survivors
                const survivorParams = {
                    TableName: SURVIVOR_TABLE
                };
                
                const survivorResult = await docClient.scan(survivorParams).promise();
                
                if (!survivorResult.Items || survivorResult.Items.length === 0) {
                    showError("No survivors found in the database.");
                    return;
                }
                
                allSurvivors = survivorResult.Items.sort((a, b) => {
                    return a.SurvivorNumber - b.SurvivorNumber;
                });
                
                // Fetch perks
                const perkParams = {
                    TableName: PERKS_TABLE
                };
                
                const perkResult = await docClient.scan(perkParams).promise();
                
                if (perkResult.Items && perkResult.Items.length > 0) {
                    allPerks = perkResult.Items;
                }
                
                // Display data
                displaySurvivors();
            } catch (error) {
                console.error("Error fetching data:", error);
                showError("Failed to fetch data from the database. Please try again later.");
            }
        }
        
        // Display survivors on the page
        function displaySurvivors() {
            const container = document.getElementById('survivor-container');
            container.innerHTML = ''; // Clear loading message
            
            const survivorList = document.createElement('div');
            survivorList.className = 'survivor-list';
            
            allSurvivors.forEach(survivor => {
                // Get perks for this survivor
                const survivorPerks = allPerks.filter(perk => perk.PerkOwner === survivor.SurvivorName);
                
                const card = createSurvivorCard(survivor, survivorPerks);
                survivorList.appendChild(card);
            });
            
            container.appendChild(survivorList);
        }
        
        // Create a survivor card element
        function createSurvivorCard(survivor, perks) {
            const card = document.createElement('div');
            card.className = 'survivor-card';
            
            const survivorImagePath = `${survivor.Folder}/${survivor.Filename}`;
            
            // Create badges HTML
            let badgesHTML = '<div class="survivor-badges">';
            
            if (survivor.SurvivorGender) {
                badgesHTML += `<span class="survivor-badge">${survivor.SurvivorGender}</span>`;
            }
            
            if (survivor.SurvivorRole) {
                badgesHTML += `<span class="survivor-badge">${survivor.SurvivorRole}</span>`;
            }
            
            if (survivor.SurvivorOrigin) {
                badgesHTML += `<span class="survivor-badge">${survivor.SurvivorOrigin}</span>`;
            }
            
            badgesHTML += '</div>';
            
            // Store perks HTML for popup
            let perksHTML = '';
            if (perks && perks.length > 0) {
                perksHTML = `
                    <div class="perk-list">
                        ${perks.map(perk => `
                            <div class="perk-item">
                                <img src="${perk.Folder}/${perk.Filename}" alt="${perk.PerkName}" class="perk-image">
                                <div class="perk-details">
                                    <div class="perk-name">${perk.PerkName}</div>
                                    <div class="perk-description">${perk.PerkDescription}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                perksHTML = '<p class="no-perks-message">This survivor does not have any unique perks in the database.</p>';
            }
            
            card.innerHTML = `
                <div class="survivor-image-container">
                    <img src="${survivorImagePath}" alt="${survivor.SurvivorName}" class="survivor-image">
                </div>
                <div class="survivor-info">
                    <h2 class="survivor-name">${survivor.SurvivorName}</h2>
                    ${badgesHTML}
                    
                    <div class="popup-buttons">
                        <button class="popup-button" onclick="openLorePopup(\`${escapeHtml(survivor.SurvivorLore)}\`, \`${escapeHtml(survivor.SurvivorName)}\`)">
							View Lore
						</button>

						<button class="popup-button" onclick="openPerksPopup(\`${escapeHtml(perksHTML)}\`, \`${escapeHtml(survivor.SurvivorName)}\`)">
							View Perks
						</button>
                    </div>
                </div>
            `;
            
            return card;
        }
        
        // Open lore popup
        function openLorePopup(lore, survivorName) {
            document.getElementById('lorePopup').classList.add('active');
            document.getElementById('loreContent').innerHTML = lore;
            document.querySelector('#lorePopup .popup-title').textContent = survivorName + ' - Lore';
            document.body.style.overflow = 'hidden';
        }
        
        // Open perks popup
        function openPerksPopup(perksHTML, survivorName) {
            document.getElementById('perksPopup').classList.add('active');
            document.getElementById('perksContent').innerHTML = perksHTML;
            document.querySelector('#perksPopup .popup-title').textContent = survivorName + ' - Unique Perks';
            document.body.style.overflow = 'hidden';
        }
        
        // Close popup
        function closePopup(popupId) {
            document.getElementById(popupId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Show error message
        function showError(message) {
            const container = document.getElementById('survivor-container');
            container.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                </div>
            `;
        }
        
        // Escape HTML for security
        function escapeHtml(html) {
            const div = document.createElement('div');
            div.textContent = html;
            return div.innerHTML.replace(/"/g, '&quot;');
        }
        
        // Close popup when clicking outside content
        document.querySelectorAll('.popup-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.popup-overlay.active').forEach(popup => {
                    popup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        });
        
        // Wait for the DOM to be fully loaded before initializing
        document.addEventListener('DOMContentLoaded', function() {
            fetchData();
        });
