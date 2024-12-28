const goalContainer = document.querySelector('.tasks');
let inputFields = document.querySelectorAll(".task > input")
const checkBoxList = document.querySelectorAll(".task > .customized-checkbox");
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const progressValueText = document.querySelector('.progress-value-text');
const errorLabel = document.querySelector('.error-label');

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let counter = Object.values(allGoals).filter ((goal)=> {return goal.completed}).length
progressValue.style.width = `${(counter/inputFields.length)*100}%`;
progressValueText.textContent = `${counter}/${inputFields.length} completed`
const allQuotes =[
    'Raise the bar  by completing your goals!',
    'Well begun is half done!',
    'you are doing great',
    'Just one step away. keep going!',
    'wow!! you just completed all tasks. Time for chill:D '
];
progressLabel.textContent = allQuotes[counter]


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', ()=> {
        counter = Object.values(allGoals).filter ((goal)=> {return goal.completed}).length
        const allInputFilled = [...inputFields].every((input) =>{
            return input.value
        })
        if(allInputFilled){
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed
            counter =Object.values(allGoals).filter ((goal)=> {return goal.completed}).length
            progressValue.style.width = `${(counter/inputFields.length)*100}%`;
            progressValueText.textContent = `${counter}/${inputFields.length} completed`
            progressLabel.textContent = allQuotes[counter]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }else{
            errorLabel.classList.add('visible')
        }
        
    })
})

inputFields.forEach((input) =>  {
    if(allGoals[input.id]){
        input.value = allGoals[input.id].name 
        if(allGoals[input.id].completed){
            input.parentElement.classList.add('completed')
        }
    }
    
    
    input.addEventListener('focus',()=>{
        errorLabel.classList.remove('visible')
    })
    
    input.addEventListener('input',(e)=>{
        if(allGoals[input.id] && allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id] = {
            name: e.target.value,
            completed: false,
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})


function addTask(text = '', completed = false) {
    const newInput = document.createElement('div');
    newInput.classList.add('task');
    newInput.innerHTML = `<div class="customized-checkbox "></div>
                    <input id="${++id}" class="text" type="text" placeholder="Add new goal.." >`
                    goalContainer.append(newInput)

    // Add event listeners to save on change
    newInput.querySelector('.taskInput').addEventListener('input', saveTasks);
    newInput.querySelector('.taskCheckbox').addEventListener('change', saveTasks);
}

 // Function to save tasks to local storage
 function saveTasks() {
    let allGoals = [];
    document.querySelectorAll('.task').forEach(task => {
        let text = task.querySelector('.text').value;
        let checked = task.querySelector('.customized-checkbox').completed;
        tasks.push({ text, checked });
    });
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
}