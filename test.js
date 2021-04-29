const randomInt = require('random-int')
const isOdd = require('is-odd')

randomTyping = async (page, wordsToType, selector) => {

    function delay(time) {
      return new Promise(function(resolve) { 
          setTimeout(resolve, time)
      });}
  
      let arr = Array.from(wordsToType)
    //   console.log(arr)
  
    //   console.log(arr.length)

    // const n = 5 //get the first 5 items


      slice1 = randomInt(1,arr.length-3)
      slice2 = randomInt(slice1, arr.length-2)
      slice3 = randomInt(slice2, arr.length-1)
      slice4 = randomInt(slice3, arr.length)
      arrSlice1= arr.slice(0, slice1)
      arrSlice2= arr.slice(slice1, slice2)
      arrSlice3= arr.slice(slice2, slice3)
      arrSlice4= arr.slice(slice3, arr.length)

      // random typing for each of the 4 sections
      const typing = async (array,typeSpeed) => {
    for (var i = 0; i < array.length; i++) {
         await delay(typeSpeed+randomInt(50,100)-randomInt(1,49))
    //     //page.type(selector,arr[i])
         console.log(array[i])
         if(randomInt(1,10) == 1) {await delay(randomInt(3000,7000))}
       }
       // random delay between typing stuff
}
    // typing for each slice taken
    await typing(arrSlice1,randomInt(200,400))
    await typing(arrSlice2,randomInt(200,1000))
    await typing(arrSlice3,randomInt(200,400))
    await typing(arrSlice4,randomInt(200,1000))
    //   console.log(slice3)

    // const newArray = arr.slice(0, )


    //   if(isOdd(arr.length) == true) {
    //     arr
    //   }
      
    //   console.log(arr.length/3)


    //   for (var i = 0; i < arr.length/3; i++) {
    //     await delay(randomInt(200,500))
    //     //page.type(selector,arr[i])
    //     console.log(arr[i])
    //   }
  
    //   for (var i = arr.length/3; i < arr.length*(2/3); i++) {
    //     await delay(randomInt(200,500))
    //     //page.type(selector,arr[i])
    //     console.log(arr[i])
    //   }


    }

    randomTyping('page','hey this is a test to see if the typing is working as intended!!', null)