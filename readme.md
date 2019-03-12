# Laravel React-Redux CRUD

Simple CRUD on Laravel with react-redux

* Laravel 5.7.27
* React
* Redux


##Installation

### Laravel
```sh
$ git clone
-----
update the .env file along with database connection
-----
$ composer install && composer update
$ php artisan vendor:publish --provider="Barryvdh\Cors\ServiceProvider"
$ php artisan migrate 

```

### Install Front-End Requirements
```sh
$ cd front
$ npm install
```

### Run Back-End

```sh
$ php artisan serve
```


### Run Front-End

```sh
$ cd front
$ npm start
```