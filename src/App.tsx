import { useCallback, useEffect, useMemo, useState } from "react"
import ChineseWord from "./ChineseWord";
import HanziCard from "./HanziCard"
import hsk3 from "./hsk-3.json" 
import { findSubstrings, getWordArray, HanziPinyin } from "./util";

function getWord() {
  const randomHskNum = Math.floor(Math.random() * hsk3.words.length)
  return hsk3.words[randomHskNum]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [inputKeys, setInputKeys] = useState<string[]>([])
  const mistakeTolerance = 1
  const traditional = true

  const wordHanziArray = ["中", "文"]
  const wordPinyinRomanArray = ["zhong", "wen"]
  const wordPinyinArray = ["zhōng", "wén"]
  
  // const wordObj: HanziPinyin[] = [{hanzi: "中", 
  //                                 pinyinRoman: "zhong", pinyin: "zhōng"}, 
  //                                 {hanzi: "文", pinyinRoman: "wen", pinyin: "wén"}
  //                                ]
  const wordObj: HanziPinyin[] = getWordArray(wordToGuess["translation-data"]
                                                            [traditional
                                                              ? "traditional"
                                                              : "simplified"
                                                            ],
                                              wordToGuess["translation-data"].pinyin,
                                              wordToGuess["translation-data"]["pinyin-numbered"],
                                              "noTones"
                                              )
  console.log(wordObj)

  

  const addInputKeys = useCallback(
    (letter: string) => {
      setInputKeys(currentKeys => [...currentKeys, letter])
      console.log(inputKeys)
    },
    [inputKeys]
  )

  const hanziArrayInput = useMemo(() => {
    return findSubstrings(wordObj.map(syl => syl.pinyinRoman), inputKeys)
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

  // Handle hitting Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key != "Enter") return

      e.preventDefault
      if (hanziArrayInput.length === wordObj.length) {
        setInputKeys([])
        setWordToGuess(getWord())
      }
      
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [inputKeys])

  
  return (
    <div className="Container" style={{ display: "flex", fontSize: "2rem", textAlign: "center" }}>
      <h1>Nihao shijie</h1>
      <ChineseWord />
      {wordObj.map( (syl, i) => <HanziCard 
                                  key={i} 
                                  hanzi={syl.hanzi} 
                                  pinyin={syl.pinyin} 
                                  pinyin_roman={syl.pinyinRoman}
                                  input={hanziArrayInput[i]}
                                  active={hanziArrayInput.length - 1 === i} 
                                  mistakeTolerance={mistakeTolerance}
                                />
                  )
      }
    </div>
  )
}

export default App
