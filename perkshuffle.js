// AWS SDK Integration for Perk Data
const REGION = "eu-west-2";
const IDENTITY_POOL_ID = "eu-west-2:f8f16cb5-193e-428d-a909-abd6b44bf275";
const TABLE_NAME = "GamePerks";

// Global variables
let survivorPerks = [];
let killerPerks = [];

// Initialize AWS credentials and clients
function initializeAwsClients() {
    console.log("Initializing AWS Clients");
    // Configure the credentials provider
    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID
    });

    // Create DynamoDB client
    return new AWS.DynamoDB.DocumentClient();
}

// Fetch perks from DynamoDB
function fetchPerks() {
    return new Promise((resolve, reject) => {
        try {
            const dynamodbClient = initializeAwsClients();

            const params = {
                TableName: TABLE_NAME
            };

            dynamodbClient.scan(params, (err, data) => {
                if (err) {
                    console.error("Error fetching perks (AWS Error):", err);
                    reject(err);
                    return;
                }

                // Transform DynamoDB items to our perk format
                const transformedPerks = data.Items.map(item => {
                    return {
                        name: item.PerkName,
                        file: item.Filename,
                        type: item.PerkType.charAt(0).toUpperCase() + item.PerkType.slice(1).toLowerCase(),
                        description: item.PerkDescription || "No description available",
                        owner: item.PerkOwner || "Unknown", // Add owner
                        quote: item.PerkQuote || "" // Add quote
                    };
                });

                // Separate perks by type
                survivorPerks = transformedPerks.filter(perk => perk.type === "Survivor");
                killerPerks = transformedPerks.filter(perk => perk.type === "Killer");

                resolve(transformedPerks);
            });
        } catch (error) {
            console.error("Catch block error in fetchPerks:", error);
            reject(error);
        }
    });
}

function updatePerkDisplay() {
    // Clear the container
    perksContainer.innerHTML = "";
    const perkDetailsContainer = document.getElementById('perk-details');
    perkDetailsContainer.innerHTML = "";
    
    currentPerks.forEach((perk, index) => {
        const perkCard = document.createElement("div");
        perkCard.className = "perk-card";
        perkCard.dataset.index = index;
        
        if (heldPerks[index]) {
            perkCard.classList.add("held");
        }
        
        const perkImage = document.createElement("img");
        perkImage.className = "perk-image";
        perkImage.src = `${perk.type.toLowerCase() === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
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

        // Create detail card
        const detailCard = document.createElement("div");
        detailCard.className = "perk-detail-card";

        const detailImage = document.createElement("img");
        detailImage.className = "perk-detail-image";
        detailImage.src = `${perk.type.toLowerCase() === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
        detailImage.alt = perk.name;

        const detailContent = document.createElement("div");
        detailContent.className = "perk-detail-content";

        const perkHeader = document.createElement("div");
        perkHeader.className = "perk-detail-owner";
        perkHeader.textContent = `${perk.name} - ${perk.owner}`;

        const detailDescription = document.createElement("div");
        detailDescription.className = "perk-detail-description";
        detailDescription.textContent = perk.description;

        const perkQuote = document.createElement("div");
        perkQuote.className = "perk-detail-quote";
        perkQuote.textContent = perk.quote;

        detailContent.appendChild(perkHeader);
        detailContent.appendChild(detailDescription);
        detailContent.appendChild(perkQuote);

        detailCard.appendChild(detailImage);
        detailCard.appendChild(detailContent);
        perkDetailsContainer.appendChild(detailCard);
    });
}

// perk shuffle logic
const perksContainer = document.getElementById("perks-container");
const roleButtons = document.querySelectorAll(".toggle-button");
const shuffleButton = document.getElementById("shuffle-button");
let currentRole = "Survivor";
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
    const perkDetailsContainer = document.getElementById('perk-details');
    perkDetailsContainer.innerHTML = "";
    
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

    // Add placeholder for descriptions
    const descriptionPlaceholder = document.createElement("div");
    descriptionPlaceholder.className = "description-placeholder";
    descriptionPlaceholder.textContent = "Shuffle perks to see descriptions";
    perkDetailsContainer.appendChild(descriptionPlaceholder);
}

function shufflePerks() {
    console.log("Shuffle Perks called");
    console.log("Current Role:", currentRole);
    console.log("Survivor Perks Count:", survivorPerks.length);
    console.log("Killer Perks Count:", killerPerks.length);
    console.log("Survivor Perks:", JSON.stringify(survivorPerks, null, 2));
    console.log("Killer Perks:", JSON.stringify(killerPerks, null, 2));

    const perks = currentRole === "Survivor" ? survivorPerks : killerPerks;
    
    console.log("Perks to shuffle:", JSON.stringify(perks, null, 2));

    if (perks.length === 0) {
        console.error("No perks available for current role");
        alert("No perks found for the selected role. Please check your DynamoDB data.");
        return;
    }

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
    
    console.log("Current Perks after shuffle:", currentPerks);
    updatePerkDisplay();
}

// Initialize the page
async function initializePage() {
    try {
        await fetchPerks();
        initializeEmptyPerkCards();
    } catch (error) {
        console.error("Failed to initialize page:", error);
        // Show an error message to the user
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Failed to load perks. Please try again later.";
        errorMessage.style.color = 'red';
        perksContainer.appendChild(errorMessage);
    }
}

// Add AWS SDK script dynamically
function loadAwsSdk() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://sdk.amazonaws.com/js/aws-sdk-2.1058.0.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Load AWS SDK and then initialize
loadAwsSdk()
    .then(initializePage)
    .catch(error => {
        console.error("Failed to load AWS SDK:", error);
    });

shuffleButton.addEventListener("click", shufflePerks);
