
let timeAndHourFun = (time) => {
    
    // let time = item.others.posted_date;
    let Hours = parseInt(time / 3600);
    let remainingSecond = parseInt(time % 3600);
    let minute = parseInt(remainingSecond / 60);

    remainingSecond = remainingSecond % 60;
    
    return `${Hours} hour ${minute} minute ${remainingSecond} ago`

}

const displayCetagotyButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
    console.log(data)
    categoryInput(data.categories)
}

const displayVideo = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await res.json();
    console.log(data.videos)
    videosInput(data.videos)
}


const categoryvideo = async (id) => {
    removebuttonbg()
    const btn = document.getElementById(`btn-${id}`);
    console.log(btn)
    btn.classList.add('bg-red-500', 'text-white')
    

    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json();
    console.log(data)
    videosInput(data.category);
}

const removebuttonbg = () => {
    const bg_reomve = document.querySelectorAll('.btn');
    console.log(bg_reomve)

    for(let btn of bg_reomve){
        console.log(btn)
        btn.classList.remove('bg-red-500', 'text-white') ;
    }
    

}

const videosInput = (data) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';


    if(data.length == 0 ){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
            <div class="min-h-[300px] flex justify-center items-center flex-col">
                <img src="./asstes/Icon.png"/>
                <h2>NO CONTENT HERE !</h2>
            </div>
        
        `;
        return;
    }else{
        videosContainer.classList.add('grid')
    }
    
    data.forEach( (item) => {
        console.log(item)
        timeAndHourFun(item)
        const div = document.createElement('div');
        div.classList = "card card-compact";
        div.innerHTML = `

                    <figure class=" relative h-[200px]">
                <img class = 'w-full h-full object-cover'
                src=${item.thumbnail}
                alt="Shoes" />
                <p class=" absolute right-1 text-xs bottom-2 text-white">${item.others?.posted_date ? `${timeAndHourFun(item.others.posted_date)}` : ''} </p>
            </figure>
            <div class=" py-3">
                <div class='flex gap-4'>
                <img class=" w-8 h-8 rounded-full" src =${item.authors[0].profile_picture}/>
                <h2 class="card-title">${item.title}</h2>
                </div>
                <div class="flex ml-11 items-center gap-3">
                     <p>Awad Hossain</p>
                     ${item.authors[0].verified == true ? `<img class=" w-4 h-4" src="https://img.icons8.com/?size=100&id=cL95UuXTO0nU&format=png&color=000000"/>` : '' }
                     

                </div>

                <p class=" ml-11">${item.others.views}</p>
                
               
            </div>

                
                `;

                videosContainer.append(div);

              
                
    })

    
}


const categoryInput = (category) => {
    const categoryContainer = document.getElementById('categoryContainer')
    category.forEach( (item) => {
       

       const div = document.createElement('div');
       div.innerHTML = `
        <button id='btn-${item.category_id}' onClick="categoryvideo(${item.category_id})" class="btn category gap-3">
            ${item.category}
        </button>
       
       `;
      

       categoryContainer.append(div)
    })
}
displayCetagotyButton()
displayVideo()