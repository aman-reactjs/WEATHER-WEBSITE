const fetchData= document.getElementById("fetchData");
const containerBox = document.querySelector(".container-box");
const temp = document.querySelector(".temprature");
const cloud = document.querySelector(".cloud")
const cityName = document.querySelector(".city-name");
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind");
const errorMsg = document.getElementById("error-msg");
const imgHumi= document.querySelector(".img-humidity")
const imgWind = document.querySelector(".img-wind")
const apiKey = "1f6449b8b7a811ec49882f1de26f19b3";



const fetchUserData =async()=>{
    const userInput = document.getElementById("input_box").value;
    if(userInput==="" || !userInput ){
        errorMsg.textContent="This is not valid input";
        return;
    }
    // Using fetch api for fetching data
    try{
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`)
      
    if(!res.ok){
            // throw new error("HTTP error ! Status" + res.status);
           errorMsg.textContent="This is not valid input";
           errorMsg.style.color="red"
            document.getElementById("input_box").value="";
            return;
        }
        
        const data = await res.json()
        
        // console.log(data)
        errorMsg.textContent="";

        imgHumi.style.display="block"
        imgWind.style.display="block"

        temp.textContent= `Temprature : ${data.main.temp} \u00B0C`
        cloud.src =`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  

        cityName.textContent= `${data.name}`
        humidity.textContent=`  ${data.main.humidity} % humidity`

        humidity.style.color="black"
        wind.textContent=` ${data.wind.speed}km/h wind `
        
        document.getElementById("input_box").value="";
    }catch(err){
     errorMsg.textContent=`Error  :  ${err.message}`
     errorMsg.style.color="red"
    }

}

fetchData.addEventListener("click",fetchUserData)


document.getElementById("input_box").addEventListener("keypress",(ev)=>{
    if(ev.key==="Enter"){
     ev.preventDefault();
     fetchData.click();
    }
})

document.addEventListener("keypress",(event)=>{
    if(event.key==="/"){
        event.preventDefault();
        document.getElementById("input_box").focus();
    }
})

