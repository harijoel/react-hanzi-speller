import { useCallback, useEffect, useMemo, useState } from "react"
import HanziCard from "./HanziCard"
import hsk3 from "./hsk-3.json" 

function findSubstrings(lst: string[], word: string[]): string[] {
  let ind_w = 0;
  let ind_l = 0;
  let c = 0; //Correct counter
  let sr = ""; //string result
  let slist = lst.join("#");
  
  while (ind_w < word.length) {
    sr = sr + word[ind_w];
    if (word[ind_w] == slist[ind_l]) {
      ind_w = ind_w + 1;
      ind_l = ind_l + 1;
    } else {
      ind_w = ind_w + 1;
    }
    if (ind_l < slist.length) {
      if (slist[ind_l] == '#') {
        ind_l = ind_l + 1;
        sr = sr + '#';
      }
    }
  }
  return sr.split('#');
}

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
  const [mistakeCount, setMistakeCount] = useState(0)
  const [inputKeys, setInputKeys] = useState<string[]>([])

  const hanzi = wordHanziArray[cardIndex]
  const pinyin = wordPinyinArray[cardIndex]
  const pinyin_roman = wordPinyinRomanArray[cardIndex]

  const addInputKeys = useCallback(
    (letter: string) => {
      setInputKeys(currentKeys => [...currentKeys, letter])
      console.log(inputKeys)
    },
    [inputKeys]
  )

  const hanziArrayInput = useMemo(() => {
    return findSubstrings(wordPinyinRomanArray, inputKeys)
  }, [inputKeys])
  console.log(hanziArrayInput)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault
      addInputKeys(key)
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys])

  
  return (
    <div className="Container" style={{ fontSize: "2rem", textAlign: "center" }}>
      <h1>Nihao shijie</h1>
      {wordObj.map( (syl, i) => <HanziCard 
                                  key={i} 
                                  hanzi={syl.hanzi} 
                                  pinyin={syl.pinyin} 
                                  pinyin_roman={syl.pinyinRoman}
                                  input={hanziArrayInput[i]}
                                />
                  )
      }
    </div>
  )
}

export default App
