const loadLessons = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all") //peomiss of responce

        .then((res) => res.json()) // promiss of json data
        .then((json) => displayLesson(json.data));
};

const londLevelWord = (id) => {
const url = `https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then(res => res.json())
.then(data => displayLevelWord(data.data)
)    
};

const displayLevelWord = (words) => {

const wordContainer = document.getElementById("word-container")
wordContainer.innerHTML = ""; 

// {    id: 101,
//      level: 2, 
//      word: 'Market', 
//      meaning: 'বাজার', 
//      pronunciation: 'মার্কেট'}


words.forEach(word => {
    console.log(word);
    const cart = document.createElement("div")
    cart.innerHTML= `

    <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="text-xl font-bold">${word.word}</h2>
      <p class="font-medium">Meaning /Pronounciation</p>
      <div class="font-medium fond-bangla">"${word.meaning} / ${word.pronunciation}"</div>
      <div class="flex justify-between items-center ">
        <button class="btn bg-sky-50 hover:bg-sky-200"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-sky-50 hover:bg-sky-200"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    

    `;
    wordContainer.append(cart)
    
});
    
}

const displayLesson = (lessons) => {
    // 1. get the container
    const levelContainer = document.getElementById("level-last-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for (let lesson of lessons) {
           
        // 3. create element 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `  <button onclick="londLevelWord(${lesson.level_no})" href="" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        
        `;
        // 4. append into container
        levelContainer.append(btnDiv);
    }
};

loadLessons();
