# Chapter 55 Interactive Visualization

***The Massachusetts Opioid Epidemic: a Data Visualization of Findings from the Chapter 55 Report. Visit [Mass.gov/Chapter55](http://www.mass.gov/chapter55).***

This repository contains code and assets for an online, interactive visualization of the [Chapter 55 Report](http://www.mass.gov/eohhs/gov/newsroom/press-releases/eohhs/admin-releases-unprecedented-report-on-opioid-epidemic.html), an unprecedented data analysis of the opioid epidemic in Massachusetts. The report was a product of Chapter 55 of the Acts of 2015 signed into law by Governor Charlie Baker in August 2015.

## Setup Local Environment

### Requirements

To run the server, you'll need [Node.js](https://nodejs.org/en/download/) installed.

### Build the server and the front-end

0. Clone the repo from Github by using the command line or repo's website on Github. On the right side of the repo's page, there is a button labeled "Clone in Desktop"

0. Run `npm install` from the root of the repository to load modules and install Gulp dependencies

0. Run `gulp` from the root of the repository to build the project and get it to run. This will set up `browser-sync` to run when front-end files change and will set up the server to reload on any file change


```
$ git clone git@github.com:massgov/chapter55.git
$ cd chapter55
$ npm install
$ gulp
```
### Collaboration
To collaborate or contribute to this repo, instead of directly cloning from `git@github.com:massgov/chapter55.git`, we encourage contributors to:

0. Fork this repo to their own github account using the "Fork" button at the top right
0. Clone the repo from their own account `$ git clone git@github.com:USERNAME/chapter55.git`
0. Submit a pull request when the code is ready

## Licenses and attribution

### A few parts of this project are not in the public domain

>The files in `fonts/` are from [Boostrap Glyphicons](http://glyphicons.bootstrapcheatsheets.com/) by Jan Kovařík under the [MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE)

>The files `js/vendor/bootstrap.js` and `css/bootstrap.css` are from [Boostrap](http://getbootstrap.com), copyright Twitter under the [MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE)

>The file `js/vendor/d3.min.js` is from [D3](https://d3js.org/), copyright Mike Bostock under the [MIT license](https://github.com/d3/d3/blob/master/LICENSE)

>The file `js/vendor/d3.tip.js` is from [D3-tip](http://labratrevenge.com/d3-tip/), copyright Justin Palmer under the [MIT license](https://github.com/Caged/d3-tip/blob/master/LICENSE)

>The file `js/vendor/colorbrewer.js` is from [Colorbrewer 2.0](http://colorbrewer2.org) by Cynthia Brewer

>The file `js/vendor/angular.min.js` is from [AngularJS](http://angularjs.org), copyright Google, Inc. under the [MIT license](https://github.com/angular/angular.js/blob/master/LICENSE)

>The file `js/vendor/modernizr.js` is from [Modernizr](https://modernizr.com/) under the [MIT license](https://modernizr.com/license/).

>The file `js/vendor/jquery-1.11.1.min.js` is from [jQuery](https://jquery.com/), copyright The jQuery Foundation, under the [MIT license](https://jquery.org/license/)

>The files `js/vendor/jquery-ui.js` and `css/jquery-ui.css` are from [jQueryUI](http://jqueryui.com), copyright The jQuery Foundation, under the [MIT license](https://jquery.org/license/)

>The files in `assets/img` and `video/opioid.mp4` are licensed by MassIT from Shutterstock, and are non-transferable according to [Shutterstock visual content licenses](http://www.shutterstock.com/license)


### The rest of this project is in the public domain

>This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
