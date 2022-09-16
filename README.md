<!-- ABOUT THE PROJECT -->
## About The Project

A full-stack webapp that provides information on the water levels of California's various reservoirs along with an option to view the water levels of each reservoir relative to each other from any month starting from 1990.

The app works seamlessly on Mobile and Tablet Views too, in addition to Desktop view.


### Built With

* React.js
* Node.js
* Chart.js


<!-- GETTING STARTED -->
## Getting Started

### Installation
I will assume that you have Node.js installed and that you are in the root directory of this repository.
Once you have the above packages installed, execute the steps below.

* installing backend dependencies
  ```sh
  cd BackendWaterLevel
  npm install
  ```
* installing frontend dependencies
  ```sh
  cd ../FrontendWaterLevel
  npm install
  ```



### Running
Assuming here that you have executed all the steps in the "Installation" phase above correctly. Next:

* Return to the root directory of the repository first. Then, open two different terminal/shell instances:

* On the first instance, run this:
  ```sh
  cd BackendWaterLevel
  node index.js
  ```

* On the second instance, run this:
  ```sh
  cd FrontendWaterLevel
  npm run dev
  ```


