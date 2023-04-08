import React from 'react'
import HanziCard from './HanziCard'
import { HanziPinyin } from './util'

type ChineseWordProps = {
    hanziPinyinArrayWord: HanziPinyin[]
    pinyinArrayInput: string[]
    traditional: boolean
    mistakeTolerance: number
    playMode: string
}

export default function ChineseWord({hanziPinyinArrayWord, pinyinArrayInput, traditional, mistakeTolerance, playMode}: ChineseWordProps) {
  
  const activeCardIndex = pinyinArrayInput.length - 1
  return (
    <div>
        {hanziPinyinArrayWord.map( (syl, i) => <HanziCard 
                                  key={i} 
                                  hanziPinyinChar={syl}
                                  input={pinyinArrayInput[i]}
                                  active={activeCardIndex === i} 
                                  mistakeTolerance={mistakeTolerance}
                                  playMode={playMode}
                                />
                  )
      }
    </div>
  )
}
