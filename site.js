

const app = Vue.createApp({
    data() {
        return {
            message: 'hello',
            alphabet: [
                {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
            ],
            letterOne: '',
            letterTwo: '',
            letterThree: '',
            letterFour: '',
            letterFive: '',
            
        }

    },
    methods: {
        pickLetter(letter){
            if(letter.pick === 0 || letter.pick === 1){
                letter.pick++
            } else {
                letter.pick = 0
            }
        },
        enter(){
            console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive}`)


        },
        next(e) {
            
            // let x = e.srcElement.id
            // let id = `this.${x}`
            // console.log(id)
            // id = e.data.toUpperCase()
            // console.log(id)
            
            e.target?.nextSibling?.focus()
          },
        last(e) {
            console.log(e)
            // e.target?.delete()
            e.target?.previousSibling?.focus()

        }

        
    }
})




app.component( 'word-input', {
    data(){
        return{
            message: "poop",
            letterOne: '',
            letterTwo: '',
            letterThree: '',
            letterFour: '',
            letterFive: '',
        }
    },
    template:`
        <p>{{ message }}</p>
        <input type="text" class="letterInput" v-model="letterOne" maxlength="1" @input="next">
            
        <input type="text" class="letterInput" v-model="letterTwo" maxlength="1" @keyup.delete="last" @input="next">
        
        <input type="text" class="letterInput" v-model="letterThree" maxlength="1" @keyup.delete="last" @input="next">
        
        <input type="text" class="letterInput" v-model="letterFour" maxlength="1" @keyup.delete="last" @input="next">
        
        <input type="text" class="letterInput" v-model="letterFive" maxlength="1" @keyup.delete="last" @input="next">
        

        <button @keyup.delete="last" @click="enter">ENTER</button>
    `,
    methods: {
        enter(){
            console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive}`)


        },
        next(e) {
            
            e.target?.nextSibling?.focus()
          },
        last(e) {
            console.log(e)
            // e.target?.delete()
            e.target?.previousSibling?.focus()

        }
    }
    
})


app.mount('#app')


// const vm = new Vue({
//     el: '#app',
//     data: {
//         message: 'hello',
//         alphabet: [
//             {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
//         ],

//     },
//     methods: {
//         pickLetter(letter){
//             if(letter.pick === 0 || letter.pick === 1){
//                 letter.pick++
//             } else {
//                 letter.pick = 0
//             }
//         }
//     }
// })