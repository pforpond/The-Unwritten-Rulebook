```javascript
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

// Configure Cognito Identity Pool credentials
const client = new DynamoDBClient({ 
    region: "YOUR_AWS_REGION",
    credentials: fromCognitoIdentityPool({
        clientConfig: { region: "eu-west-2" },
        identityPoolId: "eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275"
    })
});

// Table name for all perks
const GAME_PERKS_TABLE = "GamePerks";

class PerkManager {
    constructor() {
        this.survivorPerks = [];
        this.killerPerks = [];
        this.currentRole = "survivor";
        this.currentPerks = [];
        this.heldPerks = [false, false, false, false];
    }

    async fetchPerks() {
        try {
            // Fetch survivor perks
            const survivorParams = {
                TableName: GAME_PERKS_TABLE,
                KeyConditionExpression: "PerkType = :type",
                ExpressionAttributeValues: {
                    ":type": { S: "survivor" }
                }
            };
            const survivorResult = await client.send(new QueryCommand(survivorParams));
            this.survivorPerks = survivorResult.Items.map(item => ({
                name: item.PerkName.S,
                file: item.Filename.S,
                folder: item.Folder.S
            }));

            // Fetch killer perks
            const killerParams = {
                TableName: GAME_PERKS_TABLE,
                KeyConditionExpression: "PerkType = :type",
                ExpressionAttributeValues: {
                    ":type": { S: "killer" }
                }
            };
            const killerResult = await client.send(new QueryCommand(killerParams));
            this.killerPerks = killerResult.Items.map(item => ({
                name: item.PerkName.S,
                file: item.Filename.S,
                folder: item.Folder.S
            }));
        } catch (error) {
            console.error("Error fetching perks:", error);
            // Fallback to local data or show error message
            throw error;
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    shufflePerks() {
        const perks = this.currentRole === "survivor" ? this.survivorPerks : this.killerPerks;
        let availablePerks = [...perks];
        
        // If first shuffle, initialize current perks
        if (this.currentPerks.length === 0) {
            this.currentPerks = this.shuffleArray(perks).slice(0, 4);
            this.heldPerks = [false, false, false, false];
        } else {
            // Remove held perks from available perks to avoid duplicates
            for (let i = 0; i < 4; i++) {
                if (this.heldPerks[i]) {
                    const perkName = this.currentPerks[i].name;
                    availablePerks = availablePerks.filter(p => p.name !== perkName);
                }
            }
            
            // Shuffle remaining perks
            const shuffledPerks = this.shuffleArray(availablePerks);
            
            // Replace non-held perks
            let shuffledIndex = 0;
            for (let i = 0; i < 4; i++) {
                if (!this.heldPerks[i]) {
                    this.currentPerks[i] = shuffledPerks[shuffledIndex];
                    shuffledIndex++;
                }
            }
        }
        
        this.updatePerkDisplay();
    }

    updatePerkDisplay() {
        const perksContainer = document.getElementById("perks-container");
        // Clear the container
        perksContainer.innerHTML = "";
        
        this.currentPerks.forEach((perk, index) => {
            const perkCard = document.createElement("div");
            perkCard.className = "perk-card";
            perkCard.dataset.index = index;
            
            if (this.heldPerks[index]) {
                perkCard.classList.add("held");
            }
            
            const perkImage = document.createElement("img");
            perkImage.className = "perk-image";
            perkImage.src = `${perk.folder}/${perk.file}`;
            perkImage.alt = perk.name;
            
            const perkName = document.createElement("div");
            perkName.className = "perk-name";
            perkName.textContent = perk.name;
            
            // click card to hold perk
            perkCard.addEventListener("click", () => {
                this.heldPerks[index] = !this.heldPerks[index];
                
                if (this.heldPerks[index]) {
                    perkCard.classList.add("held");
                } else {
                    perkCard.classList.remove("held");
                }
            });
            
            perkCard.appendChild(perkImage);
            perkCard.appendChild(perkName);
            perksContainer.appendChild(perkCard);
        });
    }

    initializeEmptyPerkCards() {
        const perksContainer = document.getElementById("perks-container");
        perksContainer.innerHTML = "";
        
        for (let i = 0; i < 4; i++) {
            const perkCard = document.createElement("div");
            perkCard.className = "perk-card";
            perkCard.dataset.index = i;
            
            const perkImage = document.createElement("img");
            perkImage.className = "perk-image";
            perkImage.src = "noperk.png";
            perkImage.alt = "No Perk";
            
            const perkName = document.createElement("div");
            perkName.className = "perk-name";
            perkName.textContent = "Select a role and shuffle";
            
            perkCard.appendChild(perkImage);
            perkCard.appendChild(perkName);
            perksContainer.appendChild(perkCard);
        }
    }

    async initialize() {
        // Fetch perks from DynamoDB
        await this.fetchPerks();

        // Set up role buttons
        const roleButtons = document.querySelectorAll(".role-button");
        const shuffleButton = document.getElementById("shuffle-button");

        roleButtons.forEach(button => {
            button.addEventListener("click", () => {
                roleButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                this.currentRole = button.dataset.role;
                // Reset held perks when changing roles
                this.heldPerks = [false, false, false, false];
                this.currentPerks = [];
                // Reset the display
                this.initializeEmptyPerkCards();
            });
        });

        // Initialize shuffle button
        shuffleButton.addEventListener("click", () => this.shufflePerks());

        // Initial setup
        this.initializeEmptyPerkCards();
    }
}

// Initialize the perk manager when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const perkManager = new PerkManager();
    try {
        await perkManager.initialize();
    } catch (error) {
        console.error("Failed to initialize perk manager:", error);
        // Optionally show an error message to the user
        document.getElementById("perks-container").innerHTML = 
            "<div class='error'>Failed to load perks. Please try again later.</div>";
    }
});
```
