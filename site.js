

const app = Vue.createApp({
    data() {
        return {
            alphabet: [
                {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
            ],
            // letterOne: '',
            // letterTwo: '',
            // letterThree: '',
            // letterFour: '',
            // letterFive: '',
            wordInfo: [],
            myWord: '',
            opponentsGuesses: [],
            myGuesses: [],
            clicked: 'myWord',
            
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

        // checking if each letter in a word is unique
        isUnique(word){
            for (let i=0; i<word.length; i++) {
                if ( word.indexOf(word[i]) !== word.lastIndexOf(word[i]) ) {
                  return false
                }
              }
            return true
        },

        // trying to work around the async of javascript
        catchPayload(payload){
            this.wordInfo = payload
        },
        // enterWord(payload){
        //     console.log('payload:', typeof(payload))
        //     console.log('payload word:', payload["word"])
        //     // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive} in the root`)
            

        //     if (payload["word"] === ''){
        //         alert("Please enter a word!")
        //     } else {
        //         if (this.myWord === '' && this.clicked === 'myWord'){
        //             this.myWord = payload["word"]
        //             console.log('my word from root is', this.myWord)
        //         } else if (this.myWord !== '' && this.clicked === 'myWord') {
        //             for (let i=0; i < this.myWord.length; i++){
        //                 console.log(i, this.myWord[i])

        //                 if (this.myWord[i] === payload["word"][i]){
        //                     this.wordInfo = payload
        //                     console.log(this.myWord[i], "is a match!")
        //                     // console.log("this is the wordInfo from the payload", this.wordInfo)

        //                     // figure out why this isnt working

        //                     this.wordInfo["letter"][i]["inWord"] = true
        //                     // console.log('should say true', this.wordInfo["letters"][i]["inWord"] === false)
        //                 } else {
        //                     console.log(payload["word"][i], "is NOT a match!")
        //                 }
        //             }
        //             this.opponentsGuesses.push(payload)
                    
        //             console.log(`my opponent's guesses ${JSON.stringify(this.opponentsGuesses)} in the root`)
        //         } else {
        //             console.log('payload:', typeof(payload))
        //             this.myGuesses.push(payload)
        //             console.log('my guesses are', this.myGuesses)
        //             console.log('my guess', payload)
        //         }
        //     }
            
        //     // this.opponentsGuesses.push(payload)
            
            

            


        // },
        enterWord(payload){
            console.log('payload:', typeof(payload))
            console.log('payload word:', payload["word"])
            // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive} in the root`)
            this.wordInfo = payload
            console.log("is unique", this.isUnique(this.wordInfo["word"]))
            

            if (this.wordInfo["word"].length !== 5 || this.isUnique(this.wordInfo["word"]) === false){
                alert("Please enter a five letter word where each letter is unique!")
            } else {
                if (this.myWord === '' && this.clicked === 'myWord'){
                    this.myWord = this.wordInfo["word"]
                    console.log('my word from root is', this.myWord)
                } else if (this.myWord !== '' && this.clicked === 'myWord') {
                    for (let i=0; i < this.myWord.length; i++){
                        console.log(i, this.myWord[i])

                        if (this.myWord[i] === this.wordInfo["word"][i]){
                            // this.wordInfo = payload
                            console.log(this.myWord[i], "is a match!")
                            // console.log("this is the wordInfo from the payload", this.wordInfo)

                            // figure out why this isnt working

                            this.wordInfo["letter"][i]["inWord"] = true
                            // console.log('should say true', this.wordInfo["letters"][i]["inWord"] === false)
                        } else {
                            console.log(this.wordInfo["word"][i], "is NOT a match!")
                        }
                    }
                    this.opponentsGuesses.push(this.wordInfo)
                    
                    console.log(`my opponent's guesses ${JSON.stringify(this.opponentsGuesses)} in the root`)
                } else {
                    console.log('payload:', typeof(payload))
                    this.myGuesses.push(this.wordInfo)
                    console.log('my guesses are', this.myGuesses)
                    console.log('my guess', payload)
                }
            }
            
            
            
            

            


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
            // console.log(e)
            // e.target?.delete()
            e.target?.previousSibling?.focus()

        },
        focus() {
            document.onload = function() {  
                document.getElementById("input-one").focus();
            }
        }

        
    },
    mounted: function() {
        this.focus()
    }
})




app.component( 'word-input', {
    data(){
        return{
            letterOne: '',
            letterTwo: '',
            letterThree: '',
            letterFour: '',
            letterFive: '',
            word: '',
            id: 1,
        }
    },
    template:`
        <div>
            <input type="text" name="letterOne" class="letterInput" v-model="letterOne" maxlength="1" @input="next">
                
            <input type="text" name="letterTwo" class="letterInput" v-model="letterTwo" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterThree" class="letterInput" v-model="letterThree" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFour" class="letterInput" v-model="letterFour" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFive" class="letterInput" v-model="letterFive" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            

            <button @keyup.delete="last" @click="enterWord">ENTER</button>
        </div>
    `,
    methods: {
        enterWord(){
            
            this.word = `${this.letterOne}${this.letterTwo}${this.letterThree}${this.letterFour}${this.letterFive}`
            // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive}`)
            console.log('I am in the component', this.word)
            this.$emit('enter', {id: this.id, word: this.word, letters: [{letterOne: this.letterOne, inWord: false}, {letterTwo: this.letterTwo, inWord: false}, {letterThree: this.letterThree, inWord: false}, {letterFour: this.letterFour, inWord: false}, {letterFive: this.letterFive, inWord: false}] })
            this.letterOne = ''
            this.letterTwo = ''
            this.letterThree = ''
            this.letterFour = ''
            this.letterFive = ''
            this.id++
            


        },
        next(e) {
            let regex = /^[a-zA-Z]+$/
            console.log('this is the input event', e.data)
            if (regex.test(e.data)){
                e.target?.nextSibling?.focus()
            } else {
                console.log('try again')
            }
            
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