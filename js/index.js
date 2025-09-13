const loadLessons = () => {

  fetch("https://openapi.programming-hero.com/api/levels/all") //peomiss of responce

    .then((res) => res.json()) // promiss of json data
    .then((json) => displayLesson(json.data));
};


const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  lessonButtons.forEach((btn) => btn.classList.remove("active"));

}

// lodding
const menageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }
  else {
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
};



const londLevelWord = (id) => {
  menageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {

      removeActive() //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("active"); //add active class
      displayLevelWord(data.data)

    })
};

const createElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn bg-sky-100 space-x-2">${el}</span>`);
  return htmlElements.join(" ");
};

/// modal section
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const detail = await res.json();
  displayWordDetails(detail.data)
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailBox = document.getElementById("details-Container")
  document.getElementById('my_modal_5').showModal()
  detailBox.innerHTML = ` <div>
          <h1 class="text-2xl font-bold"> ${word.word} ( <i class="fa-solid fa-microphone"></i> :${word.Pronounciation})</h1>
        </div>
        <div>
          <h1 class=" font-bold">Meaning</h1>
          <h1>${word.meaning}</h1>
        </div>
        <div>
          <h1 class=" font-bold">Example</h1>
          <h1>${word.sentence}</h1>
        </div>
        <div>
          <h1 class=" font-bold">Synonym</h1>
          <div>${createElement(word.synonyms)}</div>
        </div> `;

};


const displayLevelWord = (words) => {

  const wordContainer = document.getElementById("word-container")
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class=" text-center col-span-full space-y-4 p-8">
           <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
           <p class="font-medium text-gray-600 fond-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয় নি</p>
           <h2 class="text-3xl font-semibold fond-bangla">নেক্সট Lesson এ যান</h2>
          </div>
        
        `;
    menageSpinner(false)
    return;
  };


  words.forEach(word => {
    console.log(word);

    const cart = document.createElement("div")
    cart.innerHTML = `

    <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি "}</h2>
      <p class="font-medium">Meaning /Pronounciation</p>
      <div class="font-medium fond-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
      <div class="flex justify-between items-center ">
         
       <button onclick="loadWordDetail(${word.id})" 
        class="btn bg-sky-50 hover:bg-sky-200">
        <i class="fa-solid fa-circle-info"></i>
      </button>
        <button class="btn bg-sky-50 hover:bg-sky-200"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    

    `;
    wordContainer.append(cart)

  });
  menageSpinner(false)
};



const displayLesson = (lessons) => {
  // 1. get the container
  const levelContainer = document.getElementById("level-last-container");
  levelContainer.innerHTML = "";


  // 2. get into every lessons
  for (let lesson of lessons) {

    // 3. create element 
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `  <button id="lesson-btn-${lesson.level_no}" onclick="londLevelWord(${lesson.level_no})" href="" class="btn btn-soft btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        
        `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();


///search

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive()
  const input = document.getElementById("input-search")
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res) => res.json())
  .then((data) => {
    const allWord = data.data
    console.log(allWord);

    const filterWord = allWord.filter ((word) => word.word.toLowerCase().includes(searchValue));
    console.log(filterWord);
    
    displayLevelWord(filterWord)
  })

})