

const app = Vue.createApp({
    data() {
        return {
            alphabet: [
                {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
            ],
            wordInfo: [],
            myWord: '',
            opponentsGuesses: [],
            opponentsGuessedWordArray: [],
            myGuesses: [],
            clicked: 'myWord',
            currentWord: '',
            
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

        // making sure each guess is 2-5 letters long
        guessLength(word){
            if (word.length >= 2 && word.length <= 5){
                return true
            } else {
                return false
            }
        },

        focusInputOne(){
            document.getElementById("input1").focus()
        },

        jottoRules(){
            alert(`
Jotto (or Giotto) is a code-breaking word game for two players. Each player picks and writes down a secret word and attempts to guess the other's word first during their turn.
            
Gameplay:

Each player picks a secret word of five unique letters (no duplicate letters) and writes it down privately. Words must appear in a dictionary; generally no proper nouns are allowed. The object of the game is to correctly guess the other player's word first.

Players take turns: on a player's turn, they guess a two to five letter word with no duplicate letters, and the other player announces how many letters in that guess match a unique letter in their secret word. For example, if the secret word is OTHER and the guess is PEACH, the E and H in PEACH match an E and an H in OTHER, so the announced result is "2". (Letters don't need to occur in the same position.) On the next turn, players reverse roles.

Players keep track on paper of each guess and result, crossing out letters of the alphabet that (by deduction) cannot appear in the opponent's secret word. Eventually, one player has enough information to win by making a correct guess.

            `)
        },

        // trying to work around the async of javascript
        catchPayload(payload){
            this.wordInfo = payload
            console.log("poop")
            this.enterWord(this.wordInfo)
            console.log("word info", this.wordInfo)
        },
        
        enterWord(currentWord){
            // this.numCorrectLetters = 0
            console.log("peeep!")
            console.log(currentWord, "this is the current word")

            // ------------------ secret word --------------------------------------------------------------
            if (this.myWord === '' && this.clicked === 'myWord'){
                // this is where my secret target word gets saved
                if (currentWord["word"].length !== 5 ) {
                    // this alert happens if i try to create a target word that is not 5 letters long and has duplicate letters
                    alert("Please enter a five letter word!")
                    this.focusInputOne()
                } else if (this.isUnique(currentWord["word"]) === false){
                    alert("Please enter a word where there are no duplicate letters!")
                    this.focusInputOne()
                } else {
                    this.myWord = currentWord["word"]
                console.log('my word from root is', this.myWord)
                }
            // ------------------- opponent's guesses -------------------------------------------------------   
            } else if (this.myWord !== '' && this.clicked === 'myWord') {
                
                // this is where my opponent's guesses go to try and figure out my secret word


                // alert for guessing same word twice
                if (this.opponentsGuessedWordArray.includes(currentWord["word"])){
                    console.log("There is something in the opponentsGuessedWordArray!", this.opponentsGuessedWordArray, currentWord["word"])
                    alert("You already guesses that word!")
                    this.focusInputOne()

                // alert for guessing a word that is not between 2-5 letters long
                } else if (this.guessLength(currentWord["word"]) === false){
                    alert("Please enter a guess that is 2 - 5 letters long!")
                    this.focusInputOne()

                // alert if the guessed word has duplicate letters
                } else if (this.isUnique(currentWord["word"]) === false){
                    alert("Please enter a word where there are no duplicate letters!")
                    this.focusInputOne()


                } else {
                    for (letter of currentWord["word"]){
                        // this is checking if each letter is in the secret word and changing inWord to true
                        if (this.myWord.includes(letter)){
                            console.log(`The letter ${letter} is in the target word!`)
                            console.log("This is the letter's index", currentWord["letters"][currentWord["word"].indexOf(letter)])
                            currentWord["letters"][currentWord["word"].indexOf(letter)]["inWord"] = true
                            currentWord["numCorrectLetters"] += 1
                            console.log("I changed the data!", currentWord)
                            console.log(`Opponent's guesses ${this.opponentsGuesses}`)

                        
                        } else {
                            console.log(`Sorry! The letter ${letter} is NOT in the target word!`)
                        }
                    }

                    
                    // this is where my opponent's guesses go to try and figure out my secret word
                    if (currentWord["word"] === this.myWord){
                        document.getElementById("opponents-guess").remove()
                        alert("You found the target word! Congrats!!")
                    }
                    // adds the current word to the opponentsGuesses array, the opponentsGuessedWordArray 
                    this.opponentsGuesses.push(currentWord)
                    this.opponentsGuessedWordArray.push(currentWord["word"])
                    console.log("you have", currentWord["numCorrectLetters"], "correct!")
                    
                }
                
                
                console.log(`my opponent's guesses ${JSON.stringify(this.opponentsGuesses)} in the root`)
                console.log(`array of guessed words ${this.opponentsGuessedWordArray}`)
            
            // -------------------- my guesses --------------------------------------------
            } else {
                // these are my guesses of the secret word my opponent chose for me
                console.log('payload:', typeof(currentWord))
                this.myGuesses.push(currentWord)
                console.log('my guesses are', this.myGuesses)
                console.log('my guess', currentWord)
            }
            this.currentWord = currentWord["word"]
            this.focusInputOne()

        },

        next(e) {
            
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
            numCorrectLetters: 0,
        }
    },
    template:`
        <div>
            <input type="text" name="letterOne" id="input1" class="letterInput" v-model="letterOne" maxlength="1" @input="next">
                
            <input type="text" name="letterTwo" class="letterInput" v-model="letterTwo" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterThree" class="letterInput" v-model="letterThree" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFour" class="letterInput" v-model="letterFour" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFive" class="letterInput" v-model="letterFive" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            

            <button @keyup.delete="last" @click="enterWord">ENTER</button>
        </div>
    `,
    methods: {
        enterWord(){
            
            this.word = `${this.letterOne.toUpperCase()}${this.letterTwo.toUpperCase()}${this.letterThree.toUpperCase()}${this.letterFour.toUpperCase()}${this.letterFive.toUpperCase()}`
            // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive}`)
            console.log('I am in the component', this.word)
            this.$emit('enter', {id: this.id, word: this.word, letters: [{letterOne: this.letterOne.toUpperCase(), inWord: false}, {letterTwo: this.letterTwo.toUpperCase(), inWord: false}, {letterThree: this.letterThree.toUpperCase(), inWord: false}, {letterFour: this.letterFour.toUpperCase(), inWord: false}, {letterFive: this.letterFive.toUpperCase(), inWord: false}], numCorrectLetters: this.numCorrectLetters})
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