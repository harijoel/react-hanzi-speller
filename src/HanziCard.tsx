import React, { useState } from 'react'
import PinyinSpeller from './PinyinSpeller'

type HanziCardProps = {
    hanzi: string,
    pinyin: string,
    pinyin_roman: string,
    index: number,
    mistakeCount: number
}

export default function HanziCard({ hanzi, pinyin, pinyin_roman, index, mistakeCount }: HanziCardProps) {
    

    
    let status = mistakeCount ? "red" : "black"
    const isLoser = mistakeCount >= 2
    const hanziColor = isLoser? "red" : "black"
    if (isLoser || index === pinyin.length) {
        status = "black"
    }
    return (
        <div className='box' style={{border: `3px solid ${status}`}} >
            <div style={{ fontSize: "2em", color: hanziColor }}>{ hanzi }</div>
            <PinyinSpeller pinyin={pinyin} index={index} reveal={isLoser} />
        </div>
    )
}
