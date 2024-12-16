function createMethods() {
    Array.prototype.searchById = function(id) {
        return this.find(item => item.id == id)
    }
    
    Array.prototype.exSearchByProp = function(prop, val) {
        return this.filter(item => item[prop].toLowerCase() == val.toLowerCase())
    }
    
    Array.prototype.searchByProp = function(prop, val) {
        return this.filter(item => {
            return stringСomp(item[prop], val)
        })
    }
    
    Array.prototype.searchTrack = function(req) {
        let output = []
        this.forEach(rel => {
            rel.list.forEach(song => {
                song.artist = rel.artist
                song.relId = rel.id
                
                if (stringСomp(song.title, req)) {
                    output[output.length] = song
                }
                
                if (stringСomp(song.artist, req)) {
                    output[output.length] = song
                }
            })
        })
        return output
    }
}

function stringСomp(comp, req) {
    if (comp.toLowerCase() == req.toLowerCase()) {
        return true
    }
    
    if (neTochnoeSravnivanie(comp, req) < 30) {
        return true
    }
    
    let compWords = comp.split(' ')
    let reqWords = req.split(' ')

    for (let a = 0; a < reqWords.length; a++) {
        for (let i = 0; i < compWords.length; i++) {
            if (wordСomp(compWords[i], reqWords[a])) {
                return true
            }
        }
    }
    
    return false
}

function wordСomp(comp, req) {
    for (let i = 0; i < req.length; i++) {
        if (comp.toLowerCase()[i] != req.toLowerCase()[i]) {
             return false
        }
    }

    return true
}

function neTochnoeSravnivanie(strToch, req) {
    // chislo netochnostey
    let num = 0

    Array.from(req).forEach((char, i) => {
        if (char != strToch[i]) {
            num++
        }
    })
    
    
    let out = num / (req.length / 100)
    return out
}