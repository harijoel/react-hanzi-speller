import React, { useState } from 'react'
import PinyinSpeller from './PinyinSpeller'

type HanziCardProps = {
    hanzi: string
    pinyin: string
    pinyinRoman: string
    input?: string
    active: boolean
    mistakeTolerance: number
    playMode: string
}

export default function HanziCard({ hanzi, pinyin, pinyinRoman, input = "", active, mistakeTolerance, playMode }: HanziCardProps) {
    
    // to be defined
    let mistakeCount = 0
    let index = 0
    for (let i = 0; i < input.length; i++) {
        let c = input[i];
        if (input[i] === pinyinRoman[index]) {
            index = index + 1
        }
        else {
            mistakeCount = mistakeCount + 1
        }
        
    }
    
    let status = mistakeCount ? "red" : "black"
    const isLoser = mistakeCount >= mistakeTolerance + 1
    const hanziColor = isLoser? "red" : "black"
    if (isLoser || index === pinyinRoman.length) {
        status = "black"
    }
    return (
        <div className='box' style={{border: `3px solid ${status}`}} >
            {active && <div>*</div> }
            <div style={{ fontSize: "2em", color: hanziColor }}>{ hanzi }</div>
            <PinyinSpeller pinyin={pinyin} pinyinRoman={pinyinRoman} index={index} reveal={isLoser} playMode={playMode} />
        </div>
    )
}
