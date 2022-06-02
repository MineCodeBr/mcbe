const fs = require('node:fs')
//
 module.exports = function (data) {
  try {
   if (data.description == undefined) return console.error(`[BUG MCBE] `, `Need Description`)
   if (data.name == undefined) return console.error(`[BUG MCBE] `, `Need Name`)
//
   else {
  function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
    v = c == 'x' ? r: (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
  var uuidDependencies = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
    v = c == 'x' ? r: (r & 0x3) | 0x8;
    return v.toString(16);
  });
  const manifestDataRE = {
  "format_version": 2,
  "header": {
    "description": `${data.description}`,
    "name": `${data.name} [RE]`,
    "uuid": `${uuidDependencies}`,
    "version": [
      1,
      0,
      0
    ],
    "min_engine_version": [
      1,
      16,
      0
    ]
  },
  "modules": [{
    "description": `${data.description}`,
    "type": "resources",
 "uuid": `${uuid()}`,
 "version": [
      1,
      0,
      0
    ]
  }]
}
  var manifestExitRE = JSON.stringify(manifestDataRE, null, 2)
  const manifestDataBE ={
 "format_version": 2,
 "header": {
    "description": `${data.description}`,
    "name": `${data.name} [BE]`,
 "uuid": `${uuid()}`,
 "version": [
   1,
   0,
   0
  ],
  "min_engine_version": [
   1,
   16,
   0
  ]
 },
 "modules": [{
  "type": "data",
 "uuid": `${uuid()}`,
 "version": [
   1,
   0,
   0
  ]
 }],
 "dependencies": [{
 "uuid": `${uuidDependencies}`,
  "version": [
   1,
   0,
   0
  ]
 }]
}
  var manifestExitBE = JSON.stringify(manifestDataBE, null, 2)
  //
  //===============>||:D||<===============
  //
    if (data.manifest == 'b') {
   if (data.fileOut == true) {
    if (!fs.existsSync(`./${data.name}(BE)`)) {
      fs.mkdirSync(`./${data.name}(BE)`);
  }
   fs.writeFile(`./${data.name}(BE)/manifest.json`, manifestExitBE, (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
          return console.log(`[MANIFEST] Resource Criado Com Sucesso`)
      }
    })
  }
    else {
     return manifestExitBE
   }
   }
    if (data.manifest == 'r') {
   if (data.fileOut == true) {
    if (!fs.existsSync(`./${data.name}(RE)`)) {
      fs.mkdirSync(`./${data.name}(RE)`);
  }
   fs.writeFile(`./${data.name}(RE)/manifest.json`, manifestExitRE, (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
        return console.log(`[MANIFEST] Resource Criado Com Sucesso`)
      }
    })
   }
    else {
   return manifestExitRE
   }
    }
    else {
   if (data.fileOut == true) {
    if (!fs.existsSync(`./${data.name}(BE)`)) {
      fs.mkdirSync(`./${data.name}(BE)`);
  }
    if (!fs.existsSync(`./${data.name}(RE)`)) {
      fs.mkdirSync(`./${data.name}(RE)`);
  }
   fs.writeFile(`./${data.name}(BE)/manifest.json`, manifestExitBE, (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
          return console.log(`[MANIFEST] Resource Criado Com Sucesso`)
      }
    })
   fs.writeFile(`./${data.name}(RE)/manifest.json`, manifestExitRE, (err) => {
      if (err) return console.log(`[ERRO MCBE]` + err)
      else {
        return console.log(`[MANIFEST] Resource Criado Com Sucesso`)
      }
    })

   }
    else {
   return manifestExitRE + manifestExitBE
    }
   }
  }
  }
 catch (e) {
 console.error(`[ERRO MCBE]` + e)
}
}