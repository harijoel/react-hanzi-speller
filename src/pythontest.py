lst = ["zhong", "guo"]
word = "zhoounggguuadso"


def find_substrings(lst, word):
    ind_w = 0
    ind_l = 0
    c = 0 #Correct counter
    sr = "" #sting result
    slist = "#".join(lst)
    while ind_w < len(word):
        sr = sr + word[ind_w]
        if word[ind_w] == slist[ind_l]:
            ind_w = ind_w + 1
            ind_l = ind_l + 1
        else:
            ind_w = ind_w + 1
        if ind_l < len(slist):
            if slist[ind_l] == '#':
                ind_l = ind_l + 1
                sr = sr + '#'
        
    return sr

print(find_substrings(lst, word))