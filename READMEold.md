# Fake Terminal Website (FTW)

A fully customizable terminal-like-website

## Preview

You can preview a live demo [here](https://luisbraganca.github.io/fake-terminal-website/) with a raw FTW template or [my personal website](http://lbraganca.pt) that also uses this template.

## Technical details

This *tool* allows you to build your own website that looks like a terminal/console. To make this possible, it was implemented in a dynamic way. All you have to do is to configure a few things here and there and you have your own version.

### Functionalities

* Fully generic website easy to customize according to the user's needs
* `TAB` autocompletion support
* A few linux-like possible commands
* Typewriter effect when showing a command result
* Possible to skip the typewriter effect by doubleclicking anywhere
* Sidenav with all the files to make it easy for people with no know-how to navigate through your website
* Since the website is generic enough, you're able to create a language-checker function and associate different texts according to the user's browser language (my website version has support for both portuguese and english languages).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Configuring the website

Before you deploy the website, consider changing the following:

* Go to `js/main.js` and replace all the text on both singleton vars:
  * `configs`: Contains all the text used on the website plus a few configurations.
  * `files`: All the fake files used on the website. These files are also used to be listed on the sidenav. Also please notice if a file content is a raw URL, when clicked/concatenated it will be opened on a new tab.
* The page title on the `index.html` file.
* The website color on the `css/main.css` file.
* The images located at the `img` folder. The suggested sizes are 150x150 px for the avatar and `32x32`/`16x16` px for the favicon.

## Notes

I strongly ask you a favor: **PLEASE** use an obfuscator tool for the JS file, that way people won't be able to copy your website's version JS and the only way that they can use the template is by visiting this repository. [This obfuscator](https://www.daftlogic.com/projects-online-javascript-obfuscator.htm), provided by DaftLogic, looks really great and is the one used for my personal one.

## Authors

* **Luís Bragança** - *Mostly everything*
