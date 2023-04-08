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
    
    if (playMode === "withTones") {
        return (
            <div>
                {!index && <span style={{visibility: 'hidden'}} >##</span> }

                {!isFinish && <>
                        <span>{pinyinRoman.slice(0, index)}</span>
                        {reveal && <span style={{color: "gray"}}>
                                        {pinyinRoman.slice(index, pinyinRoman.length)}
                                   </span>
                        }
                    </>
                }
                
                {isFinish && <span>{pinyin}</span>}
            </div>
        )
    }

    if (playMode === "onlyTones") {
        return (
            <div>
                {!index && <span style={{visibility: 'hidden'}} >##</span> }

                {!isFinish && <>
                        <span>{pinyinRoman.slice(0, index)}</span>
                        {reveal && <span style={{color: "gray"}}>
                                        {pinyinRoman.slice(index, pinyinRoman.length)}
                                   </span>
                        }
                    </>
                }
                
                {isFinish && <span>{pinyin}</span>}
            </div>
        )
    }
    
    
    return (
        <div>
            {!index && <span style={{visibility: 'hidden'}} >##</span> }
            <span>{pinyin.slice(0, index)}</span>
            {reveal && <span style={{color: "gray"}}>{pinyin.slice(index, pinyin.length)}</span>}
        </div>
    )
    
}
