const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
    {
       id: 0,
       text: "What is your sex?",
       answers: [
           {
               text: "Male",
               image: "img/male.png",
               alt: "Photo of the Empire State building during daytime",
               credit: "Oliver Niblett"
           },
           {
               text: "Female",
               image: "img/female.png",
               alt:"Time-lapse photography car lights on bridge",
               credit: "Carlos Alfonso"
           }
        ]
    },
    {
        id: 1,
        text: "Preferred cycling style?",
        answers: [
            {
                text: "Gravel",
                image: "img/gravel_cycling.jpg",
                alt:"Pepperoni Pizza",
                credit: "Alan Hardman"
            },
            {
                text: "Mountain",
                image: "img/mountain_cycling.jpg",
                alt:"ham sandwich on white surface",
                credit: "Eaters Collective"
            },
            {
                text: "Road",
                image: "img/road_cycling.jpg",
                alt:"Pasta in tomato sauce",
                credit: "Mgg Vitchakorn"
            },
            {
                text: "Commuter",
                image: "img/commuter_cycling.jpg",
                alt:"hamburger",
                credit: "sk"
            }
            
        ]
    },
    {
        id: 2,
        text: "Preferred cycling position?",
        answers: [
            {
                text: "Leisure",
                image: "img/leisure.png",
                alt:"focus photography of building windows",
                credit: "Burgess Milner"
            },
            {
                text: "Fitness",
                image: "img/fitness.png",
                alt:"low angle view of building",
                credit: "Brandon Giggs"
            },
            {
                text: "Performance",
                image: "img/performance.png",
                alt:"trees beside white house",
                credit: "Phil Hearing"
            },
            {
                text: "Aggressive",
                image: "img/aggressive.png",
                alt:"trees beside white house",
                credit: "Phil Hearing"
            },
            {
                text: "Aerodynamic",
                image: "img/aerodynamic.png",
                alt:"brown wooden cabin infront of forest",
                credit: "eulauretta"
            }
        ]
    }
]

const answers = [
    {
        combination: ["New York", "Pizza", "Traditional"],
        text: "Fizik Antares Versus Evo R3 Adaptive",
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






