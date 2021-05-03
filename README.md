<p align="center">
  <img src="./RefinedaiLogo.png" alt="RefinedAI Logo" width="200" />
  <h2 align="center">Run refined AI models on the clients </h2>
</p>

<br>
A simple JavaScript library to help you quickly include AI models <b>specific</b> to your needs. <br>
<br>

There are many AI models available for your use. However, for all practical purposes, those AI models need refinement before you can use them. And as you continue with your AI journey, you need continous refinement to improve accuracy for your specific needs. Our fast and flexible solution is here to help with for your use cases.

When would RefinedAI be useful?
<li>Do you need AI models for variety of concepts that vetted by community - without training any models?
<li>Do you have use cases where you want all processing on client side (browser, mobile apps) or nodejs backend?
<li>Do you need to run inference for mutiple concepts on same data in a fast, and efficient way?
<li>Do you want to address false positives quickly - without retraining models?
<li>Do you have use cases where you need finer-level classification? 

<p align="center">
<img src="" alt="demo" width="800" align="center" />
</p>

## **Table of Contents**

- [QUICK: How to use the module](#quick-how-to-use-the-module)
- [Library API](#library-api)
    - [`init` the AI module](#load-the-model)
    - [`classify` an image](#classify-an-image)
    - [`classifyGif`](#classifygif)
- [Production](#production)
- [Install](#install)
    - [Host your own model](#host-your-own-model)
- [Run the Examples](#run-the-examples)
  - [Tensorflow.js in the browser](#tensorflowjs-in-the-browser)
  - [Node JS App](#node-js-app)
  - [Browserify](#browserify)
  - [React Native](#react-native)
- [More!](#more)
- [Want to contribute?](#contributors)

The AI module categorizes images in the following concepts:

- `Imagenet` - All 1000 imagenet classes 
- `NSFW` 
    - `Neutral` - safe for work neutral images
    - `Porn` - pornographic images, sexual acts
    - `Sexy` - sexually explicit images, not pornography
    - `Hentai` - hentai and pornographic drawings
- `Porn` - refined AI models
    - `Top` - Top body parts
    - `Bottom` - Bottom body parts
    - `Full` - Full body parts
- More coming soon...Request [here](mailto:dockaico@gmail.com)


## QUICK: How to use the module

With `async/await` support:

```js
    import { initAI, classifyAI } from './aimodels.js'

    const concepts = ["Imagenet", "NSFW", "Porn"];
    
    const img = document.getElementById('img')

    // Optionally, call initAI to help initialization 
    // Load model from my github/Azure.
    // See the section hosting the model files on your site.
    await initAI(concepts)

    // Classify the image and get the results
    let results = await classifyAI(imgElement, concepts);

    // Do action based on results
    console.log(results);
```

Without `async/await` support:

```js
    import { initAI, classifyAI } from './aimodels.js'

    const concepts = ["Imagenet", "NSFW", "Porn"];
    
    const img = document.getElementById('img')

    initAI(concepts)
    .then(function () {
        // Classify the image
        return classifyAI(img)
    })
    .then(function (results) {
        console.log('Results: ', results)
    })
```

## Library API

#### `load` the model

Before you can classify any image, you'll need to load the model. You should use the optional first parameter and load the model from your website, as explained in the install directions.

Model example - [224x224](https://github.com/infinitered/RefinedAI/blob/master/example/nsfw_demo/public/quant_nsfw_mobilenet/)

```js
    initAI(concepts, '/path/to/model/directory/')
```

**Parameters**

- optional URL to the `model.json` folder.

**Returns**

- Ready to use model object

#### `classify` an image

This function can take any browser-based image elements (`<img>`, `<video>`, `<canvas>`) and returns an array of most likely predictions and their confidence levels.

```js
// Return top 5 predictions for the list of concepts 
const results = await classifyAI(img, concepts)
```

**Parameters**

- Tensor, Image data, Image element, video element, or canvas element to check
- List of concepts to classify
- Number of results to return (default all 5)

**Returns**

- Array of Array of objects that contain `className` and `probability`. Array size is determined by the number of concepts in the `classifyAI` function.

#### `classifyGif`

![Gif Example](.gif)

This function can take a browser-based image element (`<img>`) that is a GIF, and returns an array of prediction arrays. It breaks a GIF into its frames and runs `classifyAI` on each with a given configuration. This can take a while, as GIFs are frequently hundreds of frames.

```js
// Returns all predictions of each GIF frame
const frameResults = await classifyGif(img, concepts)
```

If you're looking to update the user on status (_e.g. progress bar_) or change the number of top results per frame, then you can utilize the configuration parameter.

Example of passing a configuration:

```js
// returns top 3 prediction of each GIF frame, and logs the status to console
const sampleConfig = {
  topN: 3,
  framesPerSeconds: 1,
  onFrame: ({ index, totalFrames, predictions, image }) => {
    console.log({ index, totalFrames, predictions })
    // document.body.appendChild(image)
    // require('fs').writeFileSync(`./file.jpeg`, require('jpeg-js').encode(image).data)
  }
}
const framePredictions = await classifyGif(img, concepts, myConfig)
```

**Parameters**

- Image element to check
- Configuration object with the following possible key/values:
  - `topN` - Number of results to return per frame (default all 5)
  - `framesPerSeconds` - Frames per seconds, frames picks proportionally from the middle (default all frames)
  - `onFrame` - Function callback on each frame - Param is an object with the following key/values:
    - `index` - the current GIF frame that was classified (starting at 0)
    - `totalFrames` - the complete number of frames for this GIF (for progress calculations)
    - `predictions` - an array of length `topN`, returning top results from classify
    - `image` - an image of specific frame

**Returns**

- Array of the same order as number of frames in GIF. Each index corresponding to that frame, an returns array of objects that contain `className` and `probability`; sorted by probability and limited by topk config parameter.

## Production

Tensorflow.js offers two flags, `enableProdMode` and `enableDebugMode`. If you're going to use RefinedAI in production, be sure to enable prod mode before loading the RefinedAI model.

```js
    import { initAI, classifyAI } from './aimodels.js'

    const concepts = ["Imagenet", "NSFW", "Porn"];
    tf.enableProdMode()
    
//...
    const img = document.getElementById('img')
```

## Install

RefinedAI is powered by TensorFlow.js as a peer dependency. If your project does not already have TFJS you'll need to add it.

```bash
# peer dependency
$ yarn add @tensorflow/tfjs
# install RefinedAI
$ yarn add RefinedAI
```

For script tags add 

```js
<script  type="module" src="ai.js"></script>. 
```
#### Host your own model

 RefinedAI is hosting the models that get loaded by the scripts. You can  download and host your own version of [the model files](). You can then pass the relative URL to your hosted files in the `load` function.

## Run the Examples

### Tensorflow.js in the browser

The demo that powers https://RefinedAI.co/ is available in the `demo` example folder.

To run the demo, run `yarn prep` which will copy the latest code into the demo. After that's done, you can `cd` into the demo folder and run with `yarn start`.

### Browserify

A browserified version using nothing but promises and script tags is available in the `browser_demo` folder.

Please do not use the script tags hosted in this demo as a CDN. This can and should be hosted in your project along side the model files.

### React Native

The [RefinedAI React Native app](https://github.com/refinedai/refinedai-mobile)
![React Native Demo](./refinedaimobile.jpg)

### Node JS App

Using NPM, you can also use the model on the server side.

```bash
$ npm install RefinedAI
$ npm install @tensorflow/tfjs-node
```

```javascript
const axios = require('axios') //you can use any http client
const tf = require('@tensorflow/tfjs-node')
const nsfw = require('refinedai')
async function fn() {
  const pic = await axios.get(`link-to-picture`, {
    responseType: 'arraybuffer',
  })
  await initAI() 

  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await classifyAI(image)
  image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  console.log(predictions)
}
fn()
```

Here is another full example of a [multipart/form-data POST using Express](example/node_demo), supposing you are using JPG format.

```javascript
const express = require('express')
const multer = require('multer')
const jpeg = require('jpeg-js')

const tf = require('@tensorflow/tfjs-node')
const nsfw = require('RefinedAI')

const app = express()
const upload = multer()

let _model

const convert = async (img) => {
  // Decoded image in UInt8 Byte array
  const image = await jpeg.decode(img, true)

  const numChannels = 3
  const numPixels = image.width * image.height
  const values = new Int32Array(numPixels * numChannels)

  for (let i = 0; i < numPixels; i++)
    for (let c = 0; c < numChannels; ++c)
      values[i * numChannels + c] = image.data[i * 4 + c]

  return tf.tensor3d(values, [image.height, image.width, numChannels], 'int32')
}

app.post('/classify', upload.single('image'), async (req, res) => {
  if (!req.file) res.status(400).send('Missing image multipart/form-data')
  else {
    const image = await convert(req.file.buffer)
    const predictions = await classifyAI(image)
    image.dispose()
    res.json(predictions)
  }
})

const load_model = async () => {
  await initAI()
}

// Keep the model in memory, make sure it's loaded only once
load_model().then(() => app.listen(8080))

// curl --request POST localhost:8080/nsfw --header 'Content-Type: multipart/form-data' --data-binary 'image=@/full/path/to/picture.jpg'
```

You can also use [`lovell/sharp`](https://github.com/lovell/sharp) for preprocessing tasks and more file formats.

#### Open Source

RefinedAI, as open source, is free to use and always will be. We'll always do our best to help and quickly answer issues. If you'd like to get a hold of us, join our [community slack]().


## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. 

If you would like to quickly train your own concepts, reach out to us. 

In addition, any contributions are welcome!