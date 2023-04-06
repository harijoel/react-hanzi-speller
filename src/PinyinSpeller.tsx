import React from 'react'

type PinyinSpellerProps = {
    pinyin: string,
    index: number,
    reveal: boolean
}

export default function PinyinSpeller({ pinyin, index, reveal }: PinyinSpellerProps) {
    
    return (
        <div>
            {!index && <span style={{visibility: 'hidden'}} >##</span> }
            <span>{pinyin.slice(0, index)}</span>
            {reveal && <span style={{color: "gray"}}>{pinyin.slice(index, pinyin.length)}</span>}
        </div>
    )
}
