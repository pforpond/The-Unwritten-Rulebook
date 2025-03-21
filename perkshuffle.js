 // Embedded Perk Data
const survivorPerks = [
    { name: "Ace in The Hole", file: "aceInTheHole.png" },
    { name: "Adrenaline", file: "adrenaline.png" },
    { name: "Aftercare", file: "aftercare.png" },
    { name: "Alert", file: "alert.png" },
    { name: "Any Means Necessary", file: "anyMeansNecessary.png" },
    { name: "Appraisal", file: "appraisal.png" },
    { name: "Autodidact", file: "autodidact.png" },
    { name: "Babysitter", file: "babysitter.png" },
    { name: "Background Player", file: "backgroundPlayer.png" },
    { name: "Balanced Landing", file: "balancedLanding.png" },
    { name: "Bardic Inspiration", file: "bardicInspiration.png" },
    { name: "Better Than New", file: "betterThanNew.png" },
    { name: "Better Together", file: "betterTogether.png" },
    { name: "Bite The Bullet", file: "biteTheBullet.png" },
    { name: "Blast Mine", file: "blastMine.png" },
    { name: "Blood Pact", file: "bloodPact.png" },
    { name: "Blood Rush", file: "bloodRush.png" },
    { name: "Boil Over", file: "boilOver.png" },
    { name: "Bond", file: "bond.png" },
    { name: "Boon: Circle of Healing", file: "boonCircleOfHealing.png" },
    { name: "Boon: Dark Theory", file: "boonDarkTheory.png" },
    { name: "Boon: Exponential", file: "boonExponential.png" },
    { name: "Boon: Illumination", file: "boonIllumination.png" },
    { name: "Boon: Shadow Step", file: "boonShadowStep.png" },
    { name: "Borrowed Time", file: "borrowedTime.png" },
    { name: "Botany Knowlege", file: "botanyKnowledge.png" },
    { name: "Breakdown", file: "breakdown.png" },
    { name: "Breakout", file: "breakout.png" },
    { name: "Buckle Up", file: "buckleUp.png" },
    { name: "Built to Last", file: "builtToLast.png" },
    { name: "Calm Spirit", file: "calmSpirit.png" },
    { name: "Camaraderie", file: "camaraderie.png" },
    { name: "Champion of Light", file: "championOfLight.png" },
    { name: "Chemical Trap", file: "chemicalTrap.png" },
    { name: "Clairvoyance", file: "clairvoyance.png" },
    { name: "Clean Break", file: "cleanBreak.png" },
    { name: "Corrective Action", file: "correctiveAction.png" },
    { name: "Counterforce", file: "counterforce.png" },
    { name: "Cut Loose", file: "cutLoose.png" },
    { name: "Dance With Me", file: "danceWithMe.png" },
    { name: "Dark Sense", file: "darkSense.png" },
    { name: "Dead Hard", file: "deadHard.png" },
    { name: "Deadline", file: "deadline.png" },
    { name: "Deception", file: "deception.png" },
    { name: "Decisive Strike", file: "decisiveStrike.png" },
    { name: "Deja Vu", file: "dejaVu.png" },
    { name: "Deliverance", file: "deliverance.png" },
    { name: "Desperate Measures", file: "desperateMeasures.png" },
    { name: "Detective's Hunch", file: "detectivesHunch.png" },
    { name: "Distortion", file: "distortion.png" },
    { name: "Diversion", file: "diversion.png" },
    { name: "Dramaturgy", file: "dramaturgy.png" },
    { name: "Empathetic Connection", file: "empathicConnection.png" },
    { name: "Empathy", file: "empathy.png" },
    { name: "Exultation", file: "Exultation.png" },
    { name: "Eyes of Belmont", file: "EyesOfBelmont.png" },
    { name: "Fast Track", file: "fastTrack.png" },
    { name: "Finesse", file: "finesse.png" },
    { name: "Fixated", file: "fixated.png" },
    { name: "Flashbang", file: "flashbang.png" },
    { name: "Flip-Flop", file: "flip-Flop.png" },
    { name: "Fogwise", file: "fogwise.png" },
    { name: "For The People", file: "forThePeople.png" },
    { name: "Friendly Competition", file: "friendlyCompetition.png" },
    { name: "Hardened", file: "hardened.png" },
    { name: "Head On", file: "headOn.png" },
    { name: "Hope", file: "hope.png" },
    { name: "Hyperfocus", file: "hyperfocus.png" },
    { name: "Inner Focus", file: "innerFocus.png" },
    { name: "Inner Healing", file: "innerHealing.png" },
    { name: "Inner Strength", file: "innerStrength.png" },
    { name: "Invocation: Treacherous Crows", file: "invocationTreacherousCrows.png" },
    { name: "Invocation: Weaving Spiders", file: "invocationWeavingSpiders.png" },
    { name: "Iron Will", file: "ironWill.png" },
    { name: "Kindred", file: "kindred.png" },
    { name: "Leader", file: "leader.png" },
    { name: "Left Behind", file: "leftBehind.png" },
    { name: "Light-Footed", file: "light-Footed.png" },
    { name: "Lightweight", file: "lightweight.png" },
    { name: "Lithe", file: "lithe.png" },
    { name: "Low-Profile", file: "lowProfile.png" },
    { name: "Lucky Break", file: "luckyBreak.png" },
    { name: "Lucky Star", file: "luckyStar.png" },
    { name: "Made For This", file: "madeForThis.png" },
    { name: "Mettle of Man", file: "mettleOfMan.png" },
    { name: "Mirrored Illusion", file: "mirroredIllusion.png" },
    { name: "Moment of Glory", file: "MomentOfGlory.png" },
    { name: "No Mither", file: "noMither.png" },
    { name: "No One Left Behind", file: "noOneLeftBehind.png" },
    { name: "Object of Obsession", file: "objectOfObsession.png" },
    { name: "Off the Record", file: "offTheRecord.png" },
    { name: "Open Handed", file: "open-Handed.png" },
    { name: "Overcome", file: "overcome.png" },
    { name: "Overzealous", file: "overzealous.png" },
    { name: "Parental Guidance", file: "parentalGuidance.png" },
    { name: "Pharmacy", file: "pharmacy.png" },
    { name: "Plot Twist", file: "plotTwist.png" },
    { name: "Plunderer's Instinct", file: "plunderersInstinct.png" },
    { name: "Poised", file: "poised.png" },
    { name: "Potential Energy", file: "potentialEnergy.png" },
    { name: "Power Struggle", file: "powerStruggle.png" },
    { name: "Premonition", file: "premonition.png" },
    { name: "Prove Thyself", file: "proveThyself.png" },
    { name: "Quick and Quiet", file: "quickAndQuiet.png" },
    { name: "Quick Gambit", file: "quickGambit.png" },
    { name: "Reactive Healing", file: "reactiveHealing.png" },
    { name: "Reassurance", file: "reassurance.png" },
    { name: "Red Herring", file: "redHerring.png" },
    { name: "Renewal", file: "renewal.png" },
    { name: "Repressed Alliance", file: "repressedAlliance.png" },
    { name: "Residual Manifest", file: "residualManifest.png" },
    { name: "Resilience", file: "resilience.png" },
    { name: "Resurgence", file: "resurgence.png" },
    { name: "Rookie Spirit", file: "rookieSpirit.png" },
    { name: "Saboteur", file: "saboteur.png" },
    { name: "Scavenger", file: "scavenger.png" },
    { name: "Scene Partner", file: "scenePartner.png" },
    { name: "Second Wind", file: "secondWind.png" },
    { name: "Self Care", file: "self-Care.png" },
    { name: "Shoulder the Burden", file: "shoulderTheBurden.png" },
    { name: "Slippery Meat", file: "slipperyMeat.png" },
    { name: "Small Game", file: "smallGame.png" },
    { name: "Smash Hit", file: "smashHit.png" },
    { name: "Sole Survivor", file: "soleSurvivor.png" },
    { name: "Solidarity", file: "solidarity.png" },
    { name: "Soul Guard", file: "soulGuard.png" },
    { name: "Specialist", file: "specialist.png" },
    { name: "Spine Chill", file: "spineChill.png" },
    { name: "Sprint Burst", file: "sprintBurst.png" },
    { name: "Stake Out", file: "stakeOut.png" },
    { name: "Still Sight", file: "stillSight.png" },
    { name: "Streetwise", file: "streetwise.png" },
    { name: "Strength in Shadows", file: "strengthInShadows.png" },
    { name: "Teamwork: Collective Stealth", file: "teamworkCollectiveStealth.png" },
    { name: "Teamwork: Power of Two", file: "teamworkPowerOfTwo.png" },
    { name: "Technician", file: "technician.png" },
    { name: "Tenacity", file: "tenacity.png" },
    { name: "This Is Not Happening", file: "thisIsNotHappening.png" },
    { name: "Troubleshooter", file: "troubleshooter.png" },
    { name: "Unbreakable", file: "unbreakable.png" },
    { name: "Up The Ante", file: "upTheAnte.png" },
    { name: "Urban Evasion", file: "urbanEvasion.png" },
    { name: "Vigil", file: "vigil.png" },
    { name: "Visionary", file: "visionary.png" },
    { name: "Wake Up", file: "wakeUp.png" },
    { name: "We'll Make It", file: "wellMakeIt.png" },
    { name: "We're Gonna Live Forever", file: "wereGonnaLiveForever.png" },
    { name: "Wicked", file: "wicked.png" },
    { name: "Windows of Opportunity", file: "windowsOfOpportunity.png" },
    { name: "Wiretap", file: "wiretap.png" }
];

const killerPerks = [
    { name: "Agitation", file: "agitation.png" },
    { name: "Alien Instinct", file: "alienInstinct.png" },
    { name: "All Shaking Thunder", file: "allShakingThunder.png" },
    { name: "A Nurse's Calling", file: "aNursesCalling.png" },
    { name: "Awakened Awareness", file: "awakenedAwareness.png" },
    { name: "Bamboozle", file: "bamboozle.png" },
    { name: "BBQ and Chilli", file: "barbecueAndChilli.png" },
    { name: "Batteries Included", file: "batteriesIncluded.png" },
    { name: "Beast of Prey", file: "beastOfPrey.png" },
    { name: "Bitter Murmur", file: "bitterMurmur.png" },
    { name: "Blood Echo", file: "bloodEcho.png" },
    { name: "Blood Hound", file: "bloodhound.png" },
    { name: "Blood Warden", file: "bloodWarden.png" },
    { name: "Brutal Strength", file: "brutalStrength.png" },
    { name: "Call of Brine", file: "callOfBrine.png" },
    { name: "Corrupt Intervention", file: "corruptIntervention.png" },
    { name: "Coulrophobia", file: "coulrophobia.png" },
    { name: "Coup De Grace", file: "coupDeGr-3Fce.png" },
    { name: "Cruel Limits", file: "cruelLimits.png" },
    { name: "Dark Arrogance", file: "darkArrogance.png" },
    { name: "Dark Devotion", file: "darkDevotion.png" },
    { name: "Darkness Revealed", file: "darknessRevealed.png" },
    { name: "Deadlock", file: "deadlock.png" },
    { name: "Dead Man's Switch", file: "deadMansSwitch.png" },
    { name: "Deathbound", file: "deathbound.png" },
    { name: "Deerstalker", file: "deerstalker.png" },
    { name: "Discordance", file: "discordance.png" },
    { name: "Dissolution", file: "dissolution.png" },
    { name: "Distressing", file: "distressing.png" },
    { name: "Dominance", file: "Dominance.png" },
    { name: "Dragon's Grip", file: "dragonsGrip.png" },
    { name: "Dying Light", file: "dyingLight.png" },
    { name: "Enduring", file: "enduring.png" },
    { name: "Eruption", file: "eruption.png" },
    { name: "Fire Up", file: "fireUp.png" },
    { name: "Forced Hesitation", file: "forcedHesitation.png" },
    { name: "Forced Penance", file: "forcedPenance.png" },
    { name: "Franklin's Demise", file: "franklinsDemise.png" },
    { name: "Friends 'til the End", file: "friendsTilTheEnd.png" },
    { name: "Fugitive Chase", file: "furtiveChase.png" },
    { name: "Game Afoot", file: "gameAfoot.png" },
    { name: "Gearhead", file: "gearhead.png" },
    { name: "Genetic Limits", file: "geneticLimits.png" },
    { name: "Grim Embrace", file: "grimEmbrace.png" },
    { name: "Hex: Blood Favour", file: "hexBloodFavour.png" },
    { name: "Hex: Crowd Control", file: "hexCrowdControl.png" },
    { name: "Hex: Devour Hope", file: "hexDevourHope.png" },
    { name: "Hex: Face The Darkness", file: "hexFaceTheDarkness.png" },
    { name: "Hex: Haunted Ground", file: "hexHauntedGround.png" },
    { name: "Hex: Huntress Lullaby", file: "hexHuntressLullaby.png" },
    { name: "Hex: No One Escapes Death", file: "hexNoOneEscapesDeath.png" },
    { name: "Hex: Pentimento", file: "hexPentimento.png" },
    { name: "Hex: Plaything", file: "hexPlaything.png" },
    { name: "Hex: Retribution", file: "hexRetribution.png" },
    { name: "Hex: Ruin", file: "hexRuin.png" },
    { name: "Hex: The Third Seal", file: "hexTheThirdSeal.png" },
    { name: "Hex: Thrill of The Hunt", file: "hexThrillOfTheHunt.png" },
    { name: "Hex: Two Can Play", file: "hexTwoCanPlay.png" },
    { name: "Hex: Undying", file: "hexUndying.png" },
    { name: "Hex: Wretched Fate", file: "HexWretchedFate.png" },
    { name: "Hoarder", file: "hoarder.png" },
    { name: "Hubris", file: "hubris.png" },
    { name: "Human Greed", file: "HumanGreed.png" },
    { name: "Hysteria", file: "hysteria.png" },
    { name: "I'm All Ears", file: "imAllEars.png" },
    { name: "Infectious Fright", file: "infectiousFright.png" },
    { name: "Insidious", file: "insidious.png" },
    { name: "Iron Grasp", file: "ironGrasp.png" },
    { name: "Iron Maiden", file: "ironMaiden.png" },
    { name: "Knock Out", file: "knockOut.png" },
    { name: "Languid Touch", file: "languidTouch.png" },
    { name: "Lethal Pursuer", file: "lethalPursuer.png" },
    { name: "Leverage", file: "leverage.png" },
    { name: "Lightborn", file: "lightborn.png" },
    { name: "Machine Learning", file: "machineLearning.png" },
    { name: "Mad Grit", file: "madGrit.png" },
    { name: "Make Your Choice", file: "makeYourChoice.png" },
    { name: "Merciless Storm", file: "mercilessStorm.png" },
    { name: "Mindbreaker", file: "mindbreaker.png" },
    { name: "Monitor and Abuse", file: "monitorAndAbuse.png" },
    { name: "Nemesis", file: "nemesis.png" },
    { name: "No Quarter", file: "noQuarter.png" },
    { name: "No Way Out", file: "noWayOut.png" },
    { name: "Nowhere To Hide", file: "nowhereToHide.png" },
    { name: "Oppression", file: "oppression.png" },
    { name: "Overcharge", file: "overcharge.png" },
    { name: "Overwhelming Presence", file: "overwhelmingPresence.png" },
    { name: "Play With Your Food", file: "playWithYourFood.png" },
    { name: "Pop Goes The Weasel", file: "popGoesTheWeasel.png" },
    { name: "Predator", file: "predator.png" },
    { name: "Rancor", file: "rancor.png" },
    { name: "Rapid Brutality", file: "rapidBrutality.png" },
    { name: "Remember Me", file: "rememberMe.png" },
    { name: "Save The Best For Last", file: "saveTheBestForLast.png" },
    { name: "Scourge Hook: Floods of Rage", file: "scourgeHookFloodsOfRage.png" },
    { name: "Scourge Hook: Gift of Pain", file: "scourgeHookGiftOfPain.png" },
    { name: "Scourge Hook: Hangman's Trick", file: "scourgeHookHangmansTrick.png" },
    { name: "Scourge Hook: Jagged Compass", file: "scourgeHookJaggedCompass.png" },
    { name: "Scourge Hook: Monstrous Shrine", file: "scourgeHookMonstrousShrine.png" },
    { name: "Scourge Hook: Pain Resonance", file: "scourgeHookPainResonance.png" },
    { name: "Septic Touch", file: "septicTouch.png" },
    { name: "Shadowborn", file: "shadowborn.png" },
    { name: "Shattered Hope", file: "shatteredHope.png" },
    { name: "Sloppy Butcher", file: "sloppyButcher.png" },
    { name: "Spies From The Shadows", file: "spiesFromTheShadows.png" },
    { name: "Spirit Fury", file: "spiritFury.png" },
    { name: "Starstruck", file: "starstruck.png" },
    { name: "Stridor", file: "stridor.png" },
    { name: "Superior Anatomy", file: "superiorAnatomy.png" },
    { name: "Surge", file: "surge.png" },
    { name: "Surveillance", file: "surveillance.png" },
    { name: "Terminus", file: "terminus.png" },
    { name: "Territorial Imperative", file: "territorialImperative.png" },
    { name: "Thanatophobia", file: "thanatophobia.png" },
    { name: "Thrilling Tremors", file: "thrillingTremors.png" },
    { name: "Thwack!", file: "thwack.png" },
    { name: "Tinkerer", file: "tinkerer.png" },
    { name: "Trail of Torment", file: "trailOfTorment.png" },
    { name: "Ultimate Weapon", file: "ultimateWeapon.png" },
    { name: "Unbound", file: "unbound.png" },
    { name: "Undone", file: "undone.png" },
    { name: "Unforeseen", file: "unforeseen.png" },
    { name: "Unnerving Presence", file: "unnervingPresence.png" },
    { name: "Unrelenting", file: "unrelenting.png" },
    { name: "Weave Attunement", file: "weaveAttunement.png" },
    { name: "Whispers", file: "whispers.png" },
    { name: "Zanshin Tactics", file: "zanshinTactics.png" }
];
    
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
        perkImage.src = `${currentRole === 'survivor' ? 'survivorperks' : 'killerperks'}/${perk.file}`;
        perkImage.alt = perk.name;
        
        const perkName = document.createElement("div");
        perkName.className = "perk-name";
        perkName.textContent = perk.name;
        
        // Instead of a visible button, make the card clickable
        perkCard.addEventListener("click", () => {
            heldPerks[index] = !heldPerks[index];
            
            // Update the card styling
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

// Initial setup
initializeEmptyPerkCards();

// Add event listener for shuffle button
shuffleButton.addEventListener("click", shufflePerks);
