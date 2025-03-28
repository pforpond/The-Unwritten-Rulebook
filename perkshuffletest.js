// AWS SDK Integration for Perk Data
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

// Configuration (replace with your actual values)
const REGION = "eu-west-2"; // Your AWS region
const IDENTITY_POOL_ID = "eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275";
const TABLE_NAME = "GamePerks";

// Global variables
let survivorPerks = [];
let killerPerks = [];

// Initialize AWS credentials and clients
async function initializeAwsClients() {
    try {
        const client = new CognitoIdentityClient({ 
            region: REGION,
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: REGION }),
                identityPoolId: IDENTITY_POOL_ID
            })
        });

        const dynamodbClient = new DynamoDBClient({ 
            region: REGION,
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: REGION }),
                identityPoolId: IDENTITY_POOL_ID
            })
        });

        return dynamodbClient;
    } catch (error) {
        console.error("Error initializing AWS clients:", error);
        throw error;
    }
}

// Fetch perks from DynamoDB
async function fetchPerks() {
    try {
        const dynamodbClient = await initializeAwsClients();

        const params = {
            TableName: TABLE_NAME,
            // Optional: Add filter expressions if needed
            // FilterExpression: "attribute_exists(PerkName)"
        };

        const command = new ScanCommand(params);
        const response = await dynamodbClient.send(command);

        // Transform DynamoDB items to our perk format
        const transformedPerks = response.Items.map(item => ({
            name: item.PerkName.S,
            file: item.Filename.S,
            type: item.PerkType.S
        }));

        // Separate perks by type
        survivorPerks = transformedPerks.filter(perk => perk.type === "survivor");
        killerPerks = transformedPerks.filter(perk => perk.type === "killer");

        return transformedPerks;
    } catch (error) {
        console.error("Error fetching perks:", error);
        // Fallback to local perks if network/auth fails
        return [];
    }
}

// Existing perk shuffle logic (mostly unchanged)
const perksContainer = document.getElementById("perks-container");
const roleButtons = document.querySelectorAll(".role-button");
const shuffleButton = document.getElementById("shuffle-button");
let currentRole = "survivor";
let currentPerks = [];
let heldPerks = [false, false, false, false];

// Set up role buttons
roleButtons.forEach(button => {
    button.addEventListener("click", () => {
        roleButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentRole = button.dataset.role;
        // Reset held perks when changing roles
        heldPerks = [false, false, false, false];
        currentPerks = [];
        // Reset the display
        initializeEmptyPerkCards();
    });
});

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initializeEmptyPerkCards() {
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

function shufflePerks() {
    const perks = currentRole === "survivor" ? survivorPerks : killerPerks;
    let availablePerks = [...perks];
    
    // If first shuffle, initialize current perks
    if (currentPerks.length === 0) {
        currentPerks = shuffleArray(perks).slice(0, 4);
        heldPerks = [false, false, false, false];
    } else {
        // Remove held perks from available perks to avoid duplicates
        for (let i = 0; i < 4; i++) {
            if (heldPerks[i]) {
                const perkName = currentPerks[i].name;
                availablePerks = availablePerks.filter(p => p.name !== perkName);
            }
        }
        
        // Shuffle remaining perks
        const shuffledPerks = shuffleArray(availablePerks);
        
        // Replace non-held perks
        let shuffledIndex = 0;
        for (let i = 0; i < 4; i++) {
            if (!heldPerks[i]) {
                currentPerks[i] = shuffledPerks[shuffledIndex];
                shuffledIndex++;
            }
        }
    }
    
    updatePerkDisplay();
}

function updatePerkDisplay() {
    // Clear the container
    perksContainer.innerHTML = "";
    
    currentPerks.forEach((perk, index) => {
        const perkCard = document.createElement("div");
        perkCard.className = "perk-card";
        perkCard.dataset.index = index;
        
        if (heldPerks[index]) {
            perkCard.classList.add("held");
        }
        
        const perkImage = document.createElement("img");
        perkImage.className = "perk-image";
        perkImage.src = `${perk.type === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
        perkImage.alt = perk.name;
        
        const perkName = document.createElement("div");
        perkName.className = "perk-name";
        perkName.textContent = perk.name;
        
        // click card to hold perk
        perkCard.addEventListener("click", () => {
            heldPerks[index] = !heldPerks[index];
            
            if (heldPerks[index]) {
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

// Initialize the page
async function initializePage() {
    try {
        await fetchPerks();
        initializeEmptyPerkCards();
    } catch (error) {
        console.error("Failed to initialize page:", error);
    }
}

initializePage();

shuffleButton.addEventListener("click", shufflePerks);
