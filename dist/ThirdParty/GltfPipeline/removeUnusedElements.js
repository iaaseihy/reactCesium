import ForEach from"./ForEach.js";import hasExtension from"./hasExtension.js";import defaultValue from"../../Core/defaultValue.js";import defined from"../../Core/defined.js";var allElementTypes=["mesh","node","material","accessor","bufferView","buffer"];function removeUnusedElements(e,n){return n=defaultValue(n,allElementTypes),allElementTypes.forEach((function(i){n.indexOf(i)>-1&&removeUnusedElementsByType(e,i)})),e}var TypeToGltfElementName={accessor:"accessors",buffer:"buffers",bufferView:"bufferViews",node:"nodes",material:"materials",mesh:"meshes"};function removeUnusedElementsByType(e,n){var i=e[TypeToGltfElementName[n]];if(defined(i))for(var t=0,o=getListOfElementsIdsInUse[n](e),r=i.length,f=0;f<r;++f)o[f]||(Remove[n](e,f-t),t++)}function Remove(){}function getListOfElementsIdsInUse(){}function nodeIsEmpty(e,n){return!(defined(n.mesh)||defined(n.camera)||defined(n.skin)||defined(n.weights)||defined(n.extras)||defined(n.extensions)&&0!==n.extensions.length)&&(!defined(n.children)||0===n.children.filter((function(n){return!nodeIsEmpty(e,e.nodes[n])})).length)}Remove.accessor=function(e,n){e.accessors.splice(n,1),ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){ForEach.meshPrimitiveAttribute(e,(function(i,t){i>n&&e.attributes[t]--})),ForEach.meshPrimitiveTarget(e,(function(e){ForEach.meshPrimitiveTargetAttribute(e,(function(i,t){i>n&&e[t]--}))}));var i=e.indices;defined(i)&&i>n&&e.indices--}))})),ForEach.skin(e,(function(e){defined(e.inverseBindMatrices)&&e.inverseBindMatrices>n&&e.inverseBindMatrices--})),ForEach.animation(e,(function(e){ForEach.animationSampler(e,(function(e){defined(e.input)&&e.input>n&&e.input--,defined(e.output)&&e.output>n&&e.output--}))}))},Remove.buffer=function(e,n){e.buffers.splice(n,1),ForEach.bufferView(e,(function(e){defined(e.buffer)&&e.buffer>n&&e.buffer--}))},Remove.bufferView=function(e,n){e.bufferViews.splice(n,1),ForEach.accessor(e,(function(e){defined(e.bufferView)&&e.bufferView>n&&e.bufferView--})),ForEach.shader(e,(function(e){defined(e.bufferView)&&e.bufferView>n&&e.bufferView--})),ForEach.image(e,(function(e){defined(e.bufferView)&&e.bufferView>n&&e.bufferView--,ForEach.compressedImage(e,(function(e){var i=e.bufferView;defined(i)&&i>n&&e.bufferView--}))})),hasExtension(e,"KHR_draco_mesh_compression")&&ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){defined(e.extensions)&&defined(e.extensions.KHR_draco_mesh_compression)&&e.extensions.KHR_draco_mesh_compression.bufferView>n&&e.extensions.KHR_draco_mesh_compression.bufferView--}))}))},Remove.mesh=function(e,n){e.meshes.splice(n,1),ForEach.node(e,(function(e){defined(e.mesh)&&(e.mesh>n?e.mesh--:e.mesh===n&&delete e.mesh)}))},Remove.node=function(e,n){e.nodes.splice(n,1),ForEach.skin(e,(function(e){defined(e.skeleton)&&e.skeleton>n&&e.skeleton--,e.joints=e.joints.map((function(e){return e>n?e-1:e}))})),ForEach.animation(e,(function(e){ForEach.animationChannel(e,(function(e){defined(e.target)&&defined(e.target.node)&&e.target.node>n&&e.target.node--}))})),ForEach.technique(e,(function(e){ForEach.techniqueUniform(e,(function(e){defined(e.node)&&e.node>n&&e.node--}))})),ForEach.node(e,(function(e){defined(e.children)&&(e.children=e.children.filter((function(e){return e!==n})).map((function(e){return e>n?e-1:e})))})),ForEach.scene(e,(function(e){e.nodes=e.nodes.filter((function(e){return e!==n})).map((function(e){return e>n?e-1:e}))}))},Remove.material=function(e,n){e.materials.splice(n,1),ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){defined(e.material)&&e.material>n&&e.material--}))}))},getListOfElementsIdsInUse.accessor=function(e){var n={};return ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){ForEach.meshPrimitiveAttribute(e,(function(e){n[e]=!0})),ForEach.meshPrimitiveTarget(e,(function(e){ForEach.meshPrimitiveTargetAttribute(e,(function(e){n[e]=!0}))}));var i=e.indices;defined(i)&&(n[i]=!0)}))})),ForEach.skin(e,(function(e){defined(e.inverseBindMatrices)&&(n[e.inverseBindMatrices]=!0)})),ForEach.animation(e,(function(e){ForEach.animationSampler(e,(function(e){defined(e.input)&&(n[e.input]=!0),defined(e.output)&&(n[e.output]=!0)}))})),n},getListOfElementsIdsInUse.buffer=function(e){var n={};return ForEach.bufferView(e,(function(e){defined(e.buffer)&&(n[e.buffer]=!0)})),n},getListOfElementsIdsInUse.bufferView=function(e){var n={};return ForEach.accessor(e,(function(e){defined(e.bufferView)&&(n[e.bufferView]=!0)})),ForEach.shader(e,(function(e){defined(e.bufferView)&&(n[e.bufferView]=!0)})),ForEach.image(e,(function(e){defined(e.bufferView)&&(n[e.bufferView]=!0),ForEach.compressedImage(e,(function(e){defined(e.bufferView)&&(n[e.bufferView]=!0)}))})),hasExtension(e,"KHR_draco_mesh_compression")&&ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){defined(e.extensions)&&defined(e.extensions.KHR_draco_mesh_compression)&&(n[e.extensions.KHR_draco_mesh_compression.bufferView]=!0)}))})),n},getListOfElementsIdsInUse.mesh=function(e){var n={};return ForEach.node(e,(function(i){if(defined(i.mesh&&defined(e.meshes))){var t=e.meshes[i.mesh];defined(t)&&defined(t.primitives)&&t.primitives.length>0&&(n[i.mesh]=!0)}})),n},getListOfElementsIdsInUse.node=function(e){var n={};return ForEach.node(e,(function(i,t){nodeIsEmpty(e,i)||(n[t]=!0)})),ForEach.skin(e,(function(e){defined(e.skeleton)&&(n[e.skeleton]=!0),ForEach.skinJoint(e,(function(e){n[e]=!0}))})),ForEach.animation(e,(function(e){ForEach.animationChannel(e,(function(e){defined(e.target)&&defined(e.target.node)&&(n[e.target.node]=!0)}))})),ForEach.technique(e,(function(e){ForEach.techniqueUniform(e,(function(e){defined(e.node)&&(n[e.node]=!0)}))})),n},getListOfElementsIdsInUse.material=function(e){var n={};return ForEach.mesh(e,(function(e){ForEach.meshPrimitive(e,(function(e){defined(e.material)&&(n[e.material]=!0)}))})),n};export default removeUnusedElements;