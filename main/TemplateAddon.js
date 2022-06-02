const fs = require('node:fs')
//
module.exports = function (data) {
 try {
  if (data.description == undefined) return console.error(`[BUG MCBE] `, `Need Description`)
  if (data.name == undefined) return console.error(`[BUG MCBE] `, `Need Name`)
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
  let terrainData = {
  "num_mip_levels": 4,
  "pading": 8,
  "resource_pack_name": "vanilla",
  "texture_data": {
    "base": {
      "textures": "textures/blocks/base"
    }
  },
  "texture_name": "atlas.terrain"
  }
  var terrain_texture = JSON.stringify(terrainData, null, 2)
let itemTextData = {
  "resource_pack_name": "vanilla",
 "texture_name": "atlas.items",
  "texture_data": {
    "base": {
       "textures": "textures/items/base"
    }
  }
}
 var item_texture = JSON.stringify(itemTextData, null, 2)
  /*
  ////////////////////////////
  ////////////||Create Folders||\\\\\\\\\\\\\\\
  ////////////////////////////
  */
  if (!fs.existsSync(`./${data.name}(BE)`)) {
      fs.mkdirSync(`./${data.name}(BE)`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/blocks`)) {
      fs.mkdirSync(`./${data.name}(BE)/blocks`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/items`)) {
      fs.mkdirSync(`./${data.name}(BE)/items`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/recipes`)) {
      fs.mkdirSync(`./${data.name}(BE)/recipes`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/functions`)) {
      fs.mkdirSync(`./${data.name}(BE)/functions`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/loot_tables`)) {
      fs.mkdirSync(`./${data.name}(BE)/loot_tables`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/entities`)) {
      fs.mkdirSync(`./${data.name}(BE)/entities`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/spawn_rules`)) {
      fs.mkdirSync(`./${data.name}(BE)/spawn_rules`);
  }
  if (!fs.existsSync(`./${data.name}(BE)/trading`)) {
      fs.mkdirSync(`./${data.name}(BE)/trading`);
  }
    //
   fs.writeFile(`./${data.name}(BE)/manifest.json`, manifestExitBE, (err) => {
      if (err) return console.log(err)
      else {
          return
      }
    })
   //////////////////////////////
    //
  if (!fs.existsSync(`./${data.name}(RE)`)) {
      fs.mkdirSync(`./${data.name}(RE)`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/models`)) {
      fs.mkdirSync(`./${data.name}(RE)/models`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/models/blocks`)) {
      fs.mkdirSync(`./${data.name}(RE)/models/blocks`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/models/entity`)) {
      fs.mkdirSync(`./${data.name}(RE)/models/entity`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/animation_controllers`)) {
      fs.mkdirSync(`./${data.name}(RE)/animation_controllers`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/animations`)) {
      fs.mkdirSync(`./${data.name}(RE)/animations`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/attachables`)) {
      fs.mkdirSync(`./${data.name}(RE)/attachables`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/entity`)) {
      fs.mkdirSync(`./${data.name}(RE)/entity`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/textures`)) {
      fs.mkdirSync(`./${data.name}(RE)/textures`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/textures/items`)) {
      fs.mkdirSync(`./${data.name}(RE)/textures/items`);
  }
  if (!fs.existsSync(`./${data.name}(RE)/textures/blocks`)) {
      fs.mkdirSync(`./${data.name}(RE)/textures/blocks`);
  }
    //
     fs.writeFile(`./${data.name}(RE)/manifest.json`, manifestExitRE, (err) => {
      if (err) return console.log(err)
      else {
          return
      }
    })
    fs.writeFile(`./${data.name}(RE)/textures/terrain_texture.json`, terrain_texture, (err) => {
      if (err) return console.log(err)
      else {
          return
      }
    })
   fs.writeFile(`./${data.name}(RE)/textures/item_texture.json`, item_texture, (err) => {
      if (err) return console.log(err)
      else {
          return
      }
    })
   //
    //////////////////////////////
  }
 }
catch (e) {
 console.error(`[BUG MCBE] ` + e)
}
}