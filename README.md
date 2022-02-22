<h1 align="center">Noroff Assignment 5</h1>
<p align="center">
	<img src="https://isl.co/wp-content/uploads/2016/07/vue-logo.png" width="200">
</p>

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
<img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000" />
<a href="#" target="_blank">
<img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</a>

Noroff assignment number 5, written by **Konstantinos Pascal** and **Darius Davidonis**.

The assignment is a quiz app written in **Vue** and styled with **Tailwind**. It makes use of 2 APIs for bringing in randomized questions and storing/updating of user scores.

The [**JSON Server API**](https://kp-noroff-assignment-api.herokuapp.com/trivia) is hosted on Heroku and handles the storage of new scores and update of high scores.

The [**Open Trivia Database JSON API**](https://opentdb.com/api_config.php) handles the retrieval of random questions for every play session.

## Table of Contents

-  [Live Demo](#live-demo)
-  [Screenshots](#screenshots)
-  [Diagram](#diagram)
-  [Install](#install)
-  [Maintainers](#maintainers)
-  [Contributing](#contributing)
-  [License](#license)

## Live Demo

**https://assignment-5-vue.herokuapp.com/**

## Screenshots

<p align="center">
<img src="./public/StartPage.png">
</p>

<p align="center">
<img src="./public/QuestionsPage.png">
</p>

<p align="center">
<img src="./public/ResultsPage.png">
</p>

## Diagram

<p align="center">
<img src="./public/QuizAppDiagram.png">
</p>

## Install

Clone the repository using:

```
git clone https://github.com/konstapascal/noroff-assignment-5.git
```

Go inside the cloned repository:

```
cd noroff-assignment-5
```

Install node module dependencies using:

```
npm install
```

Serve the web application locally using:

```
npm run dev
```

## Maintainers

[@konstapascal](https://github.com/konstapascal)\
[@dariusdav](https://github.com/dariusdav)

## Contributing

PRs accepted.

## License

MIT © 2022 Konstantinos Pascal &amp; Darius Davidonis
