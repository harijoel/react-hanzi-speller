export type HanziPinyin = {
    hanzi: string
    pinyinRoman: string
    pinyin: string
  } 
export function getWordArray(wordHanzi: string, wordPinyin: string, wordPinyinNubmered: string, playMode: string){
    let objectArray: HanziPinyin[] = []
    // Cleaning process: remove spaces, remove " ' " mark, everything to lowercase
    const wordPinyinNubmered_clean = wordPinyinNubmered.replace(/[\s']/g, "").toLowerCase()
    const wordPinyin_clean = wordPinyin.replace(/[\s']/g, "").toLowerCase()

    // Separate string by number. Ex: "zhong1wen2" => ["zhong", "wen"]
    let wordPinyinRomanArray: string[] | null = wordPinyinNubmered_clean.split(/\d+/).filter(Boolean)
                                    

    // Use previous no number array sylable lenghts to separate accented string
    // Ex. "zhōngwén" => ["zhōng", "wén"]
    const WordSylableNumber = wordHanzi.length
    let index_start = 0
    let wordPinyinArray: string[] = []
    for (let index = 0; index < WordSylableNumber; index++) {
      wordPinyinArray = [...wordPinyinArray, 
                              wordPinyin_clean.slice(index_start, 
                              index_start + wordPinyinRomanArray[index].length)
                        ]
      index_start = index_start + wordPinyinRomanArray[index].length
    }

    // Separate string by number. Ex: "zhong1wen2" => ["zhong1", "wen2"]
    // Had to define wordPinyinRomanArray as type any because match could throw...
    // ...null if nothing matches, so []
    if (playMode === "withTones") {
      wordPinyinRomanArray = wordPinyinNubmered_clean.match(/[a-zA-Z]+\d+/g)
                              || [wordPinyinNubmered_clean]
    }
    if (playMode === "onlyTones") {
      wordPinyinRomanArray = wordPinyinNubmered_clean.match(/\d+/g)
                              || [wordPinyinNubmered_clean]
    }

    // Make each of the elements in the 3 arrays into objects
    // Array of objects
    for (let index = 0; index < WordSylableNumber; index++) {
      objectArray = [...objectArray, {hanzi: wordHanzi[index], 
                                      pinyinRoman: wordPinyinRomanArray[index], 
                                      pinyin: wordPinyinArray[index]
                                      }
                    ]
    }
    
    return objectArray
  }

export  function findSubstrings(lst: string[], word: string[]): string[] {
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