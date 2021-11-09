# Welcome to Veather

Your daily weather app powered by [WeatherAPI.com](https://www.weatherapi.com/)

## OverView

Veather is a simple weather app that displays the weather reports of top 15 most populated cities in the world by default as well as the report of the current city of the user when the user gives it location access. It also has a search input through which you can search any city around the world and get the current weather report of that city.

The app can be accessed on [veatherz on vercel](https://veatherz.vercel.app)

## Features

The main features of the app are summarized below

### Load the report of popular cities around the world

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
