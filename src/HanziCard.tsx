import React, { useState } from 'react'
import PinyinSpeller from './PinyinSpeller'

type HanziCardProps = {
    hanzi: string,
    pinyin: string,
    pinyin_roman: string
    input?: string
    active: boolean
}

export default function HanziCard({ hanzi, pinyin, pinyin_roman, input = "", active }: HanziCardProps) {
    
    // to be defined
    let mistakeCount = 0
    let index = 0
    for (let i = 0; i < input.length; i++) {
        let c = input[i];
        if (input[i] === pinyin_roman[index]) {
            index = index + 1
        }
        else {
            mistakeCount = mistakeCount + 1
        }
        
    }
    
    let status = mistakeCount ? "red" : "black"
    const isLoser = mistakeCount >= 2
    const hanziColor = isLoser? "red" : "black"
    if (isLoser || index === pinyin.length) {
        status = "black"
    }
    return (
        <div className='box' style={{border: `3px solid ${status}`}} >
            {active && <div>*</div> }
            <div style={{ fontSize: "2em", color: hanziColor }}>{ hanzi }</div>
            <PinyinSpeller pinyin={pinyin} index={index} reveal={isLoser} />
        </div>
    )
}
