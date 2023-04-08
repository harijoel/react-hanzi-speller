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
  const playMode = "noTones"
  const activeCardIndex = 0
  
  const wordObj: HanziPinyin[] = getWordArray(wordToGuess["translation-data"]
                                                            [traditional
                                                              ? "traditional"
                                                              : "simplified"
                                                            ],
                                              wordToGuess["translation-data"].pinyin,
                                              wordToGuess["translation-data"]["pinyin-numbered"],
                                              playMode
                                              )
  console.log(wordObj)

  const addInputKeys = useCallback(
    (letter: string) => {
      setInputKeys(currentKeys => [...currentKeys, letter])
      console.log(inputKeys)
    },
    [inputKeys]
  )

  const [hanziArrayInput, correctTotal] = useMemo(() => {
    return findSubstrings(wordObj.map(syl => syl.pinyinRoman), inputKeys)
  }, [inputKeys])
  console.log(hanziArrayInput)
  console.log(correctTotal)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z0-9]$/)) return

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
      if (correctTotal === wordObj.map(syl => syl.pinyinRoman).join('').length) {
        setInputKeys([])
        setWordToGuess(getWord())
      }
      else {
        // Add two wrong letters
        const wrongLetter = '8'.repeat(mistakeTolerance + 1)
        setInputKeys(currentKeys => [...currentKeys, wrongLetter, wrongLetter])
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
      <ChineseWord 
        hanziPinyinArrayWord={wordObj} 
        pinyinArrayInput={hanziArrayInput} 
        traditional={traditional} 
        mistakeTolerance={mistakeTolerance}
        playMode={playMode}
      />
    </div>
  )
}

export default App
