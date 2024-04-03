let question_field=document.querySelector(".question")
let answer_buttons=document.querySelectorAll(".answer")
let start_btn=document.querySelector(".start-btn")
let start_page=document.querySelector(".start-page")
let main_page=document.querySelector(".main-page")
let result_field=document.querySelector(".result")
let end_quiz=document.querySelector(".end-btn")


let signs=["+","-","*","/"]
let isCookies=false
let max_points

let cookies=document.cookie.split(";")

for (let i=0; i<cookies.length;i+=1){
    let name_value=cookies[i].split("=")
    if (name_value[0].includes(`max-points`)){
        isCookies=true
        max_points=name_value[1]
        result_field.innerHTML=`vas poperednii resultat  ${max_points},`


    }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
    randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Повертаємо перемішаний масив
}

function randint(min,max){
    return Math.round(Math.random()*(max-min)+min)
}

function getRandomSign(){
    let i=randint(0,3)
    return signs[i]
}

class Question{
    constructor(){
        let a=randint(1, 40)
        let b=randint(1, 40)
        let sign=getRandomSign()
        this.question=`${a}  ${sign}  ${b}`
        if (sign=="+"){
            this.correct=a+b
        }
        else if(sign=="-"){
            this.correct=a-b
        }
        else if(sign=="*"){
            this.correct=a*b
        }
        else if(sign=="/"){
            let answer=a/b*100
            this.correct=Math.round(answer)/100
            
        }

        this.answers=[
            this.correct,
            randint (this.correct-5, this.correct +1),
            randint (this.correct+7, this.correct -4),
            randint (this.correct-9, this.correct +4),
            randint (this.correct+5, this.correct -5),
        ]
        shuffle(this.answers)
    }
    display(){
        question_field.innerHTML= this.question
        for (let i=0; i<this.answers.length; i +=1){
            answer_buttons[i].innerHTML= this.answers[i]
        }
    }

}
let quiz_time=45
let current_question= new Question()
current_question.display()
let point=0
let total_question_count=0


function displayResult(){
    start_page.style.display="flex"
    main_page.style.display="none"
    let accuracy=Math.round(point* 100 / total_question_count)
    result_field.innerHTML=`vy dali ${point} pravilnich vidpovidej z ${total_question_count}  ,vasa tochnist ${accuracy}%`
    document.cookie=`max-points=${point};max-age=${60*60*24*10}`

}


start_btn.addEventListener("click",function(){
    start_page.style.display="none"
    main_page.style.display="flex"
    current_question=new Question()
    current_question.display()
    setTimeout(displayResult,quiz_time*1000)

})

for (let i=0;i<answer_buttons.length;i+=1){
    answer_buttons[i].addEventListener("click",function(){
        total_question_count+=1
        if (answer_buttons[i].innerHTML== current_question.correct){
            point+=1
            console.log(point)
            answer_buttons[i].style.background="rgba(82, 255, 19)"

            anime({
                targets:answer_buttons[i],
                background:"rgba(9, 106, 148)",
                duration:600,
                delay:100,
                easing:"linear"
            }).finished.then(function(){
                current_question=new Question()
                current_question.display()
            })

            console.log("true")
        }else{
            answer_buttons[i].style.background="rgba(250, 0, 0)"
            anime({
                targets:answer_buttons[i],
                background:"rgba(9, 106, 148)",
                duration:600,
                delay:100,
                easing:"linear"
            }).finished.then(function(){
                current_question=new Question()
                current_question.display()
            })

            console.log("false")
        }
    end_quiz.addEventListener("click",function(){
        displayResult()
     
    })
    })

    
}
