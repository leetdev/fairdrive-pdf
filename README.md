# Fairdrive PDF Viewer

This is a simple prototype/POC of an application for viewing PDF documents stored inside Fairdrive.

## Usage

You will need to have a [Swarm node](https://www.ethswarm.org/) running on your computer, as well as the [Blossom extension](https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd) installed and connected to your Fairdrive account.

The app is deployed to Swarm, accessible at [this link](http://localhost:1633/bzz/ebbeca99a26f3603c6bc4a79a55dca3ea9a86adac6ec48a639909de864209740/).

## Current Issues

- [ ] Blossom currently has a hardcoded timeout of 30 seconds for all of its API requests, and fetching data from Fairdrive can be slow. As a result, if you have too many files and/or folders on your Fairdrive, the fetching of the listing will not complete.
- [ ] Some PDF files downloaded from Fairdrive get transformed in the process, causing the resulting document to render empty pages. [This issue](https://github.com/fairDataSociety/blossom/issues/130) has been opened in the Blossom repository to address the bug.
- [ ] As this is an initial prototype version, the PDF viewer component is currently extremely primitive, only displaying all the pages without any controls for zoom, current page, or outline.
- [ ] The UI is very minimal and should be extended to include more controls and better overall look in the future.

## Technology Stack

Technologies used under the hood:
- [Create React App](https://github.com/facebook/create-react-app)
- [Blossom](https://github.com/fairDataSociety/blossom)
- [Fair Data Protocol Storage](https://github.com/fairDataSociety/fdp-storage)
- [React-PDF](https://github.com/wojtekmaj/react-pdf), which uses [PDF.js](https://mozilla.github.io/pdf.js/) for rendering PDF files in the browser

## Development

Clone the repository, and run `yarn install`.

In the project directory, you can then run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Note that this is not currently working, as Blossom requires your dApp to be deployed to Swarm. Instead, set up [FDP Play](https://github.com/fairDataSociety/fdp-play), and deploy the contents of the `build` folder after running the following command:

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
