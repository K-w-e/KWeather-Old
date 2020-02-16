export class utils{
    constructor(){}

    static SetGraphic(description, div){
        if(description=="clear sky")
          div.classList.add("clear_sky");
        else if(description=="few clouds")
          div.classList.add("few_clouds");
        else if(description=="scattered clouds")
            div.classList.add("scattered_clouds");
        else if(description=="broken clouds")
            div.classList.add("broken_clouds");
        else if(description=="rain" || description.includes("rain"))
            div.classList.add("rain");
        else if(description=="overcast clouds")
            div.classList.add("broken_clouds");
        else if(description=="mist")
            div.classList.add("mist");
      }

    static UtilDate(date){
        let aNumber : number = Number(date);
        if(aNumber<10)
          return "0"+aNumber;
        else
          return aNumber;
        }

}

