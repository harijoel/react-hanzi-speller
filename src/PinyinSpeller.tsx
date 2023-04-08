import React from 'react'

type PinyinSpellerProps = {
    pinyin: string
    pinyinRoman: string
    index: number
    reveal: boolean
    playMode: string
}

export default function PinyinSpeller({ pinyin, pinyinRoman, index, reveal, playMode }: PinyinSpellerProps) {
    
    const isFinish = index === pinyinRoman.length

    const pinyinCorrect = playMode === "withTones" || playMode === "onlyTones"
                                        ? pinyinRoman
                                        : pinyin 
    
    return (
        <div>
            {!index && <span style={{visibility: 'hidden'}} >##</span> }

            {!isFinish && <>
                    <span>{pinyinCorrect.slice(0, index)}</span>
                    {reveal && <span style={{color: "gray"}}>
                                    {pinyinCorrect.slice(index, pinyinCorrect.length)}
                                </span>
                    }
                </>
            }
            
            {isFinish && <span>{pinyin}</span>}
        </div>
    )
    
}
