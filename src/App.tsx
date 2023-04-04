import { useCallback, useEffect, useState } from "react"
import HanziCard from "./HanziCard"
import hsk3 from "./hsk-3.json" 

function getWord() {
  return hsk3.words[Math.floor(Math.random() * hsk3.words.length)]
}

function getWordArray(wordHanzi: string, wordPinyin: string, wordPinyinNubmered: string){
  const wordHanziArray = wordHanzi.split('')
  const wordPinyinRomanArray = wordPinyinNubmered.split(/\d+/).filter(Boolean)
  const WordSylableNumber = wordHanzi.length
  const wordPinyinArray = []

  
  return [wordHanziArray]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const wordHanziArray = ["中", "文"]
  const wordPinyinRomanArray = ["zhong", "wen"]
  const wordPinyinArray = ["zhōng", "wén"]
  
  const wordObj = [{hanzi: "中", pinyinRoman: "zhong", pinyin: "zhōng"}, {hanzi: "文", pinyinRoman: "wen", pinyin: "wén"}]

  const [index, setIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  console.log(wordToGuess)

  const [mistakeCount, setMistakeCount] = useState(0)
  console.log(mistakeCount)

  const hanzi = wordHanziArray[cardIndex]
  const pinyin = wordPinyinArray[cardIndex]
  const pinyin_roman = wordPinyinRomanArray[cardIndex]


  const addSpelledLetter = useCallback(
    (letter: string) => {
      if (letter === pinyin_roman[index]) {
        setIndex(oldIndex => oldIndex + 1)
      }
      else {
        setMistakeCount(oldCount => oldCount + 1)
      }
    },
    [index, mistakeCount]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      // Ignore pressed key if it is not a letter
      if (!key.match(/^[a-z]$/)) return

      // Prevent default and try to Add key to guessed letter
      e.preventDefault()
      addSpelledLetter(key)
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault
      setMistakeCount(2)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [index])

  return (
    <div className="Container" style={{ fontSize: "2rem", textAlign: "center" }}>
      <h1>Nihao shijie</h1>
      {wordObj.map( (syl, i) => <HanziCard key={i} hanzi={syl.hanzi} pinyin={syl.pinyin} pinyin_roman={syl.pinyinRoman} index={index} mistakeCount={mistakeCount} />)}
    </div>
  )
}

export default App
