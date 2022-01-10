# Welcome to Veather

Your daily weather app powered by [WeatherAPI.com](https://www.weatherapi.com/)

## Table of Contents

- [Welcome to Veather](#welcome-to-veather)
  - [Table of Contents](#table-of-contents)
  - [OverView](#overview)
  - [Local Dev Setup](#local-dev-setup)
    - [1. clone the repository and install dependencies](#1-clone-the-repository-and-install-dependencies)
    - [2. Start the development server](#2-start-the-development-server)
  - [Features](#features)
    - [Default Report](#default-report)
    - [Search City](#search-city)
    - [Current City](#current-city)
    - [Add a report to favorite](#add-a-report-to-favorite)
    - [Delete a report](#delete-a-report)
    - [Add, edit and delete notes](#add-edit-and-delete-notes)
  - [Technical details](#technical-details)
    - [File Structure](#file-structure)
      - [`src`](#src)
        - [`components`](#components)
        - [`context`](#context)
        - [`helpers`](#helpers)
        - [`assets`](#assets)
        - [`pages`](#pages)
        - [`routes`](#routes)
        - [`Default files`](#default-files)
      - [`screenshots`](#screenshots)
      - [`public`](#public)
    - [Styling](#styling)
    - [Tests](#tests)

## OverView

Veather is a simple weather app that displays the weather reports of top 15 most populated cities in the world by default as well as the report of the current city of the user when the user gives it location access. It also has a search input through which you can search any city around the world and get the current weather report of that city.

The app can be accessed on [veatherz on vercel](https://veatherz.vercel.app) and a video demonstration is available [here](https://www.loom.com/share/0d9c2117f9b34e12a4ee553d9aed57a7)

## Local Dev Setup

T setup the app in a local development environment, follow the following steps

### 1. clone the repository and install dependencies

Clone the repository:

```bash
git clone git@github.com:Veraclins/veather.git
```

Install dependencies:

``` bash
cd veather
yarn install
```

Update Environment variables: Create a .env file by copying the provided .env.example file

``` bash
cp .env.example .env
```

Update `REACT_APP_WEATHER_API_KEY` with the provided (in the submission) API key or create one on [Weatherapi.com](https://www.weatherapi.com/my/)

### 2. Start the development server

```bash
yarn start
```

The app will start running on `http://localhost:3000` and automatically open it in your default browser.

## Features

The main features of the app are summarized below

### Default Report

The app by default loads the reports of the top 15 most popular cities (based on population) around the world and saves it in the browser memory. These reported are then listed on the cities page (doubles as the home page) as shown below

![desktop with prompt](/screenshots/desktop.png)
![desktop with prompt mobile](/screenshots/desktop_mobile.jpg)

### Search City

The app provides a search field on the navigation (both on desktop and mobile) for searching any cities. This uses the Search/Autocomplete API of [WeatherAPI.com](https://www.weatherapi.com/) to get a list of matching cities as soon as you stop typing (few milliseconds after the last input). A sample search result is shown below

![search](/screenshots/search.png)
![search mobile](/screenshots/search_mobile.jpg)

This ensures that you get the report of the correct city by selecting the returned choice that matches your query. Selecting an option loads the report and take you to the details page as shown below

![details](/screenshots/details.png)
![details mobile](/screenshots/details_mobile.jpg)

### Current City

The app prompts the user to allow access to their device location the first time it loads and if granted permission, it loads the current city based on the device location and opens its details page. The prompt can be seen in the desktop images above and the current city page is shown below. A link is then added to the navigation to easily go to the current city page any time

![current](/screenshots/current.png)
![current mobile](/screenshots/current_mobile.jpg)

_**Note: My laptop does not return an accurate location. My mobile device does**_

### Add a report to favorite

When viewing the list of reports, the user can easily mark a report as favorite or unmark an already "favorited" report by clicking the favorite icon. The icon and button color changes based on the state (added to favorites or not). This makes it easy to differentiate favorite report from the others. Favorite reports are also automatically listed on top of the list

![favorites](/screenshots/favorites.png)
![favorites mobile](/screenshots/favorites_mobile.jpg)

### Delete a report

When viewing the list of reports, the user can easily delete a report by clicking the delete icon. Every report in the list can be removed by just clicking the respective delete button. A smaller list with some reports deleted is shown below

![cleaned](/screenshots/cleaned.png)
![cleaned mobile](/screenshots/cleaned_mobile.jpg)

### Add, edit and delete notes

The user can add notes to any report when on the details page. To add a note, just type the note into the textarea on the right (bottom on mobile). Typing into the field activates the action button to save the note or cancel it. This is shown below

![add_note](/screenshots/add_note.png)
![add_note mobile](/screenshots/add_note_mobile.jpg)

Notes are listed below the textarea with an edit button and a delete button. Clicking the edit button opens a textarea in place and changing the note brings up the action buttons to save or cancel the operation. This is shown below

![edit_note](/screenshots/edit_note.png)
![edit_note mobile](/screenshots/edit_note_mobile.jpg)

Any note can be deleted easily by clicking the related delete button. This removes the note from the list.

## Technical details

The application is a react application bootstrapped using [Create React App](https://github.com/facebook/create-react-app). It is written in Typescript.

### File Structure

The app uses the following folder/file structure

```
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Layout.test.tsx
│   │   ├── Menu.test.tsx
│   │   └── Menu.tsx
│   ├── context/
│   │   ├── WeatherContext.tsx
│   │   └── WeatherProvider.tsx
│   ├── helpers/
│   │   ├── weather.ts
│   │   └── index.ts
│   ├── assets/
│   │   ├── cancel.svg
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── index.scss
│   │   └── 404.svg
│   ├── pages/
│   │   ├── Cities.tsx
│   │   ├── City.tsx
│   │   ├── Current.tsx
│   │   └── NotFoundPage.tsx
│   ├── routes/
│   │   └── index.tsx
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── test-data.ts
│   └── test-utils.ts
├── screenshots/
│   ├── desktop.png
│   └── desktop_mobile.jpg
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── index.html
├── package.json
├── README.md
├── .env
├── .env.example
├── .gitignore
├── tsconfig.json
└── yarn.lock
```

#### `src`

Contains all the core application code.

##### `components`

This contains all the reusable components such as TextArea.tsx

##### `context`

This contains all the files needed to create react contexts. It includes the Weather context implementations

##### `helpers`

This contains utility or helper functions such as the debounce function, a wrapper around the fetch api and a wrapper around localStorage methods.

##### `assets`

This contains all the static assets and styles. The styles folder contains the origin scss file and the generated css file.

##### `pages`

This contains route components that render distinct pages. This files match defined routes including file to show the 404 page

##### `routes`

This contains the file that defines the routes and associated route components. All routes are loaded using react lazy loading

##### `Default files`

These are files required to bootstrap the app such as App.tsx and index.tsx as well as test setup/utility files

#### `screenshots`

Contains all the screenshots of the application

#### `public`

Contains files that are served statically from the app url including the entry index.html.

### Styling

The application is styled using scss. I love utility classes (thanks to tailwind css) and I like to experiment with any task I can and so I decided to experiment with creating utility classes of my own. Scss makes it possible for me to easily generate these utility classes and responsive variants using variables, simple functions and mixins. This makes it very easy to have have responsive styles by simply prefixing the utility classes with breakpoint utilities (sm, md, lg, xl and 2xl thanks to tailwind). For instance adding the class `text-white md-text-blue` gives you a white text in small screens and blue text in screens 768px wide and larger. This made it easy for me to make the app responsive while writing few functional classes.

### Tests

Test are included for most of the main components and features. Tests are co-located with the respective components. To run the tests:

```bash
yarn test
```
