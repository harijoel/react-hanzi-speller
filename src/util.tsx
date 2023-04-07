export type HanziPinyin = {
    hanzi: string
    pinyinRoman: string
    pinyin: string
  } 
export function getWordArray(wordHanzi: string, wordPinyin: string, wordPinyinNubmered: string){
    let objectArray: HanziPinyin[] = []
    //Cleaning process
    const wordPinyinNubmered_clean = wordPinyinNubmered.replace(/[\s']/g, "").toLowerCase()
    const wordPinyin_clean = wordPinyin.replace(/[\s']/g, "").toLowerCase()

    const wordPinyinRomanArray = wordPinyinNubmered_clean.split(/\d+/).filter(Boolean)
    const WordSylableNumber = wordHanzi.length
    let index_start = 0
    for (let index = 0; index < WordSylableNumber; index++) {
      objectArray = [...objectArray, {hanzi: wordHanzi[index], 
                                      pinyinRoman: wordPinyinRomanArray[index], 
                                      pinyin: wordPinyin_clean.slice(index_start, 
                                      index_start + wordPinyinRomanArray[index].length)
                                      }
                    ]
                      
      index_start = index_start + wordPinyinRomanArray[index].length
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