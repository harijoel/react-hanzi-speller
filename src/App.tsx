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

type HanziPinyin = {
  hanzi: string,
  pinyinRoman: string,
  pinyin: string
} 
function getWordArray(wordHanzi: string, wordPinyin: string, wordPinyinNubmered: string){
  let objectArray: HanziPinyin[] = []

  const wordHanziArray = wordHanzi.split('')
  const wordPinyinRomanArray = wordPinyinNubmered.split(/\d+/).filter(Boolean)
  const WordSylableNumber = wordHanzi.length
  let index_start = 0
  for (let index = 0; index < WordSylableNumber; index++) {
    objectArray = [...objectArray, {hanzi: wordHanzi[index], 
                                    pinyinRoman: wordPinyinRomanArray[index], 
                                    pinyin: wordPinyin.slice(index_start, 
                                    index_start + wordPinyinRomanArray[index].length)
                                    }
                  ]
                    
    index_start = index_start + wordPinyinRomanArray[index].length
  }
  return objectArray
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const wordHanziArray = ["中", "文"]
  const wordPinyinRomanArray = ["zhong", "wen"]
  const wordPinyinArray = ["zhōng", "wén"]
  
  //const wordObj: HanziPinyin[] = [{hanzi: "中", pinyinRoman: "zhong", pinyin: "zhōng"}, {hanzi: "文", pinyinRoman: "wen", pinyin: "wén"}]
  const wordObj: HanziPinyin[] = getWordArray(wordToGuess["translation-data"].simplified,
                                              wordToGuess["translation-data"].pinyin,
                                              wordToGuess["translation-data"]["pinyin-numbered"]
                                              )
  console.log(wordObj)

  const [inputKeys, setInputKeys] = useState<string[]>([])

  const addInputKeys = useCallback(
    (letter: string) => {
      setInputKeys(currentKeys => [...currentKeys, letter])
      console.log(inputKeys)
    },
    [wordToGuess, inputKeys]
  )

  const hanziArrayInput = useMemo(() => {
    return findSubstrings(wordObj.map(syl => syl.pinyinRoman), inputKeys)
  }, [wordToGuess, inputKeys])
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
  }, [wordToGuess, inputKeys])

  
  return (
    <div className="Container" style={{ fontSize: "2rem", textAlign: "center" }}>
      <h1>Nihao shijie</h1>
      {wordObj.map( (syl, i) => <HanziCard 
                                  key={i} 
                                  hanzi={syl.hanzi} 
                                  pinyin={syl.pinyin} 
                                  pinyin_roman={syl.pinyinRoman}
                                  input={hanziArrayInput[i]}
                                  active={hanziArrayInput.length - 1 === i}
                                />
                  )
      }
    </div>
  )
}

export default App
