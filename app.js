// Create and append logo dynamically
const logoImg = document.createElement('img');
logoImg.src = 'img/logo.png'; // Assuming your logo is in the 'img' folder
logoImg.alt = 'SaddleSense Logo';
logoImg.classList.add('logo');
document.body.appendChild(logoImg); // Append logo to the body of the document



const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
    {
        id: 0,
        text: "What is your primary form of cycling?",
        answers: [
            {
                text: "Gravel",
                image: "img/gravel_cycling.jpg",
                alt:"Gravel",
                credit: "sk"
            },
            {
                text: "Mountain",
                image: "img/mountain_cycling.jpg",
                alt:"Mountain",
                credit: "sk"
            },
            {
                text: "Road",
                image: "img/road_cycling.jpg",
                alt:"Road",
                credit: "sk"
            },            
        ]
    },
    {
        id: 1,
        text: "Which cycling profile describes you best?",
        answers: [
            {
                text: "Recreational or Commuter",
                image: "img/recreational_cycling.jpg",
            },
            {
                text: "Bike touring",
                image: "img/biketouring.jpg",
            },
            {
                text: "Performance",
                image: "img/performance_road.jpg",
            },
            {
                text: "Mountain cycling",
                image: "img/mountain_cycling_sideview.jpg",
            }
        ]
    },
    {
        id: 2,
        text: "What is your primary area of discomfort?",
        answers: [
            {
                text: "Sit bones",
                image: "img/sitbones.jpeg",
            },
            {
                text: "Genital area",
                image: "img/genitalpain.jpeg",
            },
            {
                text: "Upper thighs",
                image: "img/thighs.png",
            },
            {
                text: "Other",
                image: "img/other.png",
            },
            {
                text: "None",
                image: "img/none.png",
            }
         ]
     },
     {
        id: 3,
        text: "What accessories do you typically use while cycling?",
        answers: [
            {
                text: "Chamois shorts",
                image: "img/shorts.png",
            },
            {
                text: "Chamois creme",
                image: "img/creme.png",
            },
            {
                text: "Seat cover",
                image: "img/seatcover.png",
            },
            {
                text: "Other",
                image: "img/other.png",
            },
            {
                text: "None",
                image: "img/none.png",
            }
         ]
     },
    {
        id: 4,
        text: "Sex of cyclist:",
        answers: [
            {
                text: "Male",
                image: "img/male.png",
                alt: "male",
            },
            {
                text: "Female",
                image: "img/female.png",
                alt:"female",
            }
         ]
     },
     {
        id: 5,
        text: "Age of cyclist:",
        answers: [
            {
                text: "<18 years",
                image: "img/under18.png",
            },
            {
                text: "18-29 years",
                image: "img/18to29.png",
            },
            {
                text: "30-49 years",
                image: "img/30to49.png",
            },
            {
                text: "50-69 years",
                image: "img/50to69.png",
            },
            {
                text: "70+ years",
                image: "img/70plus.png",
            }
         ]
     },
]

const answers = [
    {
        combination: ["New York", "Pizza", "Traditional"],
        text: "Recommended Saddle: Fizik Antares Versus Evo R3 Adaptive",
        image: "img/fizik_antares_versus_evo_r3_adaptive.webp",
        alt: "Blue cheese"
    },
    {
        combination: ["Austin", "Pasta", "Modern"],
        text: "Specialized Romin Evo Pro",
        image: "img/specialized_romin_evo_pro.webp",
        alt: "Cheddar cheese"
    },
    {
        combination: ["Portland", "Sandwich", "Mountains"],
        text: "Feta",
        image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        alt: "Feta cheese"
    },
    {
        combination: ["New Orleans", "Hamburger", "House"],
        text: "Halloumi",
        image: "https://images.unsplash.com/photo-1505281036624-fac2862357b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        alt: "Halloumi"
    }
]
// need to have a default answer to compensate for lack of combination data

const unansweredQuestions = []
const chosenAnswers = []

const populateQuestions = () => {
    questions.forEach(question => {
        const titleBlock = document.createElement('div')
        titleBlock.id = question.id
        titleBlock.classList.add('title-block')
        const titleHeading = document.createElement('h2')
        titleHeading.textContent = question.text
        titleBlock.append(titleHeading)

        
        questionDisplay.append(titleBlock)

        const answersBlock = document.createElement('div')
        answersBlock.id = question.id + "-questions"
        answersBlock.classList.add('answer-options')

        unansweredQuestions.push(question.id)

        question.answers.forEach(answer => {
            const answerBlock = document.createElement('div')
            answerBlock.classList.add('answer-block')
            answerBlock.addEventListener('click', () => handleClick(question.id, answer.text))
            const answerImage = document.createElement('img')
            answerImage.setAttribute('src', answer.image)
            answerImage.setAttribute('alt', answer.alt)

            const answerTitle = document.createElement('h3')
            answerTitle.textContent = answer.text

            const answerInfo = document.createElement('p')
            const imageLink = document.createElement('a')
            imageLink.setAttribute('href', answer.image)
            // imageLink.textContent = answer.credit
            const sourceLink = document.createElement('a')
            sourceLink.textContent = 'Unsplash'
            sourceLink.setAttribute('src', 'https://www.unsplash.com')
            answerInfo.append(imageLink, ' to ', sourceLink)

            answerBlock.append(answerImage, answerTitle, answerInfo)

            answersBlock.append(answerBlock)
        })

        questionDisplay.append(answersBlock)

    })
}
populateQuestions()

const handleClick = (questionId, chosenAnswer) => {
    if (unansweredQuestions.includes(questionId))
    chosenAnswers.push(chosenAnswer)
    const itemToRemove = unansweredQuestions.indexOf(questionId)

    if (itemToRemove > -1) {
        unansweredQuestions.splice(itemToRemove, 1)
    }
    console.log(chosenAnswers)
    console.log(unansweredQuestions)

    disableQuestionBlock(questionId, chosenAnswer)
    const lowestQuestionId = Math.min(...unansweredQuestions)
    location.href = '#' + lowestQuestionId

    if (!unansweredQuestions.length) {
        location.href = '#answer'
        showLoadingAnimation() // show loader animation
        document.body.style.overflow = 'hidden'; // disable scrolling
        answerDisplay.style.visibility = 'hidden'; // make answer box hidden
        showAnswer(); // populate answer box

        function hideLoadingAnimation() {
            document.getElementById('loader1').style.display = 'none'; // hide loader animation
            document.body.style.overflow = ''; // re-enable scrolling
            answerDisplay.style.visibility = ''; // show answer box
            answerDisplay.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'}); // smoothly scroll to answer
        }
        setTimeout(hideLoadingAnimation, 3000);
    }
}

const showLoadingAnimation = () => {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    loader.id = 'loader1';
    const loader_img = document.createElement('img')
    loader_img.setAttribute('src', 'img/loading.gif')
    const loader_text = document.createElement('h1');
    loader_text.textContent = "Gathering results...";

    loader.append(loader_img);
    loader.append(loader_text);
    document.body.append(loader);
}

const showAnswer = () => {
    let result
    answers.forEach(answer => {
        if (
            chosenAnswers.includes(answer.combination[0]) +
            chosenAnswers.includes(answer.combination[1]) +
            chosenAnswers.includes(answer.combination[2])
        ) {
            result = answer
            return
        } else if (!result) {
            //first answer object is default
            result = answers[0]
        }
    })

    const answerBlock = document.createElement('div')
    answerBlock.classList.add('result-block')
    const answerTitle = document.createElement('h3')
    answerTitle.textContent = result.text
    const answerImage = document.createElement('img')
    answerImage.setAttribute('src', result.image)
    answerImage.setAttribute('alt', result.alt)

    answerBlock.append(answerTitle, answerImage)

    answerDisplay.append(answerBlock)

    const allAnswerBlocks = document.querySelectorAll('.answer-block')
    Array.from(allAnswerBlocks).forEach(answerBlock => answerBlock.replaceWith(answerBlock.cloneNode(true)))

}

const disableQuestionBlock = (questionId, chosenAnswer) => {
    const currentQuestionBlock = document.getElementById(questionId + "-questions")

    Array.from(currentQuestionBlock.children).forEach(block => {
        if (block.children.item(1).innerText !== chosenAnswer) {
            block.style.opacity = "50%"
        }
    })
}






