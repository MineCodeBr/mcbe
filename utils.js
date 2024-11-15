function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const BlockCustomComponents = {
  beforeOnPlayerPlace: "beforeOnPlayerPlace",
  onPlace: "onPlace",
  onPlayerDestroy: "onPlayerDestroy",
  onPlayerInteract: "onPlayerInteract",
  onRandomTick: "onRandomTick",
  onStepOff: "onStepOff",
  onStepOn: "onStepOn",
  onTick: "onTick",
  onEntityFallOn: "onEntityFallOn"
}

const ItemCustomComponents = {
  onBeforeDurabilityDamage: "onBeforeDurabilityDamage",
  onCompleteUse: "onCompleteUse",
  onConsume: "onConsume",
  onHitEntity: "onHitEntity",
  onMineBlock: "onMineBlock",
  onUse: "onUse",
  onUseOn: "onUseOn"
}

const formatVersion = "1.21.40"

function stringify(object, build) {
  return build ? JSON.stringify(object) : JSON.stringify(object, null, 2)
}

module.exports = { uuid, formatVersion, stringify, BlockCustomComponents, ItemCustomComponents }