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

  if (words.length == 0){
        wordContainer.innerHTML = `
        <div class=" text-center col-span-full space-y-4 p-8">
        <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
      <p class="font-medium text-gray-600 fond-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয় নি</p>
      <h2 class="text-3xl font-semibold fond-bangla">নেক্সট Lesson এ যান</h2>
    </div>
        
        `
        return;
     };


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
      <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি " }</h2>
      <p class="font-medium">Meaning /Pronounciation</p>
      <div class="font-medium fond-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি" }"</div>
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
