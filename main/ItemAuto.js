const fs = require('node:fs')
//
module.exports = function (data) {
 try {
 if (data.generatorName == true) {
 if (data.materials == undefined) return console.error(`Need Materials\n> From Create Tool`)
 function names() {
    const head = data.materials[Math.floor(Math.random() * data.materials.length)].item
    const cone = data.materials[Math.floor(Math.random() * data.materials.length)].item
    const rod = data.materials[Math.floor(Math.random() * data.materials.length)].item
   //
  return `${head}_${cone}_${rod}`
  }
  return names()
 }
  else {
 function names() {
    const head = data.materials[Math.floor(Math.random() * data.materials.length)].item
    const cone = data.materials[Math.floor(Math.random() * data.materials.length)].item
    const rod = data.materials[Math.floor(Math.random() * data.materials.length)].item
   //
  return `${head}_${cone}_${rod}`
  }
 if (data.name == undefined) return console.error(`[ERRO MCBE] `, `Need Name`)
 if (data.materials == undefined) return console.error(`[ERRO MCBE] `, `Need Materials\n> From Create Tool`)
 if (data.folder == undefined) return console.error(`[ERRO MCBE] `, `Need Folder`)
 if (data.type == undefined) return console.error(`[ERRO MCBE] `, `Need Type:\n> Pickaxe, Sword And Axe`)
  if (data.code == undefined) return console.error(`[ERRO MCBE] `, `Need Code for item`)
  else {
   if (!fs.existsSync(`./${data.folder}`)) {
      fs.mkdirSync(`./${data.folder}`);
    }
    console.log(`Arquivo Da ${data.type}\n> Criada Com Sucesso\nId: ${names()}`)
    //
    let itemData = data.code
    if (data.type == 'pickaxe') {
    fs.writeFile(`./${data.folder}/pickaxe_${names()}.json`, JSON.stringify(itemData, null, 2), (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
        return
      }
    })
    }
    if (data.type != 'pickaxe') {
    fs.writeFile(`./${data.folder}/${data.type}_${head}_${cone}_${rod}.json`, JSON.stringify(itemData, null, 2), (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
        return
      }
    })
    }
  }
  }
 }
catch (e) {
 console.error(`[ERRO MCBE] ` + e)
}
}