const londLessons = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all") //peomiss of responce

        .then(res => res.json()) // promiss of json data
        .then((json) => displayLesson(json.data)
        );
};

const displayLesson = (lessons) => {
    // 1. get the container
    const levelContainer = document.getElementById('lavel-container')
    levelContainer.innerHTML = "";
    // 2. get into every lessons
    for (let lesson of lessons) {

        // 3. create element 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `  <button href="" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>Learn</button>
        
        `;
        // 4. append into container
       levelContainer.appendChild(btnDiv);
    }

};

londLessons()
