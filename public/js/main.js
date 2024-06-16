const paragraph = text => {
    const p = document.createElement('p')
    p.textContent = text
    return p
}

const link = (url, text) => {
    const p = document.createElement('p')
    const a = document.createElement('a')
    a.target = "_blank"
    a.href = url
    a.textContent = text
    p.append(a)
    return p
}


const parseText = document.querySelectorAll('.js-parse_text').forEach(parseText => {
    const array = JSON.parse(parseText.textContent)
    parseText.textContent = ''

    array.map(elm => {
        elm['children'].map(chil => {
            if ('text' in chil) {
                if (chil['text'] !== '') {
                    parseText.append(paragraph(chil['text']))
                }
            } else if ('type' in chil) {
                if (chil['type'] === 'link') {
                    parseText.append(link(chil['url'], chil['children'][0]['text']))
                }
            }
        })
    })
})

