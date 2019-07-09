const fs = require('graceful-fs')
const plantaLotes = JSON.parse(fs.readFileSync('./sistemaViarioIDv.geojson', 'utf8'));

//obter a lista única, nome das articulações
const listaArticula = Array.from(new Set(plantaLotes.features.map((x) => {
    return x.properties.cod //nome da articulação
})));

//itens agrupados
let resultado = plantaLotes.features.reduce((grupo, item) => {
    grupo[item.properties.cod] = grupo[item.properties.cod] || []//se não existir o nome do elemento, criar um vazio, se existir push
    grupo[item.properties.cod].push(
        item
    )
    return grupo
}, []);//um array como valor inicial

listaArticula.forEach(z => {
    fs.writeFile('./exportTabela/' + z + '.geojson', JSON.stringify(resultado[z], null, 2), (err) => {
        if (err) throw err;
    });
});