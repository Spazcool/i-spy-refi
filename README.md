# I Spy Refi

[![GitHub repo size](https://img.shields.io/github/repo-size/Spazcool/i-spy-refi)](https://shields.io/)

## Table of Contents:
* [Description](#Description)
* [Getting Started Remotely](#Installation-&-Getting-Started-Remotely)
* [Getting Started Locally](#Installation-&-Getting-Started-Locally)
* [Technologies Used](#Technologies-Used)
* [Usage](#Usage)
* [Future Features](#Future-Features)
* [Contributors](#Contributors)
* [Special Thanks](#Special-Thanks)
* [Deployed](#Deployed)

## Description
A personal Home assessment app that allows you to fill out a quick form of your address and any home improvements made to your home. We then use our algorithm and pull comps of similar houses in your area and combine our numbers along with any  renovations made to your home. I Spy Refi helps you get a better understanding of your home's actual worth similar to a bank assessment which helps you feel confident when applying for a refinance or home equity line of credit.

<p align="center">
   <img width="70%" height="300vh" src="./documentation/readme-images/desktop.gif">
   <img width="20%" height="300vh" src="./documentation/readme-images/mobile.gif">
</p>

## Installation & Getting Started Remotely
* [hosted site](https://ispyrefi.com/)
* [repo](https://github.com/Spazcool/i-spy-refi)

## Installation & Getting Started Locally
This app utilizes the Firebase BaaS and as a result the local set up requires some extra configurations that include details particular to this application. The following guide is just that, a guide; creating a separate Firebase application to plug into this mostly fronend code will include hurdles not documented here. Good luck.

* [Getting Started Doc](./documentation/getting_started.md)

## Technologies Used
Project is created with:
* React
    * Hooks
    * Context
* Firebase
    * FireStore
    * Cloud Functions
    * OAuth
* Node.js
* SASS
* Material UI
* RapidAPI
    * Realtor.com API
* HTML5
* CSS3
* ES6

## Usage

### Sign In / Sign Up
<p align="center">
   <img width="70%" height="300vh" src="./documentation/readme-images/sign-in.gif"/>
</p>

* You can either sign using your Google account or the standard email route.
* I using email, the following is required:
    * First Name
    * Last Name
    * Email
    * Password
        * note: passwords are encrypted & stored in Google's propriety servers, we can't leak them because we don't have access to them ourselves. Or put another way, they're as safe as Google can make them.

### Add Your House
<p align="center">
   <img width="70%" height="300vh" src="./documentation/readme-images/add-house.gif"/>
</p>

* Requires:
    * Street
    * City
    * State
    * Zip

### Add Renovations
<p align="center">
   <img width="70%" height="300vh" src="./documentation/readme-images/add-renos.gif"/>
</p>
When seaking a refinance option the quickest way to boost your returns is to add renovations to your house. Each house is different and an exhaustive itemized list of all possible renovations options can quickly become overwhelming. In lieu of that we list the top 7 most valuable renovations with a simple toggle option of *Minor/Major* or *Yes/No*. Some nuance is lost but the following options should fit most circumstances:

* Kitchen: includes cabinets, fridge, etc...
* Roof: new shingles?
* Bathroom: includes toilet, tub, tiles, etc...
* Attic: bedroom conversion?
* Landscaping: includes trees, mulch, walkway, etc...
* Entry door replacement?
* Deck, patio or porch installation?

### View Dashboard
<p align="center">
   <img width="70%" height="300vh" src="./documentation/readme-images/dashboard.gif"/>
</p>
The heart of the application. Here you can view details related to house, its worth as calculated by Realtor.com as well as its worth taking into consideration the renovations added as well as comparable homes in your area.

Additional features: 
    * House values
    * Current Mortgage rates
    * 10 nearby comparable properties
    * Renovations value chart

### Modify User / House
This is simple utility page where a user can perform some basic administrative tasks, such as the following:

* Update Name
* List Property
* Delete Property
* Delete Account

## Future Features
* User defined renovation types & values in lieu of national averages
* Map integration for comparison houses
* Comparison radius slider, filter comparison houses by distance from your home
* Dark/Light mode toggle
* Multiple houses per user
* Update password & email
* Trending rates chart, house value is saved on each login and pushed to a chart to visualize trends

## Contributors
<p align="center">
  <a href="https://github.com/steffijerome0809">
    <img src="https://avatars1.githubusercontent.com/u/59617364?s=64&v=4" title="Steffi Jerome" width="10%"/>
  </a>

  <a href="https://github.com/bowdwin">
    <img src="https://avatars1.githubusercontent.com/u/6236987?v=4" title="bowdwin" width="10%"/>
  </a>

  <a href="https://github.com/Spazcool">
    <img src="https://avatars2.githubusercontent.com/u/17243640?v=4" title="Spazcool" width="10%"/>
  </a> 

  <a href="https://github.com/fleshborne">
    <img src="https://avatars1.githubusercontent.com/u/62081154?s=64&v=4" title="Blake Thompson" width="10%"/>
  </a>

  <a href="https://github.com/lp5786766">
    <img src="https://avatars2.githubusercontent.com/u/61098845?s=64&v=4" title="Luba Pecheneva" width="10%"/>
  </a>
</p>
<!-- https://avatars2.githubusercontent.com/u/17243640?s=64&v=4 -->
<!-- https://avatars1.githubusercontent.com/u/6236987?s=64&v=4 -->

## Special Thanks/Credits
* Yusuff Faruq's [Firebase/React Authentication](https://blog.logrocket.com/user-authentication-firebase-react-apps/) blog post

## Depolyed
* [I Spy Refi](https://ispyrefi.com/)
