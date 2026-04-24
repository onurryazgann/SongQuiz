const quizzes = [
    {
        title: "R&B Vibes",
        icon: "🎵",
        difficulty: "Medium",
        plays: ""
    },

    {
        title: "Metal Myhem",
        icon: "🤘",
        difficulty: "Medium",
        plays: ""
    },

    {
        title: "Reggae Rythims",
        icon: "🎵",
        difficulty: "Medium",
        plays: ""
    },

    {
    title: "Pop Hits",
    icon: "🎤",
    difficulty: "Easy",
    plays: ""
},

{
    title: "Rock Classics",
    icon: "🎸",
    difficulty: "Hard",
    plays: ""
}
];

const carouselTrack = document.getElementById("carouselTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton")

let slideAnimationDuration = 4000;
let currentIndex = 1;
let slideDirection = "next";
let autoSlideInterval;
let pauseTimeout;
let isHoveringCard = false;

function getDifficultyClass(difficulty) {
    return difficulty.toLowerCase();
}

function createQuizCard(quiz, className, animationClass = "") {
    const card = document.createElement("div");

    card.className = `quiz-card ${className} ${animationClass}`;
    
    card.innerHTML = `
            <div class="card-icon">${quiz.icon}</div>
            <h3>${quiz.title}</h3>
            <div class="card-bottom">
                <span class="difficulty ${getDifficultyClass(quiz.difficulty)}">${quiz.difficulty}</span>
                <span>${quiz.plays}</span>
            </div>
        `;

        return card;
}

function renderCarousel() {
    carouselTrack.innerHTML = "";

    const previousIndex = (currentIndex -1 + quizzes.length) % quizzes.length;
    const nextIndex = (currentIndex + 1) % quizzes.length;
    const backLeftIndex = (currentIndex - 2 + quizzes.length) % quizzes.length;
    const backRightIndex = (currentIndex + 2) % quizzes.length;


    let backLeftAnimation = "";
    let previousAnimation = "";
    let activeAnimation = "";
    let nextAnimation = "";
    let backRightAnimation = "";

    if (slideDirection === "next") {
    backLeftAnimation = "move-left-to-back";
    previousAnimation = "move-center-to-left";
    activeAnimation = "move-right-to-center";
    nextAnimation = "move-back-right-to-right";
    backRightAnimation = "fade-in-back-right";
    } 
    
    else {
    backLeftAnimation = "fade-in-back-left";
    previousAnimation = "move-back-left-to-left";
    activeAnimation = "move-left-to-center";
    nextAnimation = "move-center-to-right";
    backRightAnimation = "move-right-to-back";
    }

    const backLeftCard = createQuizCard(quizzes[backLeftIndex], "back-card back-left-card", backLeftAnimation);
    const previousCard = createQuizCard(quizzes[previousIndex], "side-card left-card", previousAnimation);
    const activeCard = createQuizCard(quizzes[currentIndex], "active-card", activeAnimation);
    const nextCard = createQuizCard(quizzes[nextIndex], "side-card right-card", nextAnimation);
    const backRightCard = createQuizCard(quizzes[backRightIndex], "back-card back-right-card", backRightAnimation);

    activeCard.addEventListener("click", function() {
        pauseAutoSlide(slideAnimationDuration);
    });

    activeCard.addEventListener("mouseenter", function() {
        isHoveringCard = true;
        stopAutoSlide();
    });

    activeCard.addEventListener("mouseleave", function() {
        isHoveringCard = false;
        startAutoSlide();
    });

    carouselTrack.appendChild(backLeftCard);
    carouselTrack.appendChild(previousCard);
    carouselTrack.appendChild(activeCard);
    carouselTrack.appendChild(nextCard);
    carouselTrack.appendChild(backRightCard);
}

function goNext() {
    slideDirection = "next";
    currentIndex = (currentIndex +1) % quizzes.length;
    renderCarousel();
}

function startAutoSlide() {
    stopAutoSlide();

    autoSlideInterval = setInterval(function(){
        if(!isHoveringCard) {
            goNext();
        }
    },slideAnimationDuration);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function pauseAutoSlide(duration) {
    stopAutoSlide();
    clearTimeout(pauseTimeout);

    pauseTimeout = setTimeout(function() {
        if (!isHoveringCard) {
            startAutoSlide();
        }
    },duration)
}

nextButton.addEventListener("click", function () {
    goNext();
    pauseAutoSlide(slideAnimationDuration);
    renderCarousel();
});

prevButton.addEventListener("click", function () {
    slideDirection = "prev";
    currentIndex = (currentIndex -1 + quizzes.length) % quizzes.length;
    renderCarousel();

    pauseAutoSlide(slideAnimationDuration);
})

renderCarousel();
startAutoSlide();